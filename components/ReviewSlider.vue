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
        v-for="review in data.content" :key="review.id"
        class="first:ms-auto last:me-auto border border-neutral-200 shrink-0 rounded-md hover:shadow-lg  "
    >
      <ReviewFromIndex  :review="review"/>
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
  SfButton,
  SfIconChevronLeft,
  SfIconChevronRight,
  SfScrollable,
} from '@storefront-ui/vue';


const config=useRuntimeConfig()
const {data}=await useAsyncData(`reviews`+Math.random()*10000,
    ()=>
        $fetch(`${config.public.apiUrl}/api/v1/review/findPage`,{
          method: "GET"
        })
)


</script>
<style scoped>
</style>