export async function attempt (request, handlerError = () => {}) {
    try {
       const response = await request
       return response
    } catch (e) {
        console.error(e)
        handlerError(e)
    }
}