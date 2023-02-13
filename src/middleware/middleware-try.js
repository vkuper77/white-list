export async function middlewareTry (request, handlerError = () => {}) {
    try {
       const response = await request
       return response
    } catch (e) {
        console.warn(e)
        return handlerError(e)
    }
}