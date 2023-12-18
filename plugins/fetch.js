import {ofetch} from "ofetch";

export default defineNuxtPlugin((_nuxtApp) => {
    const {getAccessToken, getRefreshToken, authenticated, setToken} = useAuthStore()
    const config = useRuntimeConfig()
    globalThis.$fetch = ofetch.create({
        retry: 1,
        retryStatusCodes: [401],
        retryDelay: 2500,
        server: false,
        async onResponseError({request, response, options}) {
            if (response.status === 401&&getRefreshToken!==null&&getRefreshToken!==undefined) {
                await useFetch(`${config.public.apiUrl}/api/v1/auth/refresh-token`, {
                    method: 'POST',
                    credentials: 'include',
                    headers: {
                        'Authorization': `Bearer ${getRefreshToken}`,
                    },
                    async onResponse({response}) {
                        await setToken(response._data.accessToken, response._data.refreshToken) // store token
                    },

                })
            }

        },



    });

});