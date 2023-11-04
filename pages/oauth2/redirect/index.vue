<template>

</template>

<script setup>
const route=useRoute();
const router=useRouter();
const {token } = useAuthStore();
if(route.query?.token){

}else {
  router.push({
    path: "/login",
    query: { message: "Login failed", alert: "error" },
  });
}
</script>

<style scoped>

</style>