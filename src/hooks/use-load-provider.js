import { useEffect, useState } from "react";
import { detectProvider } from "@/src/utils/detect-provider";

const initState = {
    provider: null,
    web3: null,
    contract: null 
} 

export default function useLoadProvider() {
    const [web3Api, setWeb3Api] = useState(initState)

    useEffect(() => {
        getProvider()
    }, [])

    function getProvider() {
        detectProvider(setWeb3Api)
    }

    return {...web3Api, coldBoot: getProvider}
}