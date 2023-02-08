import useLoadProvider from "@/src/hooks/use-load-provider";
import { useEffect, useState, createContext } from "react";
import { accountListener } from "../utils/account-listener";

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
      try {
        const [ acc ] = await web3.eth.getAccounts()
        const contractBalance = await web3.eth.getBalance(contract.address)
        setAccount(acc)
        setBalance(web3.utils.fromWei(contractBalance, 'ether'))
      } catch(e) {
        console.error(e)
      }
    })()
  }, [web3])

  useEffect(() => {
    !!web3 && (async () => {
      try {
        const value = await web3.eth.getBalance(contract.address)
        setBalance(web3.utils.fromWei(value, 'ether'))
      } catch {
        console.error('Failed to get wallet')
      }
    })()
  }, [shouldReload])

  async function getStorage() {
    const key = await web3.eth.getBlock('latest')
    console.log(key)
  }

  async function recordInWhiteList(){
    try {
      const res = await contract.recordInWhiteList({from: account})
    } catch(e) {
      console.error(e)
    }
  }

  async function sign() {
    try {
      const res = await contract.doSign({from: account})
    } catch(e) {
      console.error(e)
    }
  }

  async function add(){
    try {
      const res = await contract.putInSafe({from: account, value: web3.utils.toWei('1', 'ether')})
      reloadEffect()
    } catch(e) {
      console.error(e)
    }
  }

  async function getFromSafe(){
    try {
      const res = await contract.getFromSafe({from: account})
      reloadEffect()
    } catch(e) {
      console.error(e)
    }
  }

    return <AppContext.Provider value={{getStorage, recordInWhiteList, sign, add, getFromSafe, balance }}>{children}</AppContext.Provider>
}