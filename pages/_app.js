import '@/styles/globals.css'
import AppProvider from '@/src/context/app/provider';
import {store} from '../src/store/index'
import { Provider } from 'react-redux'

export default function App({ Component, pageProps }) { 
  return <Provider store={store}><AppProvider><Component {...pageProps} /></AppProvider></Provider> 
}