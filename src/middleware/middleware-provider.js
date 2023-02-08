export function middlewareProvider(callback) {
    return () => {
      if(typeof callback !== 'function') {
         const consent = confirm('Wallet is not detected!\nYou need install Metamask!')
         consent && window.open('https://metamask.io/download/')
        return
      }
      return callback()
    }
  }