<template>
  <Header></Header>
  <main>
    <slot />
  </main>
  <Footer></Footer>
</template>

<script setup>
import { initFlowbite } from "flowbite";
onMounted(() => {
  initFlowbite();

});
const { breadcrumbs } = userBreadCrumb();
</script>

<style scoped>
main {
  background-image: url("/img/new_login_bg_strong_mask.jpg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}
</style>
