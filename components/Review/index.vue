<template>
  <div class="flex flex-col items-center justify-center gap-3 relative" v-if="reviews.length>0||!paggeAble.empty">
    <ReviewItem v-for="review in reviews" :key="review.id" :review="review"/>
    <SfButton v-if="!paggeAble.last" @click="fetchReviews(paggeAble.number+1)" size="lg"
              class="bg-[#ff346d] hover:bg-[#3b82f6] p-2">View more reviews
    </SfButton>
  </div>
</template>

<script setup>
const config = useRuntimeConfig()
const {appid} = defineProps({
  appid: {
    type: Object,
    required: true,
  }
});
import {SfButton} from '@storefront-ui/vue';

const reviews = ref([])
const paggeAble = ref(null)
const {userProfile} = useAuthStore()
const fetchReviews = async (page = 0) => {
  console.log("user:", userProfile?.id)
  const payload = userProfile?.id ?
      {
        page: page,
        size: 8,
        userId: userProfile.id,
      } :
      {
        page: page,
        size: 8,
      }
  const {data, error} = await useAsyncData(`reviews_${Math.random() * 100}`,
      () =>
          $fetch(`${config.public.apiUrl}/api/v1/game/reviewsOfGame/${appid}`, {
            method: 'GET',
            query:payload
          }),
  )
  if (data.value) {
    reviews.value.push(...data.value.content)
    paggeAble.value = {
      last: data.value.last,
      number: data.value.number,
      empty: data.value.empty,
    }
  }
}
await fetchReviews();
</script>

<style scoped>

</style>