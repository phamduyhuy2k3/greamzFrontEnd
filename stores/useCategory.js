

export const useCategory = defineStore("category",  () => {
    const categories = ref([]);
    const platforms = ref([]);
    const getCategories=computed(()=>categories.value)
    const getPlatforms=computed(()=>platforms.value)
    const fetch= async () => {
        if(categories.value.length>0 &&platforms.value.length>0) {
            return;
        }
        await useFetch(`${useRuntimeConfig().public.apiUrl}/api/v1/category/findAll`, {
            method: 'GET',
            transform: (data) => {
                categories.value = data;
            }
        })
        await useFetch(`${useRuntimeConfig().public.apiUrl}/api/v1/platform/findAll`,{
            method: 'GET',
            transform: (data) => {
                platforms.value = data;
            }
        })
    }
    return{
        getCategories,
        fetch,
        getPlatforms
    }
})