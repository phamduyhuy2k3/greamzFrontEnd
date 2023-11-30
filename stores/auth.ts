import {defineStore} from "pinia";
import type UserProfile from "~/types";
import type UserPayloadInterface from "~/types";
import type UserRegisterForm from "~/types";
import {useCookie} from "nuxt/app";


export const useAuthStore = defineStore("auth", () => {
    const config = useRuntimeConfig();
    const token = ref(useCookie('accessToken', {
        watch: true,
        default: () => '',
    }))
    const authenticated = ref(false)
    const loading = ref(false)
    const userProfile = ref({} as UserProfile)
    const OAUTH2_REDIRECT_URI = config.public.appUrl+'/oauth2/redirect';
    const GOOGLE_AUTH_URL = config.public.apiUrl + '/oauth2/authorize/google?redirect_uri=' + OAUTH2_REDIRECT_URI;

    const getAuthenticated = computed(() => authenticated.value);

    async function authenticateUser(authDataRequest: UserPayloadInterface) {
        const {data, pending, error}: any = await useFetch(
            config.public.apiUrl + "/api/v1/auth/authenticate",
            {
                key:"authenticate_"+Math.random()*1000,
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
            if(token.value===data?.value.accessToken){
                console.log('token set')
            }
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

            return false;
        }
        if (data.value) {
            loading.value = false
            return true;
        }
    }

    async function getUserProfile(): Promise<boolean> {

        loading.value = true;
        const {data, error, pending}: any = await useAsyncData('getUserProfile_' + Math.random() * 100, () =>
            $fetch(
                config.public.apiUrl + "/api/user/currentUser",
                {
                    method: "GET",
                    headers: {
                        'Authorization': `Bearer ${token.value}`
                    },
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
    async function setToken(tokentoSet: string) {
        token.value = tokentoSet;
    }
    async function logUserOut() {
        const {error,status}=await useAsyncData('logUserOut_'+Math.random()*100,
            ()=>
                $fetch(`${config.public.apiUrl}/api/v1/auth/logout`,{
                    method:"post",
                    headers: {
                        "Authorization": "Bearer " + token.value,
                    }
                })
        )
        console.log(status)
        if(error.value){
            return
        }
        authenticated.value = false;
        userProfile.value = {} as UserProfile;
        token.value = '';
        loading.value = false;
        navigateTo({
            path: '/login',
            query: {
                message: 'Logout success',
                alert: 'success'
            }
        })
    }

    return {
        authenticated,
        loading,
        token,
        userProfile,
        authenticateUser,
        getUserProfile,
        logUserOut,
        authRegisterUser,
        GOOGLE_AUTH_URL,
        OAUTH2_REDIRECT_URI,
        setProfile,
        getAuthenticated,
        setToken
    }
});

