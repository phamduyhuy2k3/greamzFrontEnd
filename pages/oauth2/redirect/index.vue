<template>

</template>

<script setup>
const route=useRoute();
const router=useRouter();
const {token } = useAuthStore();
console.log(route.query)
if(route.query?.token){
  token.value=route.query.token;

}
window.close();
</script>

<style scoped>

</style>