<template>
  <div class="flex flex-col items-center justify-center gap-3 relative" v-if="reviews&&!reviews.empty">
    <ReviewItem  v-for="review in reviews.content" :key="review.id" :review="review" />
    <SfButton v-if="!reviews.last" @click="fetchReviews(reviews.number+1)" size="lg" class="bg-[#ff346d] hover:bg-[#3b82f6] p-2">View more reviews</SfButton>
  </div>
</template>

<script setup>
const config=useRuntimeConfig()
const {appid}= defineProps({
  appid: {
    type: Object,
    required: true,
  }
});
import {SfButton} from '@storefront-ui/vue';
const reviews=ref(null)
const fetchReviews=async(page=0)=>{
  const{data,error}= await useAsyncData(`reviews_${Math.random()*100}`,
      ()=>
          $fetch(`${config.public.apiUrl}/api/v1/game/reviewsOfGame/${appid}`,{
            method: 'GET',
            query:{
              page: page,
              size: 8,
            }
          }),
  )
  if(data.value){
    reviews.value=data.value
  }
}
await fetchReviews();
</script>

<style scoped>

</style>