import '@/styles/globals.css'
import useLoadProvider from "@/src/hooks/use-load-provider";
import { useEffect, useState } from "react";

export default function App({ Component, pageProps }) {
  const [account, setAccount] = useState(null)
  const {web3, contract} = useLoadProvider()

  useEffect(() => {
    !!web3 && (async () => {
      try{
        const [ score ] = await web3.eth.getAccounts()
        setAccount(score)
      } catch{
        console.error('Failed to get wallet')
      }
    })()
  }, [web3])  

  console.log(contract)
  console.log(account)
 
  return <Component {...pageProps} />
}