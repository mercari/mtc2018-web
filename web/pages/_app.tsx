import React from 'react';
import App, { Container } from 'next/app';
import Head from 'next/head';
import { ApolloProvider } from 'react-apollo';
import { withApolloClient } from '../graphql/with-apollo-client';

class MyApp extends App {
  public static async getInitialProps({ ctx }: { ctx: any }) {
    return {
      initialLanguage: ctx.req && ctx.req.language ? ctx.req.language : 'en-US'
    } as any;
  }

  public render() {
    const { Component, pageProps, apolloClient } = this.props as any;
    return (
      <Container>
        <Head>
          <title>Mercari Tech Conf 2018</title>
        </Head>
        <ApolloProvider client={apolloClient}>
          <Component {...pageProps} />
        </ApolloProvider>
      </Container>
    );
  }
}

export default withApolloClient(MyApp);
