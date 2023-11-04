<template>
  <n-table :single-line="false"
           class="w-full text-sm text-gray-500 dark:text-gray-400 text-center items-center relative">

    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
    <tr>
      <th scope="col" class="">
      </th>
      <th scope="col" class="px-6 py-3">
        Game name
      </th>
      <th scope="col" class="px-6 py-3">
        Platform
      </th>
      <th scope="col" class="px-6 py-3">
        Price
      </th>
      <th scope="col" class="px-6 py-3">
        Discount
      </th>
      <th scope="col" class="px-6 py-3">
        Quantity
      </th>
      <th scope="col" class="px-6 py-3">
        Review
      </th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="order in orderData" :key="order.id"
        class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
      <td class="flex items-center justify-center">
        <img class="w-20 h-10" :src="order.game.header_image" :alt="`orderDetail_${order.id}`">
      </td>
      <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
        {{ order.game.name }}
      </th>
      <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
        {{ order.platform.name }}
      </th>
      <td class="px-6 py-4">
        {{ $currency(order.price) }}
      </td>
      <td class="px-6 py-4">
        {{ order.game.discount > 0 ? order.game.discount + '%' : 'None' }}
      </td>
      <td class="px-6 py-4">
        {{ order.quantity }}
      </td>
      <td v-if="orderCurrent.ordersStatus==='SUCCESS'" class="px-6 py-4">
        <div class="flex items-center justify-center">
          <button
              v-if="!order.review"
              class="btn btn-active btn-link"
              type="primary"
              @click="handleToggleModalOrderDetail(order)"
          >
            Review this product
          </button>
          <template v-else>
            <SfRating :value="order.review.rating"  class="p-1 gap-x-2 text-[#fde047]" />
            <button
                class="btn btn-active btn-link"
                type="primary"
                @click="handleToggleModalOrderDetail(order)"
            >
              See your reviewed
            </button>
          </template>
        </div>

      </td>

    </tr>
    </tbody>
  </n-table>
  <n-modal
      v-model:show="showModal"
      class="custom-card"
      preset="card"
      :style="bodyStyle"
      title="Review"
      :bordered="false"
      size="huge"
      :segmented="segmented"
  >
    <div v-if="showModal&&!gameForReview.review" class="max-w-[376px] md:max-w-[768px]">
      <h3 class="font-bold py-2 pl-4 pr-3 typography-headline-4">Leave a review</h3>
      <div
          class="grid grid-cols-[100px_1fr] py-2 px-2 gap-4 md:grid-cols-[176px_1fr] grid-rows-[100px_1fr] md:grid-rows-[28px_1fr] items-center md:items-start"

      >
        <img
            :src="gameForReview.game.header_image"
            alt="Smartwatch"
            width="100"
            height="100"
            class="mx-auto border border-neutral-200 rounded-md aspect-square w-[100px] md:w-[176px]"
        />
        <p class="text-left font-bold text-neutral-900 text-lg">{{ gameForReview.game.name }}</p>
        <div class="col-span-2 md:col-start-2">
          <div class="flex items-center justify-start gap-3">
            <p :id="ratingLabelId" class="typography-label-sm font-bold text-neutral-900">Platform:</p>
            <p class="typography-label-sm font-bold text-neutral-900">{{ gameForReview.platform.name }}</p>
          </div>
          <div class="flex items-center justify-start gap-3">
            <p :id="ratingLabelId" class="typography-label-sm font-bold text-neutral-900">Your rating:</p>
            <SfRatingButton v-model="reviewForm.rating" :aria-labelledby="ratingLabelId"
                            class="p-1 gap-x-2 text-[#fde047]"/>
          </div>
          <label class="my-4 block">
            <span class="block typography-label-sm font-medium mb-0.5 text-neutral-900">Product review (optional)</span>
            <textarea
                v-model="reviewForm.text"
                placeholder="Describe your experience eg. Great product! The quality exceeded my expectations, and it's incredibly versatile. I highly recommend it to anyone looking for a reliable and durable solution."
                class="block w-full py-2 pl-4 pr-3 min-h-[138px] rounded-md ring-1 ring-neutral-300 placeholder:text-neutral-500"
            />
            <span
                :class="[
              'block text-xs mt-0.5 text-right',
              reviewIsAboveLimit ? 'text-negative-700 font-medium' : 'text-neutral-500',
            ]"
            >
            {{ reviewCharsCount }}
          </span>
          </label>


        </div>
      </div>
    </div>
    <div v-if="showModal&&gameForReview.review" class="max-w-[376px] md:max-w-[768px]">
