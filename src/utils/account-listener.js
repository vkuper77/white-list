export function accountListener(provider, callback) {
    provider.on('accountsChanged', (accounts) => {
        callback(accounts[0])
    })
}