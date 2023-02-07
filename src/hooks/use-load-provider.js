import { useEffect, useState } from "react";
import Web3 from "web3";
import { getProvider } from "../api/get-provider";

const initState = {
    provider: null,
    web3: null 
  } 

export default function useLoadProvider() {
    const [web3Api, setWeb3Api] = useState(initState)
    useEffect(() => {
        async function loadProvider() {
            const provider = await getProvider()
            setWeb3Api({
                provider,
                web3: new Web3(provider)
            })
        }
        loadProvider()
    }, [])

    return web3Api
}