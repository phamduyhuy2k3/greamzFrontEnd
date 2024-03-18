
export default defineNuxtRouteMiddleware(async (to,from) => {
    const {getAuthenticated} =storeToRefs( useAuthStore())
    const {getItems}=useCart()
    if (getAuthenticated.value===false ) {
        return navigateTo({
            path: from.path==="/payment"?"/cart":from.path,
            query: {message: "You are not authenticated. Please login first", alert: "info"}
        })

    }

    if( getItems.length<=0){

        return navigateTo({
            path: from.path==="/payment"?"/cart":from.path,
            query: {message: "Your cart is empty. Please add items to your cart first", alert: "info"}
        })
    }




});