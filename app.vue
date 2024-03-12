<script setup>
import {initFlowbite} from "flowbite";
const{fetch}=useCart()
const config=useRuntimeConfig();
const target = ref(null)
useHead(() => {
  return {
    title: "Greamz",
    meta: [
      {
        name: "description",
        content: "Game Store",
      },
    ],
    link:{
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css?family=Audiowide|Sofia|Trirong|Nunito",
    }
  };
});
onMounted(async () => {
  initFlowbite();

  await fetch();

})
if(config.public.ENV=='production'){
  console.log=function(){};
}

</script>
<template>
  <NuxtLayout>
    <n-message-provider >
      <NuxtLoadingIndicator >
      </NuxtLoadingIndicator>
      <NuxtPage ref="page" />
    </n-message-provider>
  </NuxtLayout>
</template>

<style>

</style>
