import { store } from "../store"
import { setNotificationInfo } from "../store/slice/appSlice"

export async function middlewareTry (request, handlerError = () => {}, targetQuery = null) {
    try {
       const response = await request
       if(targetQuery) {
            store.dispatch(setNotificationInfo({id: Date.now(), success: true, position: 'left', text: ['You successfully', targetQuery], url: ''}))  
       }
       return response
    } catch (e) {
        console.warn(e)
        if(targetQuery) {
            store.dispatch(setNotificationInfo({id: Date.now(), success: false, position: 'left', text: ['You are not successful', targetQuery], url: ''}))
        }
        return typeof handlerError === 'function' && handlerError(e)
    }
}