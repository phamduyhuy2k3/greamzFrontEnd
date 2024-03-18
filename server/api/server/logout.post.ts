import {
    defineEventHandler,
    getCookie,
    getHeaders,
    getQuery,
    readBody,
    sendRedirect,
    deleteCookie,
    sendError,
    readMultipartFormData, setCookie
} from "h3";
import {$fetch} from "ofetch";

const config = useRuntimeConfig()
const baseURL = config.apiBaseUrl
export default defineEventHandler(async (event) => {
    const method = event.method

    const params = getQuery(event)

    const headers = getHeaders(event)
    const body = method === "GET" ? undefined : await readBody(event)
    const refreshToken = getCookie(event, 'refresh_token')
    console.log(refreshToken)
    let authorization = headers.authorization;
    if (authorization?.includes('Bearer')) {
        authorization = `Bearer ${refreshToken}`;

    }
    const responseData = await $fetch('/api/v1/auth/logout', {
        headers: {
            Authorization: authorization as string,

        },
        baseURL,
        method,
        params,
        body

    });
    setCookie(event, 'refresh_token', '', {
        maxAge: 0,

    })
    setCookie(event, 'access_token', '', {
        maxAge: 0,
    })
    return responseData
})