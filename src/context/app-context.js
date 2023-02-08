import useLoadProvider from "@/src/hooks/use-load-provider";
import { useEffect, useState, createContext } from "react";
import { accountListener } from "../utils/account-listener";
import { attempt } from "../utils/error-listener";

export const AppContext = createContext(null)

export function AppProvider({children}) {
  const [account, setAccount] = useState(null)
  const [balance, setBalance] =useState(0)
  const [shouldReload, reload] = useState(false)

  const {web3, provider, contract} = useLoadProvider()

  function reloadEffect () {
    reload(p => !p)
  }

  useEffect(() => {
    !!provider && accountListener(provider, setAccount)
  }, [provider])

  useEffect(() => {
    !!web3 && (async () => {
        const [ acc ] = await attempt(web3.eth.getAccounts())
        const contractBalance = await attempt(web3.eth.getBalance(contract.address))
        setAccount(acc)
        setBalance(web3.utils.fromWei(contractBalance, 'ether'))
    })()
  }, [web3])

  useEffect(() => {
    !!web3 && (async () => {
      const value = await attempt(web3.eth.getBalance(contract.address))
      !!value && setBalance(web3.utils.fromWei(value, 'ether'))
    })()
  }, [shouldReload])

  async function recordInWhiteList() {
      await attempt(contract.recordInWhiteList({from: account}))
  }

  async function sign() {
    await attempt(contract.doSign({from: account}))
  }

  async function add(){
      await attempt(contract.putInSafe({from: account, value: web3.utils.toWei('1', 'ether')}))
      reloadEffect()
  }

  async function getFromSafe(){
    await attempt(contract.getFromSafe({from: account}))
    reloadEffect()
  }

    return <AppContext.Provider value={{recordInWhiteList, sign, add, getFromSafe, balance }}>{children}</AppContext.Provider>
}