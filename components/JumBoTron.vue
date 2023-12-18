<template>
  <div class="w-full relative -z-1" style="z-index: 10">
    <img
      class="w-full h-auto max-w-full flex"

      src="/img/home_header_bg_rainy_english.gif"
   />

    <Navbar  v-show="!isMobile" />
  </div>
</template>

<script setup>
const isMobile = useState('isMobile')
</script>

<style scoped></style>
