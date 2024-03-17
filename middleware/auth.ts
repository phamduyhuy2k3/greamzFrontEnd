export default defineNuxtRouteMiddleware(async (to, from) => {
    const {getAuthenticated, getUserProfile} = useAuthStore()

    if (!getAuthenticated ) {

        return navigateTo({
            path: from.path===to.path?"/":from.path,
            query: {message: "You are not authenticated. Please login first", alert: "info"}
        })
    }


});