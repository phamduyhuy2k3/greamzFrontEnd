
import {defineStore} from "pinia";

export const useCategory =  defineStore("category",  () =>{
    const config = useRuntimeConfig();
    const categories = ref([]);
    useFetch(
        config.public.apiUrl+"/api/v1/category/findAll",
        {
            method: "get",
            headers: {
                "Content-Type": "application/json",
                'Authorization': 'Bearer '+useAuthStore().token
            },
            transform: (response) => {
                this.categories.value = response.data;
            }
        },

    );

    return {
        categories
    }

})