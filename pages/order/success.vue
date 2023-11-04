<template>
  <div class="flex flex-col items-center justify-center h-[600px]">
    <div class="flex items-center justify-center">
      <svg
          class="w-16 h-16 text-green-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
      >
        <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M5 13l4 4L19 7"
        ></path>
      </svg>
    </div>
    <h1 class="text-2xl font-semibold text-center text-success">
      Payment Success
    </h1>
    <p class="text-md text-center text-gray-500">
      Your payment has been successfully completed.
    </p>
    <div class="mt-4">

      <NuxtLink  to="/dash-board/orders" >
        <button
            class="btn btn-outline btn-accent"
        >
          Let check your order
        </button>
      </NuxtLink>
    </div>

  </div>

</template>

<script
    setup>
const route=useRoute()
if(route.query.orderId===useCart().getOrder.id){
  useCart().clearCart()
  useCart().order.value=null
}
</script>

<style scoped>

</style>