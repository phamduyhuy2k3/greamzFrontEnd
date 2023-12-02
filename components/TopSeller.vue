<template>
  <LazyGameCardVertical v-if="data" v-for="game in data" :game="game"/>
</template>

<script setup>
const date=new Date()
const config=useRuntimeConfig()
const {data}=await useAsyncData(`topSeller`,
    ()=>
        $fetch(`${config.public.apiUrl}/api/v1/dashboard/getTopSellingClient`,{
          method:'GET',
          query:{
            year:date.getFullYear(),
            month:date.getMonth()+1,
          }
        })
);
</script>

<style scoped>

</style>