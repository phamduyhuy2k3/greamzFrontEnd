<template>

  <NuxtLayout>
    <NuxtLoadingIndicator >

    </NuxtLoadingIndicator>
    <n-message-provider >
      <NuxtPage ref="page" />
    </n-message-provider>
  </NuxtLayout>
</template>
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
    },
    script:{
      src:"https://www.googletagmanager.com/gtag/js?id=G-SZELXWHR5V",


    }
  };
});
onMounted(async () => {
  initFlowbite();
  window.addEventListener('resize', handleResize);
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-SZELXWHR5V');
})

useState('isMobile',()=>window.innerWidth<1025);
const handleResize=()=> {
  const result= useState('isMobile');
  result.value=window.innerWidth<1025;
  console.log(result.value);
}


</script>
<style>

</style>
