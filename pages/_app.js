import Navbar from '../components/navbar/navbar'

import { UserProvider } from '../context/userContext'

import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return(
    <>
      <UserProvider>
        <Navbar />
        <Component {...pageProps} />
      </UserProvider>
    </>
  )
}

export default MyApp
