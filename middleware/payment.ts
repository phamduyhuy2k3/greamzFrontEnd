
export default defineNuxtRouteMiddleware(async (to,from) => {
    const {getAuthenticated, getUserProfile} = useAuthStore()
    const {getItems}=useCart()
    const result =await getUserProfile().then((res) => {
        return res
    })

    if (!getAuthenticated || !result) {
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