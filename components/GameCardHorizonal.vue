<template>
  <div class="flex border-b-[1px] bg-[#1f254a] border-neutral-200 hover:shadow-lg p-4">
    <div class="relative overflow-hidden rounded-md w-[100px] sm:w-[176px]">
      <SfLink href="#">
        <img
            class="w-full h-auto border rounded-md border-neutral-200"
            :src="item.header_image"
            alt="Smartwatch Fitness Tracker"
            width="196"
            height="296"
        />
      </SfLink>
      <div class="absolute top-0 left-0 text-white bg-secondary-600  typography-text-xs font-medium">
        <SfIconSell size="xs" class="mr-1" />
        Sale
      </div>
    </div>
    <div class="flex flex-col pl-4 min-w-[180px] flex-1">
      <SfLink href="#" variant="secondary" class="no-underline typography-text-sm sm:typography-text-lg">
        {{ item.name }}
      </SfLink>
      <div class="my-2 sm:mb-0">
        <ul class="font-normal leading-5 typography-text-xs sm:typography-text-sm text-neutral-700">
          <li class="text-[#d4d4d8]">
            <span class="mr-1">Publisher:</span>
            <span class="font-medium">Rockstar</span>
          </li>

        </ul>
      </div>
      <div class="items-center sm:mt-auto sm:flex">
        <span class="font-bold sm:ml-auto sm:order-1 typography-text-sm sm:typography-text-lg">${{item.price}} </span>
        <div class="flex items-center justify-between mt-4 sm:mt-0">
          <QuantitySelector :item="item"/>
          <button
              aria-label="Remove"
              type="button"
              class="text-neutral-500 typography-text-xs font-light ml-auto flex items-center px-3 py-1.5"
              @click="useCart().removeFromCart(item)"
          >
            <SfIconDelete />
            <span class="hidden ml-1.5 sm:block"> Remove </span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import  { SfLink,SfIconSell,SfIconDelete } from '@storefront-ui/vue';
const {item} = defineProps({
  item: {
    type: Object,
    required: true,
  },
});
</script>
