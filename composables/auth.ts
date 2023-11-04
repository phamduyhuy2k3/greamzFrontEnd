import {defineStore} from "pinia";
import type UserProfile from "~/types";
import type UserPayloadInterface from "~/types";
import type UserRegisterForm from "~/types";

export const API_BASE_URL = 'http://localhost:8080';
export const OAUTH2_REDIRECT_URI = 'https://greamz.games/oauth2/redirect'
export const GOOGLE_AUTH_URL = API_BASE_URL + '/oauth2/authorize/google?redirect_uri=' + OAUTH2_REDIRECT_URI;
export const useAuthStore = defineStore("auth", () => {
    const config = useRuntimeConfig();
    const authenticated = ref(false)
    const loading = ref(false)
    const token = ref(useCookie("accessToken").value || "")
    const userProfile = ref({} as UserProfile)
    async function authenticateUser(authDataRequest: UserPayloadInterface) {
        const {data, pending, error}: any = await useFetch(
            config.public.apiUrl+"/api/v1/auth/authenticate",
            {
                method: "post",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(authDataRequest),

            },
        );
        loading.value = pending;
        if (error.value) {
            loading.value = false;
            authenticated.value = false;
            return false;
        }
        if (data.value) {
            token.value = data?.value.accessToken;
            useCookie("accessToken").value = data?.value.accessToken;
            console.log(data?.value.accessToken)
            getUserProfile().then(() => {
                authenticated.value = true;
            });
            return true;
        }
    }


    async function authRegisterUser(registerData: UserRegisterForm) {
        const {data, pending, error}: any = await useFetch(
            config.public.apiUrl+ "/api/v1/auth/register",
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

            return false;
        }
        if (data.value) {
            token.value = data?.value.accessToken;
            useCookie("accessToken").value = data?.value.accessToken;
            getUserProfile().then(() => {
                authenticated.value = true;
            });
            return true;
        }
    }
    async function getUserProfile() {
        const {data, pending}: any = await useFetch(
            config.public.apiUrl+ + "/api/v1/user/profile",
            {
                method: "GET",
                headers: {
                    Authorization: "Bearer " + token.value,
                },
            },
        );
        loading.value = pending;
        if (data.value) {
            userProfile.value = data?.value;

        }
    }
    async function logUserOut()
    {
        authenticated.value = false;
        userProfile.value = {} as UserProfile;
        token.value = '';
    }

    return{
        authenticated,
        loading,
        token,
        userProfile,
        authenticateUser,
        getUserProfile,
        logUserOut,
        authRegisterUser,
        GOOGLE_AUTH_URL
    }
});

