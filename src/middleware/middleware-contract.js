export function middlewareContract(callback) {
    return () => {
      if(typeof callback !== 'function') {
        return alert('Please join the test Network')
      }
      return callback()
    }
  }