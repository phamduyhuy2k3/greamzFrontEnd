<template>

</template>

<script setup>
const route=useRoute();
const router=useRouter();
const {setToken } = useAuthStore();
console.log(route.query)
if(route.query?.token&&route.query?.refreshToken){
  alert('登录成功')
    setToken(route.query.token,route.query.refreshToken);

}

</script>

<style scoped>

</style>