import '@/styles/globals.css'
import useLoadProvider from "@/src/hooks/use-load-provider";
import { useEffect, useState } from "react";

export default function App({ Component, pageProps }) {
  const [account, setAccount] = useState(null)
  const {web3} = useLoadProvider()

  useEffect(() => {
    async function getAccounts() {
      try{
        const [ score ] = await web3.eth.getAccounts()
        setAccount(score)
      } catch{
        console.error('Failed to get wallet')
      }
    }
    Boolean(web3) && getAccounts()
  }, [web3])

  console.log(account)
 
  return <Component {...pageProps} />
}