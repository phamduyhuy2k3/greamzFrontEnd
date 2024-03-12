<template>
  <article class="p-4 border rounded-md min-h-[170px] max-w-[426px]">
    <header class="flex flex-col items-start pb-4 md:flex-row md:justify-between">
      <div class="flex items-start">
        <img :src="review.account.photo" alt="Review avatar" class="p-0.5 w-14 h-14 rounded-full" />
        <div class="flex-col pl-2">
          <span class="text-sm text-neutral-300">{{review.account.username}}</span>
          <span class="flex items-center pr-2 text-xs text-neutral-500">
            <SfRating :value="review.rating" :max="5" size="xs" class="mr-2 text-[#fde047]" />

            {{ moment(review.createdAt).fromNow()}}
          </span>
          <NuxtLink :to="'/game/appid/'+review.game.appid" class="text-sm text-neutral-300">{{review.game.name}}</NuxtLink>
        </div>
      </div>
      <p class="flex items-center text-xs truncate text-primary-700">
        <SfIconCheck size="xs" class="mr-1" /> Verified purchase
      </p>
    </header>
    <div class="pb-2 text-sm text-neutral-200">{{ truncatedContent }}</div>
    <button
        v-if="isButtonVisible"
        type="button"
        class="inline-block mb-2 text-sm font-normal border-b-2 border-black cursor-pointer w-fit hover:text-primary-700 hover:border-primary-800"
        @click="isCollapsed = !isCollapsed"
    >
      {{ isCollapsed ? 'Read more' : 'Read less' }}
    </button>
    <footer class="flex items-center justify-between">
      <div class="text-sm text-neutral-500">
        <button type="button"  @click="reaction(reviewRef.reacted,'LIKE')"   :class=" reviewRef.reacted&&reviewRef.reactionType==='LIKE'? 'text-[#3b82f6]' :'text-white'" class="mr-6 hover:text-primary-800 ">
          <SfIconThumbUp  size="sm" class="mr-2.5 " />
          <SfCounter  size="sm" class="text-white">{{reviewRef.likes}}</SfCounter>

        </button>
        <button type="button"  @click="reaction(reviewRef.reacted,'DISLIKE')" :class="reviewRef.reacted&&reviewRef.reactionType==='DISLIKE'?'text-[#3b82f6]' :'text-white'" class="hover:text-primary-800">
          <SfIconThumbDown    size="sm" class="mr-2.5" />
          <SfCounter size="sm" class="text-white">{{reviewRef.dislikes}}</SfCounter>
        </button>
      </div>

      <button class="px-3 py-1.5 text-neutral-500 font-medium text-sm hover:text-primary-800" type="button">
        Report abuse
      </button>
    </footer>
  </article>
</template>

<script setup>

import { SfRating, SfIconCheck, SfIconThumbUp, SfIconThumbDown, SfCounter } from '@storefront-ui/vue';
import moment from "moment";
const {review}= defineProps({
  review: {
    type: Object,
    default: () => ({}),
  }
});

const reviewRef=ref({
  reacted: review.reacted,
  reactionType: review.reactionType,
  likes: review.likes,
  dislikes: review.dislikes,
})
const charLimit = 20;
const isCollapsed = ref(true);
const isButtonVisible = computed(() => review.text.length > charLimit);
const truncatedContent = computed(() =>
    isButtonVisible.value && isCollapsed.value ? `${review.text.substring(0, charLimit)}...` : review.text,
);
const reaction=async (isReacted,reactType)=>{
  console.log(isReacted,reactType)
  const {userProfile}=useAuthStore()
  console.log(userProfile)
  if(!userProfile){
    alert('Please login to react the review')
    return
  }
  const payload={
    isReacted: isReacted,
    reactionType: reactType,
    reviewId: review.id,
    userId: userProfile.id,
  }

  const {data}=await useAsyncData('reactTheReview',
      ()=>
          $fetch(`${config.public.apiUrl}/api/server/v1/review/react`,{
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer',
            },
            body: JSON.stringify(payload)
          }),
  )
  if(data.value){
    reviewRef.value=data.value
  }
}
</script>

<style scoped>

</style>