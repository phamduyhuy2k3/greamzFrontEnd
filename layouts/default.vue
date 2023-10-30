<template>
  <LazyHeader></LazyHeader>
  <main class="">

    <slot>
    </slot>
  </main>
  <LazyFooter></LazyFooter>
</template>

<script setup>
import { initFlowbite } from "flowbite";
onMounted(() => {
  initFlowbite();

});

</script>

<style scoped>
main{
  background-color: #161a3a;
}

</style>
