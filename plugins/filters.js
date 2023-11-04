export default defineNuxtPlugin(()=>{
    return {
        provide: {
            currency: (msg) => new Intl.NumberFormat('vi-VI', { style: 'currency', currency: 'VND' }).format(
                msg,
            )
        }
    }
})