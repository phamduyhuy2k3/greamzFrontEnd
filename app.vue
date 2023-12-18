<script setup>
import {initFlowbite} from "flowbite";

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
  window.addEventListener('resize', handleResize);

})
useState('isMobile',()=>window.innerWidth<1025);
// if(config.public.ENV=='production'){
//   console.log=function(){};
// }
const handleResize=()=> {
  const result= useState('isMobile');
  result.value=window.innerWidth<1025;
  console.log(result.value);
}
</script>
<template>
  <NuxtLayout>
    <NuxtLoadingIndicator >
    </NuxtLoadingIndicator>
    <n-message-provider >
      <NuxtPage ref="page" />
    </n-message-provider>
  </NuxtLayout>
</template>

<style>

</style>
