import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          {/* Set Content Security Policy */}
          <meta
            httpEquiv="Content-Security-Policy"
            content="default-src 'self'http://157.245.196.187:8080; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline';"
          />
          {/* Other head elements */}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;