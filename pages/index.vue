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
</script>
<template>
  <JumBoTron />
  <section class="w-[80%]  mx-auto">
    <div class="flex items-center text-[#a1a1aa] hover:text-white">
      <h1 class="text-[1.8rem] font-bold">
        Special Offers
      </h1>
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="m8.086 17.5l5.5-5.5l-5.5-5.5L9.5 5.086L16.414 12L9.5 18.914L8.086 17.5Z"/></svg>
    </div>
    <div class="grid xl:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 grid-cols-1 gap-4">
      <SpecialOffer/>
    </div>
  </section>
  <section class="bg-[#475569] flex justify-center items-center gap-x-[8rem] flex-row flex-wrap text-[#e0f2fe] py-6 px-2 mt-5">
    <div class="flex items-center justify-center gap-3 px-8 border-r-2 border-white">
      <div>
        <IconTrustPanelDownload/>
      </div>
      <div class="flex flex-col items-center justify-center">
        <div class="font-bold text-lg">
          Super Fast
        </div>
        <div>
          Instant digital download
        </div>
      </div>
    </div>
    <div class="flex items-center justify-center gap-3 px-8 border-r-2 border-white">
      <div>
        <IconTrustPanelSecure/>
      </div>
      <div class="flex flex-col items-center justify-center">
        <div class="font-bold text-lg">
          Reliable & safe
        </div>
        <div>
          Secure payments
        </div>
      </div>
    </div>
    <div class="flex items-center justify-center gap-3 px-8 ">
      <div>
        <IconTrustPanelCustomer/>
      </div>
      <div class="flex flex-col items-center justify-center">
        <div class="font-bold text-lg">
          Customer
        </div>
        <div>
          Support 24/7
        </div>
      </div>
    </div>

  </section>
  <section class="w-[80%]  mx-auto mt-8">
    <div class="flex items-center text-[#a1a1aa] hover:text-white">
      <h1 class="text-[1.8rem] font-bold">
        Top Sellers
      </h1>
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="m8.086 17.5l5.5-5.5l-5.5-5.5L9.5 5.086L16.414 12L9.5 18.914L8.086 17.5Z"/></svg>
    </div>
    <div class="grid xl:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 grid-cols-1 gap-4">
      <TopSeller/>
    </div>
  </section>
  <section class="w-[80%] mx-auto mt-8">
    <div class="flex items-center text-[#a1a1aa] hover:text-white">
      <h1 class="text-[1.8rem]">
        Reviews
      </h1>
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="m8.086 17.5l5.5-5.5l-5.5-5.5L9.5 5.086L16.414 12L9.5 18.914L8.086 17.5Z"/></svg>
    </div>
    <div class="">
      <LazyReviewSlider/>
    </div>

  </section>


</template>
<style>

</style>