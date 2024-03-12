const config = useRuntimeConfig()
const baseURL = config.apiBaseUrl


export default defineEventHandler(async (event) => {

    return baseURL
})