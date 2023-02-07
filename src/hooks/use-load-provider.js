import { useEffect, useState } from "react";
import Web3 from "web3";

const initSate = {
    provider: null,
    web3: null 
  }

export default function useLoadProvider() {
    const [web3Api, setWeb3Api] = useState(initSate)
      useEffect(() => {
        async function loadProvider() {
          let provider = null
          if(window.ethereum) {
            provider = window.ethereum
            try {
                await provider.enable()
            } catch { 
                console.error("User denied accounts access!")
            }
          } else if(window.web3) {
            provider = window.web3.currentProvider
          } else if(!process.env.production) {
            provider = new Web3.providers.HttpProvider('http://localhost:7545')
          }
          setWeb3Api({
            provider,
            web3: new Web3(provider)
          })
        }

        loadProvider()
      }, [])

    return web3Api
}