<template>
  <div class="rounded-md hover:shadow-lg max-w-[400px] " style="">
    <div class="relative">
      <NuxtLink :to="'/game/appid/'+game.appid" class="">
        <img
            :src="game.header_image"
            alt="Great product"
            class="rounded-md w-auto h-auto"
        />
      </NuxtLink>
      <div v-if="game.discount" class="absolute bottom-0 left-0 discount  border-transparent ">
        <SfIconSell size="xs" class="mr-1"/>
        -{{ game.discount }}%

      </div>
<!--      <div class="absolute top-0 left-0 w-full h-full bg-[#1f254a] opacity-0 hover:opacity-100 transition-all duration-500">-->
<!--        <div class="flex flex-col items-center justify-center h-full">-->
<!--          <button-->
<!--              aria-label="Add to cart"-->
<!--              type="button"-->
<!--              class="text-neutral-500 typography-text-xs font-light bg-[#bfdbfe] rounded-md  flex items-center px-3 py-1.5"-->
<!--              @click="useCart().addToCart(game,1)"-->
<!--          >-->
<!--            <SfIconShoppingCart />-->
<!--            <span class="hidden ml-1.5 sm:block"> Add to cart </span>-->
<!--          </button>-->
<!--          <NuxtLink :to="'/'+game.appid" class="text-neutral-500 typography-text-xs font-light bg-[#bfdbfe] rounded-md  flex items-center px-3 py-1.5 mt-2">-->
<!--            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" d="M12 9a3 3 0 0 0-3 3a3 3 0 0 0 3 3a3 3 0 0 0 3-3a3 3 0 0 0-3-3m0 8a5 5 0 0 1-5-5a5 5 0 0 1 5-5a5 5 0 0 1 5 5a5 5 0 0 1-5 5m0-12.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5Z"/></svg>-->
<!--            <span class="hidden ml-1.5 sm:block"> View details </span>-->
<!--          </NuxtLink>-->
<!--        </div>-->
<!--      </div>-->


      <div class="flex flex-col  text-white">
        <div class="text-[1.2rem]  text-center  ">
          {{ game.name }}
        </div>
        <div class="text-[1.2rem] text-center">
          {{ $currency(game.price) }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {SfIconSell, SfIconShoppingCart} from "@storefront-ui/vue";

defineProps({
  game: {
    type: Object,
    required: true
  }
})
</script>
<style>

</style>