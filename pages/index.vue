<script setup>
definePageMeta({

  breadcrumb: "Home",
});
useHead({
  title: "Home",
  meta: [
    {
      name: "description",
      content: "Home",
    },
  ],
});
const route=useRoute()
if(route.query?.access_token){
  await useFetch("/api/client/token",{
    method: "POST",
    body: {

    }
  })
}
</script>
<template>
  <JumBoTron />
  <div class="flex flex-col items-center justify-center text-white">
    <section class="">
      <div class="flex items-center text-[#a1a1aa] hover:text-white">
        <h1 class="text-[1.8rem] font-bold">
          Special Offers
        </h1>
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="m8.086 17.5l5.5-5.5l-5.5-5.5L9.5 5.086L16.414 12L9.5 18.914L8.086 17.5Z"/></svg>
      </div>
      <div class="grid xl:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4">
        <suspense>
          <LazySpecialOffer/>
          <template #fallback>
            <n-spin size="large"/>
          </template>
        </suspense>
      </div>
    </section>

    <section class="mt-8 ">
      <div class="flex items-center text-[#a1a1aa] hover:text-white">
        <h1 class="text-[1.8rem] font-bold">
          Top Sellers
        </h1>
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="m8.086 17.5l5.5-5.5l-5.5-5.5L9.5 5.086L16.414 12L9.5 18.914L8.086 17.5Z"/></svg>
      </div>
      <div class="grid xl:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-2 gap-4">
        <suspense>
          <LazyTopSeller/>
          <template #fallback>
            <n-spin size="large"/>
          </template>
        </suspense>
      </div>
    </section>
<!--    <section class="mt-8 w-full">-->
<!--      <div class="flex items-center text-[#a1a1aa] hover:text-white">-->
<!--        <h1 class="text-[1.8rem]">-->
<!--          Reviews-->
<!--        </h1>-->
<!--        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="m8.086 17.5l5.5-5.5l-5.5-5.5L9.5 5.086L16.414 12L9.5 18.914L8.086 17.5Z"/></svg>-->
<!--      </div>-->
<!--      <div class="w-full">-->
<!--        <suspense>-->
<!--          < <LazyReviewSlider/>/>-->
<!--          <template #fallback>-->
<!--            <n-spin size="large"/>-->
<!--          </template>-->
<!--        </suspense>-->
<!--      </div>-->

<!--    </section>-->
  </div>


</template>
<style>

</style>