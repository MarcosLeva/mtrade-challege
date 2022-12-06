import React,{useEffect} from "react";
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Header from "../src/layouts/Header"
import SocketContextProvider from "../src/context/socketContext"
import styled from "styled-components";
import Head from "../src/layouts/Head"
import "loaders.css/loaders.css";
import 'react-toastify/dist/ReactToastify.css';

export default function App({ Component, pageProps }: AppProps) {

  return(
    <SocketContextProvider>
      <MainStyled >
          <Head>
            <Header />
          </Head>
          <Component  {...pageProps} /> 
      </MainStyled>
    </SocketContextProvider>    
  )
}

const MainStyled = styled.div`
  /* width:100vh */
`;