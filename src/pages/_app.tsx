import { AppProps } from 'next/app';
import Head from 'next/head';

import { AuthProvider } from '../contexts/AuthContext';
import './../styles/global.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Traveler of City</title>
      </Head>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </>
  );
}

export default MyApp;
