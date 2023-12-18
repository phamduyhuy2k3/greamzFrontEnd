<template>

</template>

<script setup>
const route=useRoute();
const router=useRouter();
const {setToken } = useAuthStore();
console.log(route.query)
if(route.query?.token&&route.query?.refreshToken){
    setToken(route.query.token,route.query.refreshToken);
    router.push('/');

}

</script>

<style scoped>

</style>