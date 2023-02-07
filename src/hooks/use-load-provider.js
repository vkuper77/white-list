import { useEffect, useState } from "react";
import Web3 from "web3";
import detectEthereumProvider from '@metamask/detect-provider'
import { loadContract } from "../utils/load-contract";

const initState = {
    provider: null,
    web3: null,
    contract: null 
  } 

export default function useLoadProvider() {
    const [web3Api, setWeb3Api] = useState(initState)
    useEffect(() => {
        async function loadProvider() {
            const provider = await detectEthereumProvider()
            const contract = await loadContract('Main', provider)
            if(Boolean(provider)) {
                await provider.request({method: 'eth_requestAccounts'})
                setWeb3Api({provider, contract, web3: new Web3(provider)})
            } else{
                console.error("User denied accounts access!")
            }
        }
        loadProvider()
    }, [])

    return web3Api
}