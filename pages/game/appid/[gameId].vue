<script setup>
import {computed, ref} from 'vue';
import {SfScrollable, SfButton, SfIconChevronLeft, SfIconChevronRight,} from '@storefront-ui/vue';
import {SfCounter, SfLink, SfRating, SfIconSell, SfIconAdd, SfIconRemove, useId,} from '@storefront-ui/vue';
import {clamp} from '@storefront-ui/shared';
import {useCounter} from '@vueuse/core';
definePageMeta({
  breadcrumb: "Game Detail",
  validate: (route) => {
    return /^\d+$/.test(route.params.gameId)
  }
})
const {breadcrumbs} = userBreadCrumb();
const {isOutOfStock,addToCart,countItemIsInCartByPlatFormId}=useCart()
let gameDetail;
const charLimit = 800;
const isCollapsed = ref(true);
const isButtonVisible = computed(() =>{
  const textAbout=detailDescription.value.ops.map((text) => text.insert).join('')
  return  textAbout.length > charLimit;
})
const isTextNull = computed(() =>{
  const textAbout=detailDescription.value.ops.map((text) => text.insert).join('')
  return  textAbout.length <2;
})
const plafomIds = ref(null)
const categoryIds = ref(null)
const aboutDescription = ref('')
const detailDescription = ref('')
const shortDescription = ref('')
const gameId = useRoute().params.gameId
const gameDetailToAdd = ref(null)
const {data, pending, error} = await useAsyncData('gameDetail',
    () =>
        $fetch(`${useRuntimeConfig().public.apiUrl}/api/v1/game/detail/${gameId}`,
            {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json'
              }
            })
)
if (!data?.value) {
  throw createError({
    statusCode: 404,
    message: 'Game not found',
    statusMessage: 'Game not found'
  })
} else {
  gameDetail = toReactive(data.value)
  gameDetailToAdd.value = {
    appid: gameDetail.appid,
    name: gameDetail.name,
    price: gameDetail.price,
    discount: gameDetail.discount,
    header_image: gameDetail.header_image,
    platform: gameDetail.platforms[0],
  }
  aboutDescription.value = JSON.parse(gameDetail.about_the_game)
  detailDescription.value = JSON.parse(gameDetail.detailed_description)
  shortDescription.value = JSON.parse(gameDetail.short_description)
  plafomIds.value=gameDetail.platforms.map((pl)=>pl.id)
  categoryIds.value=gameDetail.categories.map((cate)=>cate.id)

}
const truncatedContent = computed(() =>{
  const textAbout=detailDescription.value.ops.map((text) => text.insert).join('')
  return  isButtonVisible.value && isCollapsed.value ?
      `${textAbout.substring(0, charLimit)}...`
      : textAbout
});
const videoEl = ref(null);
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
const onchangeVideo = (event) => {
  videoEl.value = event.target
}
const changeIndex = (index) => {
  activeIndex.value = index;
  if (videoEl) videoEl.pause();
};


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
<template>
  <div class="mx-auto w-[80%] text-white">

    <div class="xl:grid  xl:grid-cols-12 rounded-[2px]  gap-4 flex flex-col-reverse ">
      <div
          class="relative flex flex-col items-center justify-center w-full h-full  col-span-7 p-3 card bg-[#1f254a]">
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
            <video @playing="onchangeVideo" alt="movie" autoplay loop playsinline controls muted
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

        <div class="flex flex-col justify-center p-3 ">
          <div class="relative">
            <div
                class="inline-flex items-center text-sm font-medium text-white top-0 left-0 discount py-1.5 px-3 mb-4 "
                v-if="gameDetail.discount>0"
            >
              <SfIconSell size="sm" class="mr-1.5"/>
              -{{ gameDetail.discount }}%
            </div>
            <img :src="gameDetail.header_image">
          </div>


          <p class="mt-4 mb-2 text-sm text-neutral-500">
            <span v-for="text in shortDescription.ops">
              {{ text.insert }}
            </span>
          </p>

          <div class="inline-flex items-center mt-4 mb-2">
            <SfRating size="xs" :value="gameDetail.averageRating" :max="5"/>
            <SfCounter class="ml-1" size="xs">{{gameDetail.totalReviewed}}</SfCounter>
            <SfLink href="#review" variant="secondary" class="ml-2 text-xs text-neutral-500"> {{gameDetail.totalReviewed}} reviews</SfLink>
          </div>
          <ul class="mb-4 font-normal typography-text-sm flex flex-wrap">
            <li >
              <fieldset>
                <legend>
                  Categories:
                </legend>
                <NuxtLink v-for="cate in gameDetail.categories"
                          :to="'/search?categories='+cate.id" class="bg-blue-100 hover:bg-blue-200 text-blue-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-blue-400 border border-blue-400 inline-flex items-center justify-center">
                  {{ cate.name }}
                </NuxtLink>
              </fieldset>
            </li>
          </ul>
          <div class="mr-auto">
            <div class="flex justify-between items-center gap-8" v-if="gameDetail.discount>0">
              <strong class="text-[1.5rem]">Sale: </strong>
              <strong class="block font-bold typography-headline-3">-{{ gameDetail.discount }}%</strong>
            </div>
            <div class="flex justify-between items-center gap-8">
              <strong class="text-[1.5rem]">Price: </strong>
              <strong class="block font-bold typography-headline-3">{{ $currency(gameDetail.price) }}</strong>
            </div>
          </div>

          <div class="py-4 mb-4 border-gray-200 border-y">

           <fieldset >
             <legend>
                Platforms:
             </legend>
             <div class="flex flex-wrap gap-3">

               <template v-for="pl in gameDetail.platforms">
                 <button type="button"
                         v-if="gameDetailToAdd.platform.name===pl.name "
                         @click="gameDetailToAdd.platform=pl; max=pl.stock; count=1"
                         class="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                   {{pl.name}} | stock: {{pl.stock}}
                 </button>

                 <button v-else type="button"
                         @click="gameDetailToAdd.platform=pl; max=pl.stock; count=1"
                         class="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
                   {{pl.name}} | stock: {{pl.stock}}
                 </button>
               </template>
             </div>
           </fieldset>

            <div
                v-if="!gameDetail.platforms || gameDetail.platforms.length<1 || isOutOfStock(gameDetailToAdd)"
                class="bg-primary text-primary-700 flex justify-center gap-1.5 py-1.5 typography-text-sm items-center mb-4 rounded-md"
            >
              Out of stock
            </div>
            <div class="items-start xs:flex" v-else>
              <div class="inline-flex flex-col items-center">
                <div class="flex border border-gray-200 rounded-md">
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

              </div>
              <SfButton @click="addToCart(gameDetailToAdd,count); count=1" size="lg" class="w-full xs:ml-4 bg-[#ff346d]">
                <template #prefix>
                  <svg class="w-5 h-5 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 20">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5h4m-2 2V3M6 15a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm0 0h8m-8 0-1-4m9 4a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm.938-11H17l-2 7H5m0 0L3 4m0 0h2M3 4l-.792-3H1"/>
                  </svg>
                </template>
                Add to cart
              </SfButton>
            </div>

          </div>
        </div>
      </section>
    </div>
    <div class="card bg-[#1f254a] w-full col-span-12 p-4 mt-2">
      <div>
        <h2 class="text-white font-bold text-[1.3rem]">About this game</h2>
      </div>
    
      <div class="pb-2 text-sm text-[#657cb1]">{{ isTextNull? 'Updating':truncatedContent }}</div>
      <button
          v-if="isButtonVisible"
          type="button"
          class="inline-block mb-2 text-sm font-normal border-b-2 border-black cursor-pointer w-fit hover:text-primary-700 hover:border-primary-800"
          @click="isCollapsed = !isCollapsed"
      >
        {{ isCollapsed ? 'Read more' : 'Read less' }}
      </button>
    </div>
    <div class="card bg-[#1f254a] w-full col-span-12 p-4 mt-2">
      <div>
        <h2 class="text-white font-bold text-[1.3rem]">Similar game</h2>
      </div>
      <LazyGameSimilar :platform="plafomIds" :category="categoryIds"/>
    </div>
    <div class="card bg-[#1f254a] w-full col-span-12 p-4 mt-2">
      <div>
        <h2 class="text-white font-bold text-[1.3rem]">Reviews</h2>
      </div>
      <LazyReview  :appid="gameId"/>
    </div>
  </div>
</template>



<style scoped>

</style>