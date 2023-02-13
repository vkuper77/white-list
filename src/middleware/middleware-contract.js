export function middlewareContract(callback) {
    return () => {
      if(typeof callback !== 'function') {
        return alert('Connect to Ganache: [Test Environment]')
      }
      return callback()
    }
  }