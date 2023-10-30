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
const {withBase} = useFile()
const itemsSpecial = [
  {
    title: "Viewfinder",
    price: 321.000,
    imageHeader: withBase("spotlight_image_english (4).jpg"),
    discount: 50,

  },

]
const itemCarousel = [
  {
    title: 'GTA',
    imageSrc: withBase('capsule_616x353 (3).jpg'),
    alt: 'backpack1',
    images: [
      withBase('ss_62a2f95c1784f138c3abbecf376c5cc99cc94a57.600x338.jpg'),
      withBase('ss_1487c2c7ddd9a1ae6b55f7e50d5d63ada6915921.600x338.jpg'),
      withBase('ss_a5ca40b51e95d5c592e5eb77b3d78d5149ea5fd6.600x338.jpg'),
      withBase('ss_e929649b2b98ad76795d92d8489470bc5dbffddb.600x338.jpg')],
    categories: ['Action', 'Adventure', 'Open World', 'Third Person', 'Singleplayer', 'Multiplayer'],
  },
  {imageSrc: withBase('capsule_616x353.jpg'), alt: 'backpack2'},
  {imageSrc: withBase('capsule_616x353 (1).jpg'), alt: 'backpack3'},
  {imageSrc: withBase('capsule_616x353 (2).jpg'), alt: 'backpack4'},
  {imageSrc: withBase('capsule_616x353 (4).jpg'), alt: 'backpack5'},
  {imageSrc: withBase('capsule_616x353 (5).jpg'), alt: 'backpack6'},
  {
    title: 'GTA',
    imageSrc: withBase('capsule_616x353 (3).jpg'),
    alt: 'backpack1',
    images: [
      withBase('ss_62a2f95c1784f138c3abbecf376c5cc99cc94a57.600x338.jpg'),
      withBase('ss_1487c2c7ddd9a1ae6b55f7e50d5d63ada6915921.600x338.jpg'),
      withBase('ss_a5ca40b51e95d5c592e5eb77b3d78d5149ea5fd6.600x338.jpg'),
      withBase('ss_e929649b2b98ad76795d92d8489470bc5dbffddb.600x338.jpg')],
    categories: ['Action', 'Adventure', 'Open World', 'Third Person', 'Singleplayer', 'Multiplayer'],
  },
  {imageSrc: withBase('capsule_616x353.jpg'), alt: 'backpack2'},
  {imageSrc: withBase('capsule_616x353 (1).jpg'), alt: 'backpack3'},
  {imageSrc: withBase('capsule_616x353 (2).jpg'), alt: 'backpack4'},
  {imageSrc: withBase('capsule_616x353 (4).jpg'), alt: 'backpack5'},
  {imageSrc: withBase('capsule_616x353 (5).jpg'), alt: 'backpack6'},
  {imageSrc: withBase('capsule_616x353 (4).jpg'), alt: 'backpack5'},
  {imageSrc: withBase('capsule_616x353 (5).jpg'), alt: 'backpack6'}
];

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
        <LazyGameCardVertical/>
        <LazyGameCardVertical/>
        <LazyGameCardVertical/>
        <LazyGameCardVertical/>
        <LazyGameCardVertical/>
        <LazyGameCardVertical/>
        <LazyGameCardVertical/>
        <LazyGameCardVertical/>
        <LazyGameCardVertical/>
      </div>
    </section>
  </div>


</template>
<style>

</style>