export default defineNuxtPlugin((nuxtApp) =>{
    const {getUserProfile}=useAuthStore()
    const {fetch}=useCart()
    nuxtApp.hook('app:beforeMount', async () => {

        await getUserProfile().then(async (user)=>{
            if(user){
                await fetch()
            }
        })
    })
})