export default defineNuxtRouteMiddleware(async (to, from) => {
    const {getAuthenticated} = storeToRefs(useAuthStore())
    if (!getAuthenticated.value ) {

        return navigateTo({
            path: from.path===to.path?"/":from.path,
            query: {message: "You are not authenticated. Please login first", alert: "info"}
        })
    }


});