import '@/styles/globals.css'
import AppProvider from '@/src/context/app/provider';

export default function App({ Component, pageProps }) { 
  return <AppProvider><Component {...pageProps} /></AppProvider> 
}