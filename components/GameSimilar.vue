<template>
  <template
      v-for="game in products"
      :key="game.appid"
  >
    <LazyGameCardVertical :game="game"/>
  </template>
</template>

<script  setup>
import {
  SfLink,
  SfButton,
  SfIconFavorite,
  SfIconChevronLeft,
  SfIconChevronRight,
  SfScrollable,
} from '@storefront-ui/vue';
const {category,platform}= defineProps({
  category: {
    type: Array,
    default: [],
  },
  platform: {
    type: Array,
    default: [],
  },
});
const products=ref(null)
const config=useRuntimeConfig()
const {data}=await useAsyncData(`product_similar`+Math.random()*10000,
    ()=>
        $fetch(`/api/server/v1/game/gameSimilar`,{
          method: "GET",
          query:{
            category_ids:category.join(','),
            platform_ids:platform?.join(',')
          }
        })
)
if(data.value){
  products.value =data.value
}

</script>
<style scoped>
.truncate_similar {
  white-space: nowrap !important;
  overflow: hidden !important;
  text-overflow: ellipsis !important;
}
</style>