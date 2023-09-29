export default defineNuxtRouteMiddleware((to, from) => {
    const { authenticated,userProfile,token:userToken } = storeToRefs(useAuthStore());
    const {getUserProfile}=useAuthStore() // make authenticated state reactive
    const token = useCookie('token');

    if (token.value) {
        userToken.value=token.value
        getUserProfile().then(()=>{
            authenticated.value = true;
        });
    }
    
    if (token.value && to?.name === 'login') {
        return navigateTo({
            path: '/',
            query:{logOut :true}
        });
    }

    // if token doesn't exist redirect to log in
    if (!token.value && to?.name !== 'login' && to?.name !== 'register') {
        abortNavigation();
        return navigateTo('/login');
    }

})