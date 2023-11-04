<template>

</template>

<script setup>
const route=useRoute();
const router=useRouter();

if(route.query?.token){

  router.push({
    path: "/",
    query: { loginSuccess: "true" },
  });
}else {
  router.push({
    path: "/login",
    query: { loginSuccess: "false" },
  });
}
</script>

<style scoped>

</style>