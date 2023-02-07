import Head from "next/head";
import Navbar from '../components/navbar/navbar'

import { UserProvider } from '../context/userContext'


import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return(
    <>
      <Head>
        <title>NextFitness</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <UserProvider>
        <Navbar />
        <Component {...pageProps} />
      </UserProvider>
    </>
  )
}

export default MyApp
