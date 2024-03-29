

export const useCategory = defineStore("category",  () => {
    const categories = ref([]);
    const platforms = ref([]);
    const getCategories=computed(()=>categories.value)
    const getPlatforms=computed(()=>platforms.value)
    const fetch= async () => {
        if(categories.value.length>0) {
            return;
        }
        await useFetch(`/api/server/v1/category/findAllFromClient`, {
            method: 'GET',
            transform: (data) => {
                categories.value = data;
            }
        })

    }
    return{
        getCategories,
        fetch,
        getPlatforms
    }
})