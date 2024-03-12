import {
    defineEventHandler,
    getCookie,
    getHeaders,
    getQuery,
    readBody,
    sendRedirect,
    deleteCookie,
    sendError,
    readMultipartFormData
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

    let authorization = headers.authorization;
    if (authorization?.includes('Bearer')) {
        authorization = `Bearer ${refreshToken}`;

    }
    const responseData = await $fetch('/api/v1/auth/logout', {
        headers: {
            "Content-Type": headers["content-type"] as string,
            Authorization: authorization as string,

        },
        baseURL,
        method,
        params,
        body,
        onResponse({
                       response
                   }): Promise<void> | void {
            deleteCookie(event, 'refresh_token')
            deleteCookie(event, 'access_token')
        }
    });

    return responseData
})