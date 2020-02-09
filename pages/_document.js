import Document, { Head, Main, NextScript } from "next/document";
import React from "react";
import flush from "styled-jsx/server";

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    const { html, head } = ctx.renderPage();
    const styles = flush();
    return { html, head, styles, ...initialProps };
  }

  render() {
    return (
      <html lang="en">
        <Head>
          <meta charSet="utf-8" />
          <meta name="robots" content="index, follow" />
          <meta name="google" content="notranslate" />
          <meta name="keywords" content="realworld, next.js, swr" />
          <meta name="mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-title" content="conduit" />
          <meta
            name="apple-mobile-web-app-status-bar-style"
            content="black-translucent"
          />
          <meta name="msapplication-starturl" content="/" />
          <meta name="format-detection" content="telephone=no" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <link
            href="//code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css"
            rel="stylesheet"
            type="text/css"
          />
          <link
            href="//fonts.googleapis.com/css?family=Titillium+Web:700|Source+Serif+Pro:400,700|Merriweather+Sans:400,700|Source+Sans+Pro:400,300,600,700,300italic,400italic,600italic,700italic"
            rel="stylesheet"
            type="text/css"
          />
          <link rel="stylesheet" href="//demo.productionready.io/main.css" />
          <meta name="msapplication-TileColor" content="#ffffff" />
          <meta name="msapplication-TileImage" content="/ms-icon-144x144.png" />
          <meta name="theme-color" content="#ffffff" />
          <style jsx global>
            {`
              html,
              body {
                font-weight: normal;
                font-style: normal;
                -webkit-backface-visibility: hidden;
                -webkit-overflow-scrolling: touch;
                overscroll-behavior-y: contain;
                -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
                user-select: none;
                margin: 0;
              }
              button {
                font-family: -apple-system, "Noto Sans KR";
                font-weight: normal;
                font-style: normal;
                padding: 0;
                border: none;
              }
              img.lazyload:not([src]) {
                visibility: hidden;
              }
              *:focus {
                outline: none;
              }
            `}
          </style>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}

export default MyDocument;
