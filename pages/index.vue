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
  <div class="w-[80%]  mx-auto">
    <section class="mt-3">
      <div class="flex items-center text-[#a1a1aa] hover:text-white">
        <h1 class="text-[1.8rem]">
          Trending
        </h1>
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="m8.086 17.5l5.5-5.5l-5.5-5.5L9.5 5.086L16.414 12L9.5 18.914L8.086 17.5Z"/></svg>
      </div>
      <div class="grid xl:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 grid-cols-1 gap-4">
<!--        <LazyGameCardVertical/>-->
<!--        <LazyGameCardVertical/>-->
<!--        <LazyGameCardVertical/>-->
<!--        <LazyGameCardVertical/>-->
<!--        <LazyGameCardVertical/>-->
<!--        <LazyGameCardVertical/>-->
<!--        <LazyGameCardVertical/>-->
<!--        <LazyGameCardVertical/>-->
<!--        <LazyGameCardVertical/>-->
      </div>
    </section>
  </div>


</template>
<style>

</style>