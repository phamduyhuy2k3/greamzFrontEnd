<template>
  <div class="grid xl:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 grid-cols-1 gap-6 pt-1 pb-[4rem]  ">
    <suspense>
      <LazyGameCardVertical v-for="game in pager.content"  :game="game" class="mt-3" :key="game.name"/>
      <template #fallback>
        <div class="flex justify-center items-center h-[50vh]">
          <n-spin size="large" />
        </div>
      </template>
    </suspense>
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