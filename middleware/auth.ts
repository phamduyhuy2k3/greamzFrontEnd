export default defineNuxtRouteMiddleware(async (to, from) => {
    const {getAuthenticated, getUserProfile} = useAuthStore()

    const result =await getUserProfile().then((res) => {
        return res
    })

    if (!getAuthenticated || !result) {

        return navigateTo({
            path: from.path===to.path?"/":from.path,
            query: {message: "You are not authenticated. Please login first", alert: "info"}
        })
    }


});