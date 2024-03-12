
import type {UserProfile,UserPayloadInterface,UserRegisterForm} from "~/types";


export  const useAuthStore = defineStore("auth", () => {
        const {clearItems}=useCart()
        const authenticated = ref(false)
        const loading = ref(false)
        const userProfile = ref({} as UserProfile)
        const getAuthenticated = computed(() => authenticated.value);
        async function authenticateUser(authDataRequest: UserPayloadInterface) {
            const {data, pending, error}: any = await useFetch(
                "/api/server/v1/auth/authenticate",
                {
                    key: "authenticate_" + Math.random() * 1000,
                    method: "post",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify(authDataRequest),

                } ,
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

                loading.value = false
                return true;
            }
        }

        async function authRegisterUser(registerData: UserRegisterForm) {
            const {data, pending, error}: any = await useFetch("/api/server/v1/auth/register",
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
            loading.value = true;
            const {data, error, pending, execute}: any = await useFetch("/api/server/user/currentUser",
                {
                    method: "GET",
                    headers: {
                        'Authorization': 'Bearer '
                    }

                })

            if (data.value) {
                userProfile.value = data?.value;
                authenticated.value = true;
                loading.value = false;
                if(userProfile.value.photo===null || userProfile.value.photo===undefined){
                    userProfile.value.photo="/img/user_avatar.jpeg"

                }
                return true;
            }
            else {
                loading.value = false
                authenticated.value = false;
                return false;
            }
        }
        const getProfile=computed(()=>userProfile.value)

        async function setProfile(profile: UserProfile) {
            userProfile.value = profile;
        }

        async function setToken(accessToken: any, refreshTokenValue: any) {

            authenticated.value = true;
            await getUserProfile()
        }



        async function logUserOut() {

            await useFetch("/api/server/logout",{
                method: "POST",
                headers: {
                    'Authorization': 'Bearer '
                }
            })
            userProfile.value = {} as UserProfile;
            authenticated.value = false;
            clearItems()
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
            userProfile,
            authenticateUser,
            getUserProfile,
            logUserOut,
            authRegisterUser,
            setProfile,
            getAuthenticated,
            setToken,
            getProfile

        }
    },
);

