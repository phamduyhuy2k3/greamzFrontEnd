import {defineEventHandler, getCookie,setCookie, getHeaders, getQuery, readBody, sendRedirect,deleteCookie,sendError,readMultipartFormData} from "h3";
import {$fetch} from "ofetch";
const config = useRuntimeConfig()
const baseURL = config.apiBaseUrl
const appUrl = config.public.appUrl
const env=config.public.ENV
const refreshTokenEndpoint = `${baseURL}/api/v1/auth/refresh-token`
export default defineEventHandler(async (event) => {
    const method = event.method

    const params = getQuery(event)

    const headers = getHeaders(event)

    const url = event.node.req.originalUrl?.replace('/api/server','/api') as string

    const body = method === "GET" ? undefined :  await readBody(event)
    const accessToken=getCookie(event, 'access_token') as string
    const refreshToken = getCookie(event, 'refresh_token') as string;

    let authorization = headers.authorization;
    if (authorization?.includes('Bearer')) {
        authorization = `Bearer ${accessToken}`;

    }
    console.log(url)
    const responseData = await $fetch(url, {
        headers: {
            "Content-Type": headers["content-type"] as string,
            Authorization: authorization as string,

        },
        baseURL,
        method,
        params,
        body,
        async onResponseError({request, response}): Promise<void> {
            console.log(response)
            // Access token expired, try to refresh it
            if (response.status === 401 && authorization?.startsWith('Bearer') && authorization?.split(' ')[1] !== undefined) {

                try {
                    // Assuming refresh token is stored in a cookie
                    if (refreshToken === undefined) {
                        console.log('Refresh token not found')
                        return

                    }const refreshResponse = await $fetch(refreshTokenEndpoint, {
                        method: 'POST',
                        baseURL,
                        headers: {
                            Authorization: `Bearer ${refreshToken}`
                        },
                        async onResponseError({response}): Promise<void> {
                            if (response.status === 401) {
                                return

                            }
                        }
                    });
                    console.log(refreshResponse)
                    setCookie(event, 'access_token', refreshResponse.access_token, {
                        httpOnly: true,
                        path: '/',
                        maxAge: refreshResponse.expires_in*60,
                        secure: env !== "dev"
                    })
                    setCookie(event, 'refresh_token', refreshResponse.refresh_token, {
                        httpOnly: true,
                        path: '/',
                        maxAge: refreshResponse.refresh_token_expires_in*60,
                        secure: env !== "dev",
                    })
                    authorization = `Bearer ${refreshResponse.access_token}`;


                } catch (refreshError) {
                    // console.error('Refresh error:', refreshError);
                }
            }
            //Access token absent, redirect to login
            else if (response.status === 401 && authorization?.startsWith('Bearer') && authorization?.split(' ')[1] === undefined) {
                return
            }
            // Other errors
            else {
                // console.log('Error ', response.status)
                // console.log('Request ', request)
                // console.log('Response ', response)
            }
        },
        onResponse({ request, response, options }) {
            console.log(request.toString())
            if(response._data['access_token']&&request.toString().includes('api/v1/auth')){
                setCookie(event, 'access_token', response._data['access_token'], {
                    httpOnly: true,
                    path: '/',
                    maxAge: response._data['expires_in']*60,
                    secure: env !== "dev"
                })
                setCookie(event, 'refresh_token', response._data['refresh_token'], {
                    httpOnly: true,
                    path: '/',
                    maxAge: response._data['refresh_token_expires_in']*60,
                    secure: env !== "dev"
                })
            }
            if(request.toString().includes('/api/v1/auth/logout')){
                setCookie(event, 'refresh_token', '', {
                    maxAge: 0,

                })
                setCookie(event, 'access_token', '', {
                    maxAge: 0,
                })
            }
        }
    }).catch(async (error) => {
        console.log(error)
        if (error.status === 401 ) {
            if ((authorization?.startsWith('Bearer') && authorization?.split(' ')[1] !== undefined)){
                return await $fetch(url, {
                    headers: {
                        Authorization: authorization as string,
                    },
                    baseURL,
                    method,
                    params,
                    body,
                });
            }

        }
        return sendError(event, error)

    })
    return responseData;
})
