<template>
  <div class="mx-auto w-[80%] text-white">
    <BreadCrumb  :breadcrumbs="breadcrumbs"></BreadCrumb>
    <slot name="breadcrumb"></slot>
    <h1 class="font-bold text-[2.5rem] mt-3">
      YOUR SHOPPING CART
    </h1>
    <div class="mt-5 ">
      <div class="cart-header flex items-center justify-center">
        <ul class="steps w-full">
          <li class="step step-primary">Shopping cart</li>
          <li class="step ">Payment</li>
          <li class="step">Game activation</li>

        </ul>
      </div>
      <div class="grid grid-rows-2 xl:grid-cols-12 ">
        <div class="xl:col-span-8">
          <LazyGameCardHorizonal v-for="cart in useCart().items" :item="cart" class="mt-3"/>


        </div>
        <div class="xl:col-span-4 p-2 ">
          <LazyOrderSummary/>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const {breadcrumbs}= userBreadCrumb();
</script>

<style scoped>
main {
  background-color: #161a3a;
}


</style>