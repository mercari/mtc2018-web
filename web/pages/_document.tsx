import Document, { Head, Main, NextScript } from 'next/document';
import * as React from 'react';
import { ServerStyleSheet } from 'styled-components';

export default class MyDocument extends Document {
  public static getInitialProps({ renderPage }: any) {
    // styled-componentsのSSRのための処理
    const sheet = new ServerStyleSheet();
    const page = renderPage((App: React.ComponentType<any>) => (props: any) =>
      sheet.collectStyles(<App {...props} />)
    );
    const styleTags = sheet.getStyleElement();

    return { ...page, styleTags };
  }

  public render() {
    return (
      <html>
        <Head>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no"
          />
          <meta name="format-detection" content="telephone=no" />
          <title>mercari Tech Conf 2018</title>
          <style dangerouslySetInnerHTML={{ __html: globalCSS }} />
          {this.props.styleTags}
        </Head>

        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}

const globalCSS: string = `
  html, body {
    margin: 0;
    padding: 0;
  }
`;
