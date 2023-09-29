export default defineNuxtRouteMiddleware(async (to, from) => {
    const { authenticated,userProfile } = storeToRefs(useAuthStore()); // make authenticated state reactive
    const token = useCookie('token'); // get token from cookies
    console.log(token.value)
   
       
    
    if (!token.value && !authenticated.value === true && !userProfile.authorities.includes("ADMIN")) {
       
        abortNavigation();

    }

})