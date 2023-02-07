import { useEffect, useState } from "react";
import Web3 from "web3";
import detectEthereumProvider from '@metamask/detect-provider'

const initState = {
    provider: null,
    web3: null 
  } 

export default function useLoadProvider() {
    const [web3Api, setWeb3Api] = useState(initState)
    useEffect(() => {
        async function loadProvider() {
            const provider = await detectEthereumProvider()
            if(Boolean(provider)) {
                await provider.request({method: 'eth_requestAccounts'})
                setWeb3Api({provider, web3: new Web3(provider)})
            } else{
                console.error("User denied accounts access!")
            }
        }
        loadProvider()
    }, [])

    return web3Api
}