import {defineStore} from "pinia";
import type UserProfile from "~/types";
import type UserPayloadInterface from "~/types";
import type UserRegisterForm from "~/types";
import {useCookie} from "nuxt/app";


export const useAuthStore = defineStore("auth", () => {
    const config = useRuntimeConfig();
    const domain = config.public.appUrl.includes("localhost") ? "localhost" : config.public.appUrl.replace("https://", "").replace("http://", "");
    const token = ref(useCookie('accessToken', {
        watch: true,

    }))
    const refreshToken = ref(useCookie('refreshToken', {
        watch: true,
    }))
    const authenticated = ref(false)
    const loading = ref(false)
    const userProfile = ref({} as UserProfile)
    const OAUTH2_REDIRECT_URI = config.public.appUrl + '/oauth2/redirect/';
    const GOOGLE_AUTH_URL = config.public.apiUrl + '/oauth2/authorize/google?redirect_uri=' + OAUTH2_REDIRECT_URI;

    const getAuthenticated = computed(() => authenticated.value);

    async function authenticateUser(authDataRequest: UserPayloadInterface) {
        const {data, pending, error}: any = await useFetch(
            config.public.apiUrl + "/api/v1/auth/authenticate",
            {
                key: "authenticate_" + Math.random() * 1000,
                method: "post",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(authDataRequest),

            },
        );
        loading.value = pending;
        if (error.value) {

            if (error.value?.data?.error === "User is disabled") {
                return "Your account is disabled. Please contact the administrator";
            }

            loading.value = false;
            authenticated.value = false;
            return false;
        }
        if (data.value) {

            token.value = data?.value.accessToken;
            refreshToken.value = data?.value.refreshToken;
            loading.value = false
            authenticated.value = true;
            return await getUserProfile().then((res) => {
                return res;
            });
        }
    }

    async function authRegisterUser(registerData: UserRegisterForm) {
        const {data, pending, error}: any = await useFetch(
            config.public.apiUrl + "/api/v1/auth/register",
            {
                method: "post",
                headers: {"Content-Type": "application/json"},
                body: registerData,

            },
        );
        loading.value = pending;
        if (error.value) {
            loading.value = false;
            authenticated.value = false;
            if (error.value?.data?.error === "User is disabled") {
               await setToken(null, null);
                return false;
            }


            return false;
        }
        if (data.value) {
            loading.value = false
            return true;
        }
    }

    async function getUserProfile(): Promise<boolean> {
        if(!authenticated||token.value===null||token.value===undefined||token.value===""){
            return false;
        }
        loading.value = true;
        const {data, error, pending, execute}: any = await useAsyncData('getUserProfile_' + Math.random() * 100, () =>
            $fetch(
                config.public.apiUrl + "/api/user/currentUser",
                {
                    method: "GET",
                    headers: {
                        'Authorization': 'Bearer ' + token.value,
                    }

                },
            )
        );

        if (data.value) {
            userProfile.value = data?.value;
            authenticated.value = true;
            loading.value = false;
            console.log(userProfile.value)
            return true;
        } else if (error.value) {
            loading.value = false
            return false;
        } else {
            loading.value = false
            return false;
        }
    }

    async function setProfile(profile: UserProfile) {
        userProfile.value = profile;
    }

    async function setToken(accessToken: any, refreshTokenValue: any) {
        token.value = accessToken;
        refreshToken.value = refreshTokenValue;
        authenticated.value = true;
        await getUserProfile()
    }

    async function updateToken() {
        token.value = useCookie('accessToken', {
            watch: true,
        }).value
        refreshToken.value = useCookie('refreshToken', {
            watch: true,
        }).value

    }

    async function logUserOut() {

        authenticated.value = false;
        userProfile.value = {} as UserProfile;
        token.value = null;
        refreshToken.value = null;
        loading.value = false;
        navigateTo({
            path: '/login',
            query: {
                message: 'Logout success',
                alert: 'success'
            }
        })
    }
    const getAccessToken = computed(() => token.value);
    const getRefreshToken = computed(() => refreshToken.value);
    return {
        authenticated,
        loading,
        token,
        refreshToken,
        userProfile,
        updateToken,
        authenticateUser,
        getUserProfile,
        logUserOut,
        authRegisterUser,
        GOOGLE_AUTH_URL,
        OAUTH2_REDIRECT_URI,
        setProfile,
        getAuthenticated,
        setToken,
        getAccessToken,
        getRefreshToken
    }
});

