import Document, { Head } from 'next/document';
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
      // <html amp=''>だとTypeScriptが怒るのでcreateElementを使う
      // tslint:disable
      React.createElement('html', { amp: '' }, [
        <Head>
          <link rel="canonical" href="/2018" />
          <meta
            name="viewport"
            content="width=device-width,minimum-scale=1,initial-scale=1"
          />

          <meta name="format-detection" content="telephone=no" />
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
          <link
            href="https://fonts.googleapis.com/css?family=Montserrat:400,700"
            rel="stylesheet"
          />
          <link rel="manifest" href="/2018/manifest.json" />
          {this.props.styleTags}

          <style amp-boilerplate="">{`body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}`}</style>
          <noscript>
            <style amp-boilerplate="">{`body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}`}</style>
          </noscript>
          <style
            amp-custom=""
            dangerouslySetInnerHTML={{ __html: globalCSS }}
          />
          <script async={true} src="https://cdn.ampproject.org/v0.js" />
          <script
            async={true}
            custom-element="amp-analytics"
            src="https://cdn.ampproject.org/v0/amp-analytics-0.1.js"
          />
        </Head>,
        <body>
          <div
            id="__next"
            dangerouslySetInnerHTML={{ __html: this.props.html! }}
          />
          <amp-analytics type="googleanalytics">
            ga('create', 'UA-125147977-1', 'auto'); ga('send', 'pageview');
          </amp-analytics>
        </body>
      ])
    );
    // tslint:enable
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
