<script setup>
import {initFlowbite} from "flowbite";
import bs58 from "bs58";
import {
  Keypair
} from '@solana/web3.js';
const config=useRuntimeConfig();
const target = ref(null)
let secretKey = bs58.decode("41ipMM24uKkw4gf3ZZJ98zJCvMwPFFVAuWKiUynCT7JAj23xp1fuL5N4GkNqHNG8axu8FG7spF8ybYAEJQCAtdoQ");
console.log(`[${Keypair.fromSecretKey(secretKey).secretKey}]`);
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
