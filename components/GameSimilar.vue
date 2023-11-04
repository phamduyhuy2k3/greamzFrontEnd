<template>
  <SfScrollable
      class="m-auto py-4 items-center w-full [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
      buttons-placement="floating"
      drag
  >
    <template #previousButton="defaultProps">
      <SfButton
          v-bind="defaultProps"
          class="absolute !rounded-full z-10 left-4 bg-[#1f254a] hidden md:block"
          :class="{ '!hidden': defaultProps.disabled }"
          variant="secondary"
          size="lg"
          square
      >
        <SfIconChevronLeft />
      </SfButton>
    </template>
    <div
        v-for="game in products"
        :key="game.appid"
        class="first:ms-auto last:me-auto border border-neutral-200 shrink-0 rounded-md hover:shadow-lg  "
    >
      <LazyGameCardVertical :game="game"/>
    </div>
    <template #nextButton="defaultProps">
      <SfButton
          v-bind="defaultProps"
          class="absolute !rounded-full z-10 right-4 bg-[#1f254a] block"
          :class="{ '!hidden': defaultProps.disabled }"
          variant="secondary"
          size="lg"
          square
      >
        <SfIconChevronRight />
      </SfButton>
    </template>
  </SfScrollable>
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
        $fetch(`${config.public.apiUrl}/api/v1/game/gameSimilar`,{
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