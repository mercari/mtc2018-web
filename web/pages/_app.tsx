import React from 'react';
import App, { Container } from 'next/app';
import Head from 'next/head';
import { ApolloProvider } from 'react-apollo';
import { withApolloClient } from '../graphql/with-apollo-client';
import { appWithTranslation } from '../i18n'

class MyApp extends App {
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

export default appWithTranslation(withApolloClient(MyApp));
