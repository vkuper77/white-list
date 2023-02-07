import useLoadProvider from "@/src/hooks/use-load-provider";
import { useEffect, useState, createContext } from "react";

export const AppContext = createContext(null)

export function AppProvider({children}) {
    const [account, setAccount] = useState(null)
    const [balance, setBalance] =useState(0)
    const {web3, contract} = useLoadProvider()

  useEffect(() => {
    !!web3 && (async () => {
      try {
        const [ score ] = await web3.eth.getAccounts()
        const value = await web3.eth.getBalance(contract.address)
        setBalance(web3.utils.fromWei(value, 'ether'))
        setAccount(score)
      } catch {
        console.error('Failed to get wallet')
      }
    })()
  }, [web3])

    return <AppContext.Provider value={{balance}}>{children}</AppContext.Provider>
}