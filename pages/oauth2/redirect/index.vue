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
</script>

<style scoped>

</style>