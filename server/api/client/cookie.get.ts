import {defineEventHandler} from "h3";

const config = useRuntimeConfig()
const baseURL = config.apiBaseUrl
import {getCookie, createError} from "h3";
import {useAuthStore} from "~/stores/auth";

export default defineEventHandler(async (event) => {
    const token =await getCookie(event, 'access_token')
    if (token === undefined) {
        return createError({
            status: 401, message: 'Unauthorized'
        })
    }
    const object = {
        accessToken:token,
        apiBaseUrl: baseURL,
    }
    return object
})