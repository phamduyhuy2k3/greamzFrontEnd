<template>
  <NuxtLink :to="`/${item.appid}`" class="flex flex-col bg-[#1f254a] hover:shadow-lg p-4 pt-2">
    <div class="relative overflow-hidden rounded-md w-full ">
      <SfLink href="#">
        <img
            class="w-full h-[90px]  rounded-md "
            :src="item.header_image"
            alt="Smartwatch Fitness Tracker"
        />
      </SfLink>
      <div v-if="item.discount>0" class="absolute top-0 left-0 discount  border-transparent ">
        <SfIconSell size="xs" class="mr-1" />
        -{{ item.discount }}%
      </div>

    </div>
    <div class="flex justify-between items-center">
      <div>
        {{item.name}}
      </div>
      <span class="font-bold sm:order-1 typography-text-sm sm:typography-text-lg">{{$currency(item.price)}} </span>
    </div>
  </NuxtLink>
</template>

<script lang="ts" setup>
import  { SfLink,SfIconSell } from '@storefront-ui/vue';
const NuxtLink = resolveComponent("NuxtLink");
const {item} = defineProps({
  item: {
    type: Object,
    required: true,
  },
});
</script>

<style scoped>

</style>