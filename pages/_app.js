import '@/styles/globals.css'
import { AppProvider } from '@/src/context/app-context';

export default function App({ Component, pageProps }) { 
  return <AppProvider><Component {...pageProps} /></AppProvider> 
}