import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"
          integrity="sha384-9ndCyUaIbzAi2FUVXJi0CjmCapSmO7SnpJef0486qhLnuZ2cdeRhO02iuK6FUUVM"
          crossOrigin="anonymous"
        />
      </Head>
      <script
        async
        defer
        src={`https://maps.googleapis.com/maps/api/js?key=AIzaSyDZzerwjhlQ1K8GNaLwRH8ab3K4rqI2iE8&libraries=places&v=weekly&callback=Function.prototype`}
      ></script>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
