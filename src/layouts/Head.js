import React from "react";
import Head from "next/head";
import Script from 'next/script'

export default function Head_({ children }) {

  return (
    <>
        <Head>
      <title>Marcos Leva</title>
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/css/bootstrap.min.css"
        integrity="sha384-Zenh87qX5JnK2Jl0vWa8Ck2rdkQ2Bzep5IDxbcnCeuOxjzrPF/et3URy9Bv1WTRi"
        crossorigin="anonymous"
      />
    </Head>
      <Script src="https://cdn.jsdelivr.net/npm/react/umd/react.production.min.js" crossorigin></Script>

      <Script
        src="https://cdn.jsdelivr.net/npm/react-dom/umd/react-dom.production.min.js"
        crossorigin></Script>

      <Script
        src="https://cdn.jsdelivr.net/npm/react-bootstrap@next/dist/react-bootstrap.min.js"
        crossorigin></Script>
      {children}
    </>

  );
}
