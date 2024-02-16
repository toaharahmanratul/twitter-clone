import Document, { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head />
        <body>
          <Main />
          <NextScript />
          <Script
            src="https://kit.fontawesome.com/bbd4130abd.js"
            crossorigin="anonymous"
          />
        </body>
      </Html>
    );
  }
}
