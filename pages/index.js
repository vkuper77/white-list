import About from "@/src/components/About/About";
import CashMachine from "@/src/components/Cash Machine/CashMachine";
import Description from "@/src/components/Description/Description";
import Form from "@/src/components/Form/Form";
import NavBar from "@/src/components/NavBar/NavBar";
import Petition from "@/src/components/Petition/Petition";
import Safe from "@/src/components/Safe/Safe";
import useLoadProvider from "@/src/hooks/use-load-provider";
import { useEffect, useState } from "react";


export default function Home() {
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
 
  
  return (
      <div className='wrapper'>
        <NavBar />
        <About />
        <Petition />
        <div className="main__container">
          <Safe/>
          <CashMachine/>
        </div>
        <Description />
        <Form />
      </div>
  )
}