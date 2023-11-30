
export default defineNuxtRouteMiddleware(async (to,from) => {

    await useCart().updateCartFromDatabase()
    await useAuthStore().getUserProfile()
});