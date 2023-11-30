<template>
  <LazyGameCardVertical v-if="data" v-for="game in data" :game="game"/>
</template>

<script setup>
const config=useRuntimeConfig()
const {data}=await useAsyncData(`topSeller`,
    ()=>
        $fetch(`${config.public.apiUrl}/api/v1/dashboard/getTopSellingClient`,{
          method:'GET',
          query:{
            year: 2023,
            month: 11,
          }
        })
);
</script>

<style scoped>

</style>