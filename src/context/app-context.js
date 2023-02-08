import useLoadProvider from "@/src/hooks/use-load-provider";
import { useEffect, useState, createContext } from "react";
import { accountListener } from "../utils/account-listener";
import { middlewareTry } from "../middleware/middleware-try";
import { middlewareProvider } from "../middleware/middleware-provider";
import { middlewareContract } from "../middleware/middleware-contract";

export const AppContext = createContext(null)

export function AppProvider({children}) {
  const [account, setAccount] = useState(null)
  const [balance, setBalance] = useState(0)
  const [shouldReload, reload] = useState(false)

  const {web3, provider, contract, coldBoot} = useLoadProvider()

  function reloadEffect () {
    reload(p => !p)
  }

  useEffect(() => {
    !!provider && accountListener(provider, coldBoot)
  }, [provider])

  useEffect(() => {
    !!web3 && middlewareContract(!!contract && (async () => {
        const [ acc ] = await middlewareTry(web3.eth.getAccounts())
        const contractBalance = await middlewareTry(web3.eth.getBalance(contract.address))
        setAccount(acc)
        setBalance(web3.utils.fromWei(contractBalance, 'ether'))
    }))()
  }, [web3])

  useEffect(() => {
    !!web3 && middlewareContract(!!contract &&(async () => {
      const value = await middlewareTry(web3.eth.getBalance(contract.address))
      !!value && setBalance(web3.utils.fromWei(value, 'ether'))
    }))()
  }, [shouldReload])

  async function recordInWhiteList() {
    await middlewareTry(contract.recordInWhiteList({from: account}))
  }

  async function sign() {
    await middlewareTry(contract.doSign({from: account}))
  }

  async function add(){
    await middlewareTry(contract.putInSafe({from: account, value: web3.utils.toWei('1', 'ether')}))
    reloadEffect()
  }

  async function getFromSafe(){
    await middlewareTry(contract.getFromSafe({from: account}))
    reloadEffect()
  }

  function middlewareDapp(callback) {
    return middlewareContract(!!contract && middlewareProvider(!!provider && callback))
  }

  return <AppContext.Provider value={{
            recordInWhiteList: middlewareDapp(recordInWhiteList), 
            sign: middlewareDapp(sign), 
            add: middlewareDapp(add), 
            getFromSafe: middlewareDapp(getFromSafe), 
            balance 
          }}>
            {children}
        </AppContext.Provider>
}