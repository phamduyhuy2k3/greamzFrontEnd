
export default defineNuxtRouteMiddleware(async (to,from) => {

    const {getUserProfile}=useAuthStore()
    await getUserProfile()


});