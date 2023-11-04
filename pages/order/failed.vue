<template>
  <div class="flex flex-col items-center justify-center h-[600px]">
    <div class="flex items-center justify-center">
      <svg
          class="w-16 h-16 text-red-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
      >
        <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
        ></path>
      </svg>
    </div>
    <h1 class="text-2xl font-semibold text-center text-negative-700">
      Payment Failed
    </h1>
    <p class="text-md text-center text-gray-500">
      Your payment has been failed. Please try again.
    </p>
    <div class="mt-4">
      <NuxtLink to="/payment">
        <button
            class="px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-md hover:bg-red-600 focus:outline-none focus:bg-red-600"
        >
          Try Again
        </button>
      </NuxtLink>
    </div>
  </div>

</template>

<script setup>

</script>

<style scoped>

</style>