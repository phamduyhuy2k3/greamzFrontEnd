<script setup>
import {SfCounter, SfButton, SfRating, SfIconSell, SfIconAdd, SfIconRemove, useId,} from '@storefront-ui/vue';

import {clamp} from '@storefront-ui/shared';

definePageMeta({
  validate: (route) => {
    return /^\d+$/.test(route.params.gameId)
  }
})
const {addToCart} = useCart()
const {getAuthenticated}=useAuthStore()
const {getGameDetails} = useGameService()
let gameDetail;
const videoEl = ref(null);
const charLimit = 800;
const isCollapsed = ref(true);
const isButtonVisible = computed(() => {
  const textAbout = detailDescription.value.ops.map((text) => text.insert).join('')
  return textAbout.length > charLimit;
})
const isTextNull = computed(() => {
  const textAbout = detailDescription.value.ops.map((text) => text.insert).join('')
  return textAbout.length < 2;
})

const aboutDescription = ref()
const detailDescription = ref()
const shortDescription = ref()
const gameId = parseInt(useRoute().params.gameId)
const gameDetailToAdd = ref(null)
const plafomIds = ref([])
const categoryIds = ref([])
await getGameDetails(gameId).then((data) => {
  if (!data) {
    throw createError({
      statusCode: 404,
      message: 'Game not found',
      statusMessage: 'Game not found'
    })
    return
  }
  gameDetail = toReactive(data)
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
})
const setGameToAdd = (platform) => {
  gameDetailToAdd.value = {
    appid: gameDetail.appid,
    name: gameDetail.name,
    price: gameDetail.price,
    discount: gameDetail.discount,
    header_image: gameDetail.header_image,
    platform: platform,
  }
  max.value = gameDetailToAdd.value.platform.stock
  count.value = 1
}
const truncatedContent = computed(() => {
  const textAbout = detailDescription.value.ops.map((text) => text.insert).join('')
  return isButtonVisible.value && isCollapsed.value ?
      `${textAbout.substring(0, charLimit)}...`
      : textAbout
});

const inputId = useId();
const min = ref(1);
const max = ref(gameDetailToAdd.stock);
const {count, inc, dec, set} = useCounter(1, {min: min.value, max: max.value});

function handleOnChange(event) {
  const currentValue = (event.target)?.value;
  const nextValue = parseFloat(currentValue);
  set(clamp(nextValue, min.value, max.value));
}
async function AddToCart() {
  if(!getAuthenticated){
    navigateTo({
      path:'/login',
      query:{
        message:'Please login to add to cart',
        alert:'info'
      }
    })
    return
  }
  await addToCart(gameDetailToAdd.value, count.value)
  count.value = 1
}

