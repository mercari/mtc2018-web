import App, { Container } from 'next/app';
import * as React from 'react';

class MyApp extends App {
  public render() {
    const { Component, pageProps } = this.props;
    return (
      <Container>
        <Component {...pageProps} />
      </Container>
    );
  }
}

export default MyApp;
