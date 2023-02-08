export async function attempt (callback) {
    try {
       const response = await callback
       return response
    } catch (e) {
        console.error(e)
    }
}