<template>
  <div class="flex flex-col md:flex-row bg-[#1f254a] hover:shadow-lg p-0 p-4" :class="{'opacity-50': item.outOfStock}">
    <div class="relative overflow-hidden rounded-md w-full xl:w-[250px]" >
      <SfLink :tag="NuxtLink" :to="'game/appid/'+item.game.appid" >
        <img
            class="w-full h-[190px] xl:h-[120px]  rounded-md "
            :src="item.game.header_image"
            :alt="item.game.name+'_'+item.platform.name"


        />
      </SfLink>
      <div v-if="item.game.discount&& item.game.discount>0" class="absolute bottom-0 left-0 discount  border-transparent ">
        <SfIconSell size="xs" class="mr-1" />
        -{{ item.game.discount }}%
      </div>
    </div>
    <div class="flex flex-col pl-4 min-w-[180px] flex-1">
      <div>
        <SfLink :tag="NuxtLink" :to="'/game/appid/'+item.game.appid"  variant="secondary" class="no-underline text-lg typography-text-sm sm:typography-text-lg">
          {{ item.game.name }}
        </SfLink>
        <div class="my-2 sm:mb-0">
          <ul class="font-normal leading-5 typography-text-xs sm:typography-text-sm text-neutral-700">
            <li class="text-[#d4d4d8]">
              <span class="mr-1">Platform:</span>
              <span class="font-medium">{{item.platform.name}}</span>
            </li>

          </ul>
        </div>
      </div>
      <div class="items-center sm:mt-auto sm:flex">
        <span class="font-bold sm:ml-auto sm:order-1 typography-text-sm sm:typography-text-lg">{{$currency(item.game.price)}} </span>
        <div class="flex items-center justify-end xl:justify-between mt-4 sm:mt-0">
          <QuantitySelector v-if="!item.outOfStock" :item="item" :is-disabled="false"/>
          <button
              aria-label="Remove"
              type="button"
              class="text-neutral-500 typography-text-xs font-light ml-auto flex items-center px-3 py-1.5"
              @click="useCart().removeFromCart(item)"
          >
            <SfIconDelete />
            <span v-if="!item.outOfStock" class="hidden ml-1.5 sm:block"> Remove </span>
            <span v-else class="hidden ml-1.5 sm:block"> Out of stock! </span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import  { SfLink,SfIconSell,SfIconDelete } from '@storefront-ui/vue';
const NuxtLink = resolveComponent("NuxtLink");
const {item} = defineProps({
  item: {
    type: Object,
    required: true,
  },
});
console.log(item)
</script>
