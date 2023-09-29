
import { defineStore } from 'pinia';
import UserProfile from "~/types";
import UserToken from "~/types";
import UserPayloadInterface from "~/types";
import UserRegisterForm from "~/types";

export const useAuthStore = defineStore('auth', {

    state: () => ({
        authenticated: false,
        loading: false,
        userProfile: {} as UserProfile,
        token: {} as UserToken
    }),
    actions: {
        async authenticateUser(authDataRequest: UserPayloadInterface) {
            const { data, pending,error }: any = await useFetch('http://localhost:8080/api/v1/auth/authenticate', {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(authDataRequest),
            });
            this.loading = pending;
            if(error.value){
                this.loading = false;
                this.authenticated = false;
                return false;
            }
            if (data.value) {
                const token = useCookie('token');
                token.value = data.value;
                this.token = data.value;
                this.getUserProfile().then(()=>{
                    this.authenticated = true;
                });
                return true;

            }
        },
        async authRegisterUser(registerdata: UserRegisterForm) {
            const { data, pending, error }: any = await useFetch('http://localhost:8080/api/v1/auth/register', {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: registerdata
            })
            this.loading = pending;

            console.log(error);
            if(error.value){
                this.loading = false;
                this.authenticated = false;
                return false;
            }
            console.log(data);
            if (data.value) {
                const token = useCookie('token');
                token.value = data?.value;
                this.token=data.value
                this.getUserProfile().then(()=>{
                    this.authenticated = true;
                });
                return true;
            }
        },
        async getUserProfile() {

            const { data, pending }: any = await useFetch('http://localhost:8080/api/v1/user/profile', {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + this.token.access_token,
                }
            })
            this.loading = pending;
            if(data.value){
                this.userProfile = data?.value;
                console.log(this.userProfile);
            }

        },

        logUserOut() {
            const token = useCookie('token');
            this.authenticated = false;
            token.value = null;
            this.userProfile = {} as UserProfile;
            this.token = {} as UserToken;
        },
    },
});