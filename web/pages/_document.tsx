import Document, { Head, Main, NextScript } from 'next/document';
import * as React from 'react';
import { ServerStyleSheet } from 'styled-components';
import { colors } from '../components/styles';
import '../i18n';

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
      <html lang="ja">
        <Head>
          <meta name="format-detection" content="telephone=no" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta
            name="description"
            content="Mercari Tech Conf 2018は、メルカリグループの最新技術や、今後の展開を紹介するテックカンファレンスです。2018/10/04（Thu）に六本木アカデミーヒルズで開催します。"
          />
          <meta property="og:title" content="Mercari Tech Conf 2018" />
          <meta
            property="og:description"
            content="Mercari Tech Conf 2018は、メルカリグループの最新技術や、今後の展開を紹介するテックカンファレンスです。2018/10/04（Thu）に六本木アカデミーヒルズで開催します。"
          />
          <meta property="og:type" content="website" />
          <meta
            property="og:url"
            content="https://techconf.mercari.com/2018/"
          />
          <meta
            property="og:image"
            content="https://techconf.mercari.com/static/images/ogp.png"
          />
          <meta property="og:site_name" content="" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta
            name="twitter:image"
            content="https://techconf.mercari.com/static/images/ogp.png"
          />
          <meta name="twitter:title" content="Mercari Tech Conf 2018" />
          <meta
            name="twitter:description"
            content="Mercari Tech Conf 2018は、メルカリグループの最新技術や、今後の展開を紹介するテックカンファレンスです。2018/10/04（Thu）に六本木アカデミーヒルズで開催します。"
          />
          <meta name="twitter:site" content="@mercari_inc" />
          <link rel="shortcut icon" href="/static/images/favicon.ico" />
          <title>Mercari Tech Conf 2018</title>
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

  body {
    background-color: ${colors.primary};
  }
`;
