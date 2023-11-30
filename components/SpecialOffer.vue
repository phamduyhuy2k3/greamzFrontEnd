<template>
  <LazyGameCardVertical v-if="data" v-for="game in data" :game="game"/>
</template>

<script setup>
const config=useRuntimeConfig()
const {data}=await useAsyncData(`specialOffer`,
    ()=>
        $fetch(`${config.public.apiUrl}/api/v1/dashboard/specialOffer`,{
            method:'GET'

        })
);
</script>

<style scoped>

</style>