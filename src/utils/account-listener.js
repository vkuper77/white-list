export function accountListener(provider, callback) {
    
    provider.on('accountsChanged', (accounts) => {
        callback(accounts[0])
    })

    provider._jsonRpcConnection.events.on('notification', payload => {
        const { method } = payload
        if(method === 'metamask_unlockStateChanged') {
            callback(null)
        }
    })
}