<!--      <h3 class="font-bold py-2 pl-4 pr-3 typography-headline-4">Leave a review</h3>-->
      <div
          class="grid grid-cols-[100px_1fr] py-2 px-2 gap-4 md:grid-cols-[176px_1fr] grid-rows-[100px_1fr] md:grid-rows-[28px_1fr] items-center md:items-start"

      >
        <img
            :src="gameForReview.game.header_image"
            alt="Smartwatch"
            width="100"
            height="100"
            class="mx-auto border border-neutral-200 rounded-md aspect-square w-[100px] md:w-[176px]"
        />
        <p class="text-left font-bold text-neutral-900 text-lg">{{ gameForReview.game.name }}</p>
        <div class="col-span-2 md:col-start-2">
          <div class="flex items-center justify-start gap-3">
            <p  class="typography-label-sm font-bold text-neutral-900">Platform:</p>
            <p class="typography-label-sm font-bold text-neutral-900">{{ gameForReview.platform.name }}</p>
          </div>
          <div class="flex items-center justify-start gap-3">
            <p  class="typography-label-sm font-bold text-neutral-900">Your rating:</p>
            <SfRating :value="gameForReview.review.rating"
                            class="p-1 gap-x-2 text-[#fde047]"/>
          </div>
          <label class="my-4 block">
            <span class="block typography-label-sm font-medium mb-0.5 text-neutral-900">Product review </span>
            <p
                class="block w-full py-2 pl-4 pr-3 min-h-[138px] rounded-md ring-1 ring-neutral-300 placeholder:text-neutral-500"
            >
              {{gameForReview.review.text}}
            </p>
<!--            <span-->
<!--                :class="[-->
<!--              'block text-xs mt-0.5 text-right',-->
<!--              reviewIsAboveLimit ? 'text-negative-700 font-medium' : 'text-neutral-500',-->
<!--            ]"-->
<!--            >-->
<!--            {{ reviewCharsCount }}-->
<!--          </span>-->
          </label>


        </div>
      </div>
    </div>
    <template #footer >
      <div v-if="!gameForReview.review" class="flex justify-end gap-x-4">
        <SfButton variant="secondary" class="flex-1 md:flex-initial" @click="handleCancelReview()">Cancel</SfButton>
        <button v-if="!loading" type="button" @click="submitForm()" class="btn btn-info">Submit Review</button>
        <button v-else disabled type="button" class="btn btn-info">
          <n-spin size="large"/>
        </button>

      </div>
    </template>
  </n-modal>
</template>

<script setup>
import {SfButton, SfRatingButton, SfRating, useId} from '@storefront-ui/vue';
import {useMessage} from 'naive-ui'

const message = useMessage()
const {orderData} = defineProps({
  orderData: {
    type: Object,
    required: true
  },
  orderCurrent: {
    type: Object,
    required: true
  }
})
console.log(orderData)
const gameForReview = ref(null)
const showModal = ref(false)
const loading = ref(false)
const reviewForm = ref({
  rating: null,
  text: '',
  appid: null,
  orderDetailId: null,
})
const handleToggleModalOrderDetail = (order) => {
  console.log(order)
  gameForReview.value = order
  reviewForm.value.appid = order.game.appid
  reviewForm.value.orderDetailId = order.id
  reviewForm.value = {
    ...reviewForm.value,
    rating: null,
    text: '',

  }
  showModal.value = true
}
const handleCancelReview = () => {
  showModal.value = false;
  // gameForReview.value = null;


}
const ratingLabelId = useId();
const reviewCharacterLimit = ref(600);
const reviewIsAboveLimit = computed(() => reviewForm.value.text.length > reviewCharacterLimit.value);
const reviewCharsCount = computed(() => reviewCharacterLimit.value - reviewForm.value.text.length);

const submitForm = async () => {
  loading.value = true;
  if(reviewForm.value.rating<0){
    message.error('Please rate this product')
    return;
  }
  const {data, error} = await useAsyncData(`review_${Math.random() * 1000}`,
      () =>
          $fetch(`${useRuntimeConfig().public.apiUrl}/api/v1/review/user/review`, {
            headers: {
              Authorization: `Bearer ${useAuthStore().token}`
            },
            method: 'POST',
            body: JSON.stringify(reviewForm.value)
          })
  )
  if (data.value) {

    loading.value = false;
    orderData.value = orderData.map((order) => {
      if (order.id === gameForReview.value.id) {
        order.review = data.value;
      }
      return order;
    });
    message.success('Review success')
    setTimeout(() => {
      handleCancelReview()
    }, 1500)
  }
}

const bodyStyle = {
  width: '900px'
}
const segmented = {
  content: 'soft',
  footer: 'soft'
}

</script>

<style scoped>

</style>