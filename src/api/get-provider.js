// import Web3 from "web3";

// /** Native get provider */
// export async function detectEthereumProvider() {
//     let provider = null
//     if(window.ethereum) {
//       provider = window.ethereum
//       try {
//           await provider.request({method: 'eth_requestAccounts'})
//       } catch { 
//           console.error("User denied accounts access!")
//       }
//     } else if(window.web3) {
//       provider = window.web3.currentProvider
//     } else if(!process.env.production) {
//       provider = new Web3.providers.HttpProvider('http://localhost:7545')
//     }
//     return provider
// }

// export async function init() {

// }