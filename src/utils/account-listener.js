export function accountListener(provider, callback) {
    provider.on('accountsChanged', callback)
    provider.on('chainChanged', callback)
    provider._jsonRpcConnection.events.on('notification', ({ method }) => {
        if(method === 'metamask_unlockStateChanged') {
            // callback(null)
            callback()
        }
    })
}