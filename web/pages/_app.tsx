import React from 'react';
import App, { Container } from 'next/app';
import { ApolloProvider } from 'react-apollo';
import { withApolloClient } from '../graphql/with-apollo-client';

class MyApp extends App {
  public componentDidMount() {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/service-worker.js', { scope: '/2018/' })
        .then(() => {
          // console.log('service worker registration successful', registration);
          // TODO: push notification に対応するとか
          // registration.pushManager.subscribe({ userVisibleOnly: true });
        })
        .catch(() => {
          // console.warn('service worker registration failed', err.message);
        });
    }
  }

  public render() {
    const { Component, pageProps, apolloClient } = this.props as any;
    return (
      <Container>
        <ApolloProvider client={apolloClient}>
          <Component {...pageProps} />
        </ApolloProvider>
      </Container>
    );
  }
}

export default withApolloClient(MyApp);
