<template>
  <suspense>
    <GameCardVertical v-if="data" v-for="game in data" :game="game"/>
    <template #fallback>
      <GameCardSkeleton v-for="i in 16" :key="i"/>
    </template>
  </suspense>
</template>

<script setup>
const {data}=await useAsyncData(`specialOffer`,
    ()=>
        $fetch(`/api/server/v1/dashboard/specialOffer`,{
            method:'GET',

        })
);
</script>

<style scoped>

</style>