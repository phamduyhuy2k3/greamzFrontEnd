<template>
  <div class="mx-auto w-[80%] text-white">
    <BreadCrumb :breadcrumbs="breadcrumbs"></BreadCrumb>
    <div class="xl:grid  xl:grid-cols-12 rounded-[2px] p-4 gap-4 flex flex-col-reverse ">
      <div
          class="relative flex flex-col items-center justify-center w-full h-full aspect-[4/3] col-span-7 p-4 card bg-[#1f254a]">
        <h1 class="mb-1 font-bold text-[1.4rem] mr-auto">{{ gameDetail.name }}</h1>
        <SfScrollable v-if="gameDetail.movies && gameDetail.images"
                      class="w-full h-full snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
                      :active-index="activeIndex"
                      :prev-disabled="activeIndex === 0"
                      :next-disabled="activeIndex === gameDetail.movies.length+ gameDetail.images.length - 1"
                      buttons-placement="floating"
                      :drag="{ containerWidth: true }"
                      @on-drag-end="onDragged"
                      is-active-index-centered
                      @on-prev="
      ({ preventDefault }) => {
        preventDefault();
        activeIndex -= 1;
        if(videoEl) videoEl.pause();
      }
    "
                      @on-next="
      ({ preventDefault }) => {
        preventDefault();
        activeIndex += 1;
        if(videoEl) videoEl.pause();
      }
    "
        >
          <div
              v-for="(movie, index) in gameDetail.movies"
              :key="`${index}`"
              class="flex h-full basis-full shrink-0 grow snap-center"
          >
            <video @playing="onchaneVideo" alt="movie" autoplay loop playsinline controls muted
                   :aria-hidden="activeIndex !== index" class="w-auto h-full">
              <source v-if="movie.includes('.mp4')" :src="movie" type="video/mp4">
              <source v-if="movie.includes('.webm')" :src="movie" type="video/webm">
            </video>
          </div>
          <div
              v-for="(imageSrc, index) in gameDetail.images"
              :key="`${(gameDetail.movies.length-1)+ index}`"
              class="flex justify-center h-full basis-full shrink-0 grow snap-center"
          >
            <img alt="img" :aria-hidden="activeIndex !== (gameDetail.movies.length-1)+ index"
                 class="w-auto h-full" :src="imageSrc"/>
          </div>
        </SfScrollable>
        <SfScrollable
            class="items-center w-full [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
            :active-index="activeIndex"
            buttons-placement="none"
        >
          <template #previousButton="defaultProps">
            <SfButton
                v-bind="defaultProps"
                class="absolute disabled:hidden !rounded-full z-10 left-4 bg-white"
                variant="secondary"
                size="sm"
                square
            >
              <SfIconChevronLeft size="sm"/>
            </SfButton>
          </template>
          <button
              v-for="(movie, index) in gameDetail.movies"
              :key="`${index}-thumbnail`"
              type="button"
              :aria-current="activeIndex === index"
              :class="[
          'md:w-14 md:h-auto relative shrink-0 pb-1 my-4 -mr-2 border-b-4 snap-start cursor-pointer focus-visible:outline focus-visible:outline-offset transition-colors flex-grow md:flex-grow-0',
          activeIndex === index ? 'border-primary-700' : 'border-transparent',
        ]"
              @click="changeIndex(index)"
          >
            <video :src="movie" class="object-contain border border-neutral-200" width="78" height="78">

            </video>
          </button>
          <button
              v-for="(imageThumbSrc, index) in gameDetail.images"
              :key="`${(gameDetail.movies.length)+ index}-thumbnail`"
              type="button"
              :aria-current="activeIndex === (gameDetail.movies.length-1)+ index"
              :class="[
          'md:w-14 md:h-auto relative shrink-0 pb-1 my-4 -mr-2 border-b-4 snap-start cursor-pointer focus-visible:outline focus-visible:outline-offset transition-colors flex-grow md:flex-grow-0',
          activeIndex === (gameDetail.movies.length)+ index ? 'border-primary-700' : 'border-transparent',
        ]"
              @click="  changeIndex((gameDetail.movies.length)+ index)"
          >
            <img class="object-contain border border-neutral-200" width="78" height="78" :src="imageThumbSrc"/>
          </button>
          <template #nextButton="defaultProps">
            <SfButton
                v-bind="defaultProps"
                class="absolute disabled:hidden !rounded-full z-10 right-4 bg-white"
                variant="secondary"
                size="sm"
                square
            >
              <SfIconChevronRight size="sm"/>
            </SfButton>
          </template>
        </SfScrollable>
      </div>

      <section class="col-span-5  bg-[#1f254a] card">
        <div
            class="inline-flex items-center  text-sm font-medium text-white  py-1.5 px-3 mb-4 "
        >
          <SfIconSell size="sm" class="mr-1.5"/>
          Sale
        </div>
        <div class="flex flex-col justify-center p-3">
          <img :src="gameDetail.header_image">
          <p class="mt-4 mb-2 text-sm text-neutral-500">
            <span v-for="text in shortDescription.ops">
              {{ text.insert }}
            </span>
          </p>
          <strong class="block font-bold typography-headline-3">{{ gameDetail.price }}</strong>
          <div class="inline-flex items-center mt-4 mb-2">
            <SfRating size="xs" :value="3" :max="5"/>
            <SfCounter class="ml-1" size="xs">123</SfCounter>
            <SfLink href="#" variant="secondary" class="ml-2 text-xs text-neutral-500"> 123 reviews</SfLink>
          </div>
          <ul class="mb-4 font-normal typography-text-sm">
            <li>HD Pictures & Videos and FPV Function</li>

          </ul>
          <div class="py-4 mb-4 border-gray-200 border-y">
            <div
                class="bg-primary text-primary-700 flex justify-center gap-1.5 py-1.5 typography-text-sm items-center mb-4 rounded-md"
            >
              <SfIconShoppingCartCheckout/>
              <template v-if="gameDetail.stock>0 &&useCart().items.length>0 &&useCart().countItemIsInCart(gameDetail) > 0 ">
                {{ `${useCart().countItemIsInCart(gameDetail)} item in cart` }}
              </template>
              <template v-else-if="!gameDetail.stock || gameDetail.stock<0">
                Out of stock
              </template>


            </div>
            <div class="items-start xs:flex">
              <div class="flex flex-col items-stretch xs:items-center xs:inline-flex">
                <div class="flex border border-neutral-300 rounded-md">
                  <SfButton
                      variant="tertiary"
                      :disabled="count <= min"
                      square
                      class="rounded-r-none p-3"
                      :aria-controls="inputId"
                      aria-label="Decrease value"
                      @click="dec()"
                  >
                    <SfIconRemove/>
                  </SfButton>
                  <input
                      :id="inputId"
                      v-model="count"
                      type="number"
                      class="appearance-none mx-2 w-[50px] text-center bg-transparent font-medium [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-inner-spin-button]:display-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-outer-spin-button]:display-none [&::-webkit-outer-spin-button]:m-0 [-moz-appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none disabled:placeholder-disabled-900 focus-visible:outline focus-visible:outline-offset focus-visible:rounded-sm"
                      :min="min"
                      :max="max"
                      @input="handleOnChange"
                  />
                  <SfButton
                      variant="tertiary"
                      :disabled="count >= max"
                      square
                      class="rounded-l-none p-3"
                      :aria-controls="inputId"
                      aria-label="Increase value"
                      @click="inc()"
                  >
                    <SfIconAdd/>
                  </SfButton>
                </div>
                <p class="self-center mt-1 mb-4 text-xs text-neutral-500 xs:mb-0">
                  <strong class="text-neutral-900">{{ max }}</strong> in stock
                </p>
              </div>
              <SfButton @click="useCart().addToCart(gameDetail,count); count=1" size="lg" class="w-full xs:ml-4 bg-[#ff346d]">
                <template #prefix>
                  <SfIconShoppingCart size="sm"/>
                </template>
                Add to cart
              </SfButton>
            </div>

          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>

