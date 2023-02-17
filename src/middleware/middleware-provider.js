import { store } from "../store"
import { deleteNotificationInfo, setNotificationInfo } from "../store/slice/appSlice"

export function middlewareProvider(callback) {
    return () => {
      if(typeof callback !== 'function') {
         store.dispatch(setNotificationInfo({id: 'middlewareProvider', autoHide: false, position: 'top', text: 'Wallet is not detected! You need install Metamask!', urlName: 'Install Metamask', url: 'https://metamask.io/download/'}))  
         return
      }
      store.dispatch(deleteNotificationInfo('middlewareProvider'))
      return callback()
    }
  }