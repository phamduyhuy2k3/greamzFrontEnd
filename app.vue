<script setup>
import {initFlowbite} from "flowbite";
const config=useRuntimeConfig();
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

})
// if(config.public.ENV!='dev'){
//   console.log=function(){};
// }

</script>
<template>
  <NuxtLayout>
    <n-message-provider >
      <NuxtLoadingIndicator >
      </NuxtLoadingIndicator>
      <NuxtPage  />
    </n-message-provider>
  </NuxtLayout>
</template>

<style>

</style>
