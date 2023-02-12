export async function middlewareTry (request, handlerError = () => {}) {
    try {
       const response = await request
       return response
    } catch (e) {
        handlerError(e)
        console.error(e)
    }
}