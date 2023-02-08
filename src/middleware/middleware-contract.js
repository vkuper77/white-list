export function middlewareContract(callback) {
    return () => {
      if(typeof callback !== 'function') {
        alert('Connect to Ganache')
        return
      }
      return callback()
    }
  }