import {ref} from 'vue';
import {
  SfScrollable,
  SfButton,
  SfIconChevronLeft,
  SfIconChevronRight,
} from '@storefront-ui/vue';

definePageMeta({
  breadcrumb: "Game Detail",
  validate: (route) => {
    return /^\d+$/.test(route.params.gameId)
  }
})
const {breadcrumbs} = userBreadCrumb();
let gameDetail;
const aboutDescription = ref('')
const detailDescription = ref('')
const shortDescription = ref('')
const gameId = useRoute().params.gameId
const {data, pending, error} = await useFetch(`${useRuntimeConfig().public.apiUrl}/api/v1/game/${gameId}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${useAuthStore().token}`
      }
    })
if (!data?.value) {
  throw createError({
    statusCode: 404,
    message: 'Game not found',
    statusMessage: 'Game not found'
  })
} else {
  gameDetail = data.value
  aboutDescription.value = JSON.parse(gameDetail.about_the_game)
  detailDescription.value = JSON.parse(gameDetail.detailed_description)
  shortDescription.value = JSON.parse(gameDetail.short_description)
  console.log(shortDescription.value)
}

const videoEl = ref(null);
const {withBase} = useFile()
const activeIndex = ref(0);
const onDragged = (event) => {
  if (event.swipeRight && activeIndex.value > 0) {
    activeIndex.value -= 1;
  } else if (event.swipeLeft && activeIndex.value < gameDetail.movies.length + gameDetail.images.length - 2) {
    activeIndex.value += 1;
  }
};
const next = () => {
  if (activeIndex.value < gameDetail.movies.length + gameDetail.images.length - 1) {
    activeIndex.value += 1;
  } else {
    activeIndex.value = 0
  }
  if (videoEl) videoEl.pause();
};
const prev = () => {
  if (activeIndex.value > 0) {
    activeIndex.value -= 1;
  } else {
    activeIndex.value = gameDetail.movies.length + gameDetail.images.length - 1
  }
  if (videoEl) videoEl.pause();
};
const onchaneVideo = (event) => {
  videoEl.value = event.target
}
const changeIndex = (index) => {
  activeIndex.value = index;
  if (videoEl) videoEl.pause();
};
import {
  SfCounter,
  SfLink,
  SfRating,
  SfIconSell,
  SfIconShoppingCart,
  SfIconAdd,
  SfIconRemove,
  useId,
  SfIconShoppingCartCheckout,
} from '@storefront-ui/vue';
import {clamp} from '@storefront-ui/shared';
import {useCounter} from '@vueuse/core';

const inputId = useId();
const min = ref(1);
const max = ref(gameDetail.stock);
const {count, inc, dec, set} = useCounter(1, {min: min.value, max: max.value});

function handleOnChange(event) {
  const currentValue = (event.target)?.value;
  const nextValue = parseFloat(currentValue);
  set(clamp(nextValue, min.value, max.value));
}
</script>

<style scoped>

</style>