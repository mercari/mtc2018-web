import React from 'react';
import { initApollo } from './init-apollo';
import Head from 'next/head';
import { getDataFromTree } from 'react-apollo';
import { AppComponentContext } from 'next/app';
import { ApolloClient } from 'apollo-boost';

export const withApolloClient = (App: any) => {
  return class Apollo extends React.Component {
    public static displayName = 'withApollo(App)';
    public static async getInitialProps(ctx: AppComponentContext) {
      const { Component, router } = ctx;

      let appProps = {};
      if ((App as any).getInitialProps) {
        appProps = await (App as any).getInitialProps(ctx);
      }

      // Run all GraphQL queries in the component tree
      // and extract the resulting data
      const apollo = initApollo({});
      if (!process.browser) {
        try {
          // Run all GraphQL queries
          await getDataFromTree(
            <App
              {...appProps}
              Component={Component}
              router={router}
              apolloClient={apollo}
            />
          );
        } catch (error) {
          // Prevent Apollo Client GraphQL errors from crashing SSR.
          // Handle them in components via the data.error prop:
          // https://www.apollographql.com/docs/react/api/react-apollo.html#graphql-query-data-error
          // tslint:disable-next-line
          console.error('Error while running `getDataFromTree`', error);
        }

        // getDataFromTree does not call componentWillUnmount
        // head side effect therefore need to be cleared manually
        Head.rewind();
      }

      // Extract query data from the Apollo store
      const apolloState = apollo.cache.extract();

      return {
        ...appProps,
        apolloState
      };
    }

    public apolloClient: ApolloClient<any>;

    constructor(props: any) {
      super(props);
      this.apolloClient = initApollo(props.apolloState);
    }

    public render() {
      return <App {...this.props} apolloClient={this.apolloClient} />;
    }
  };
};
