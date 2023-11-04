<template>
  <div class="grid xl:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 grid-cols-1 gap-6 pt-1 pb-[4rem]  ">
    <LazyGameCardVertical v-for="game in pager.content"  :game="game" class="mt-3" :key="game.appid"/>
  </div>


</template>
<script setup>

const {pager} = defineProps({
  pager:{
    type: Object,
    required: true
  }
})

</script>
<style scoped>

</style>