import { store } from "../store"
import { deleteNotificationInfo, setNotificationInfo } from "../store/slice/appSlice"

export function middlewareContract(callback) {
    return () => {
      if(typeof callback !== 'function') {
        store.dispatch(setNotificationInfo({id: 'middlewareContract', autoHide: false, position: 'top', text: 'Please join the Goerli test Network or install Ganache...', url: null}))  
        return 
      }
      store.dispatch(deleteNotificationInfo('middlewareContract'))
      return callback()
    }
  }