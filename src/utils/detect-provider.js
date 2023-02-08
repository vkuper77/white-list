import Web3 from "web3";
import detectEthereumProvider from '@metamask/detect-provider'
import { loadContract } from "../utils/load-contract";
import { middlewareTry } from "../middleware/middleware-try";

export async function detectProvider(callback) {
    const provider = await middlewareTry(detectEthereumProvider())
    if(Boolean(provider)) {
        const contract = await loadContract('Main', provider)
        await middlewareTry(provider.request({method: 'eth_requestAccounts'}))
        callback({provider, contract, web3: new Web3(provider)})
     } else{
         console.error("User denied accounts access!")
     }
 }