useSeoMeta({
  title: gameDetail.name,
  ogTitle: gameDetail.name,
  description: gameDetail.short_description,
  ogDescription: gameDetail.short_description,
  ogImage: gameDetail.header_image,
  twitterCard: 'summary_large_image',
})
const onchangeVideo = (event) => {
  videoEl.value = event.target
}
const changeIndex = (current,last) => {
  if (videoEl.value) videoEl.value.pause();

};
</script>
<template>
  <div class="mx-auto text-white">
    <div
        class="flex flex-col-reverse xl:grid md:grid xl:grid-cols-12 md:grid-cols-12 min-h-[380px] bg-[#F1E9DA] shadow-lime-50 bg-opacity-20 rounded">
      <suspense>

        <template #fallback>
          <div class="xl:col-span-7 md:col-span-6 flex items-center justify-center">
            <n-spin size="large" class="text-white"/>
          </div>
        </template>
        <div class="xl:col-span-7 md:col-span-7 p-2">
          <n-carousel :show-dots="true"
                      :show-arrow="true"
                      class="max-h-[650px]"
                      @update:current-index="changeIndex"
          >
            <template v-if="gameDetail.movies&&gameDetail.movies.length>0">
              <template
                  v-for="(movie, index) in gameDetail.movies"
                  :key="`${index}`"

              >
                <video autoplay muted controls  class="w-full h-auto" :src="movie" @playing="onchangeVideo">
                  <source v-if="movie.includes('.mp4')" :src="movie" type="video/mp4">
                  <source v-if="movie.includes('.webm')" :src="movie" type="video/webm">
                </video>


              </template>
              <template
                  v-for="(imageSrc, index) in gameDetail.images"
                  :key="`${(gameDetail.movies.length-1)+ index}`"

              >
                <img alt="img"
                     class="carousel-img" :src="imageSrc"/>
              </template>
            </template>
            <template v-else>
              <template
                  v-for="(imageSrc, index) in gameDetail.images"
                  :key="`${(gameDetail.movies.length-1)+ index}`"

              >
                <img alt="img"
                     class="carousel-img" :src="imageSrc"/>
              </template>
            </template>
            <template #dots="{ total, currentIndex, to }">
              <ul class="custom-dots">
                <template v-if="gameDetail.movies&&gameDetail.movies.length>0">
                  <li
                      v-for="(movie, index) in gameDetail.movies"
                      :key="`${index}`"
                      :class="{ ['is-active']: currentIndex === index  }"
                      @click="to(index )"

                  >
                    <video class="" :src="movie" >
                    </video>
                  </li>
                  <li
                      v-for="(imageSrc, index) in gameDetail.images"
                      :key="`${(gameDetail.movies.length-1)+ index}`"
                      @click="to(index + gameDetail.movies.length )"
                      :class="{ ['is-active']: currentIndex === index+ gameDetail.movies.length  }"
                  >
                    <img alt="img"
                         class="" :src="imageSrc"/>
                  </li>
                </template>
                <template v-else>
                  <li
                      v-for="(imageSrc, index) in gameDetail.images"
                      :key="imageSrc"
                      @click="to(index )" :class="{ ['is-active']: currentIndex === index  }"
                  >
                    <img alt="img"
                         class="" :src="imageSrc"/>
                  </li>
                </template>

              </ul>

            </template>
          </n-carousel>
        </div>


      </suspense>
      <n-card header-extra-class="" header-class="justify-between"
              class="xl:col-span-5 md:col-span-5 bg-transparent rounded w-full p-1" :bordered="false">
        <template #header>
          <div class="flex flex-col">
            <div class="relative">
              <img class="w-full h-full" :alt="gameDetail.name" :src="gameDetail.header_image"
                   style="border-radius: 6px 3px;">
              <div v-if="gameDetail.discount&& gameDetail.discount>0"
                   class="absolute top-0 left-0 discount  border-transparent ">
                <SfIconSell size="xs" class="mr-1"/>
                -{{ gameDetail.discount }}%
              </div>
            </div>
            <div class="">
              <h1 class="text-start text-2xl  font-extrabold text-white" v-text="gameDetail.name"></h1>
              <div class="flex items-center justify-start">
                <SfRating :max="5"  :value="gameDetail.averageRating||0" class="mr-2 text-[#ffff00]"/>
                <SfCounter class="ml-1" size="xs">{{gameDetail.totalReviewed}}</SfCounter>
                <NuxtLink to="#review" variant="secondary" class="ml-2 text-xs text-neutral-500"> {{gameDetail.totalReviewed}} reviews</NuxtLink>              </div>
            </div>
          </div>
        </template>
        <div class="flex flex-col items-start justify-between text-white font-bold">

          <div class="flex items-center">
            <div v-if="gameDetail.discount&&gameDetail.discount>0">
              <span class="text-sm line-through mr-2">{{ formatCurrency(gameDetail.price) }}</span>
              <span
                  class="text-xl font-light text-[#FF0000]">{{ formatCurrency(gameDetail.price * (100 - gameDetail.discount) / 100) }}
              </span>
            </div>
            <div v-else>
              <span class="text-xl">{{ formatCurrency(gameDetail.price) }}</span>
            </div>
          </div>

        </div>
        <template #footer>
          <div class="flex flex-col">
            <div class="grid grid-cols-12">
              <div class="col-span-3 ">
                <span class="text-[#757575] font-normal">
                  Category
                </span>
              </div>
              <div class="col-span-9">
                <n-button v-for="cate in gameDetail.categories" :key="cate.id" tertiary type="info">
                  {{ cate.name }}
                </n-button>
              </div>
            </div>
          </div>
        </template>

        <template #action>
          <div class="w-full p-2 flex flex-col items-center justify-center gap-3">
            <div class="grid grid-cols-12">
              <div class="col-span-3">
                 <span class="text-[#757575] font-normal">
                  Platform
                </span>

              </div>
              <div class="col-span-9">
                <div class="flex flex-wrap">
                  <button type="button" class="text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800"
                          v-for="pl in gameDetail.platforms" @click="setGameToAdd(pl)"
                          :class="{'bg-gray-900 text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-gray-600 dark:text-gray-400  dark:bg-gray-600 ':gameDetailToAdd.platform.id===pl.id}"
                  >
                    {{ pl.name }}
                  </button>
                </div>
              </div>
            </div>

            <div class="flex justify-start items-center gap-2">
              <div class="mr-3 text-[#757575] font-normal">Quantity</div>
              <div class="flex border border-[#d1d5db] rounded-md">
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
              <div class="text-[#757575] font-normal">
                {{ gameDetailToAdd.platform.stock }} pieces available
              </div>
            </div>
            <button class="w-[85%] mx-auto h-[55px] bg-[#ff346d] rounded hover:bg-red-200" @click="AddToCart">
              Add to cart
            </button>
          </div>

        </template>
      </n-card>

    </div>
    <n-divider  >
      <div class="text-2xl font-bold text-white">Reviews</div>
    </n-divider>
    <div class="bg-[#F1E9DA] shadow-lime-50 bg-opacity-20 p-4 rounded" >

      <LazyReview  :appid="gameId"/>
    </div>
    <n-divider  >
      <div class="text-2xl font-bold text-white">Related product</div>
    </n-divider>
    <div class="bg-[#F1E9DA] shadow-lime-50 bg-opacity-20 rounded p-4 grid xl:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4 content-center justify-items-center place-content-center">

      <GameSimilar :platform="plafomIds" :category="categoryIds"/>

    </div>
  </div>
</template>


<style scoped>
.custom-dots {
  @apply align-middle justify-center items-center;
  display: flex;
  margin: 0;
  padding: 0;
  position: absolute;
  bottom: -15px;
  left: 0;
  right: 0;

}

.custom-dots li {
  display: inline-block;
  opacity: 80%;
  width: 60px;
  height: 40px;
  margin: 0 3px;
  padding: 2px;
  border-radius: 4px;
  background-color: rgba(255, 255, 255, 0.4);
  transition: width 0.3s, background-color 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
}

.carousel-img {
  width: 100%;
  height: 91%;
  object-fit: cover;
}

.custom-dots li.is-active {
  width: 80px;
  height: 60px;
  background: #fff;
  opacity: 100%;

}
</style>