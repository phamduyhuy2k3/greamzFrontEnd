<template>

  <div class="shadow-lg rounded-md border border-neutral-100 ">
    <div class="flex justify-between items-end bg-transparent py-2 px-4 md:px-6 md:pt-6 md:pb-4">
      <p class="typography-headline-4 font-bold md:typography-headline-3">Order Summary</p>
      <p class="typography-text-base font-medium">(Items: {{ getCartItemCount }})</p>
    </div>
    <div class="px-4 pb-4 mt-3 md:px-6 md:pb-6 md:mt-0">
      <div class="flex justify-between typography-text-base pb-4">
        <div class="flex flex-col grow pr-2">
          <p>Items Subtotal</p>
          <p class="typography-text-xs text-neutral-500">Original Price</p>
          <p class="typography-text-xs text-secondary-700">Savings</p>
          <p class="my-2">Payment method</p>
          <!--            <p>Estimated Sales Tax</p>-->
        </div>
        <div class="flex flex-col text-right">
          <p>{{ $currency(getCartTotal) }}</p>
          <p class="typography-text-xs text-neutral-500">{{ $currency(getCartTotalOriginal) }}</p>
          <p class="typography-text-xs text-secondary-700">{{ $currency(getTotalDiscount) }}</p>
          <!--            <p>{{ formatPrice(orderDetails.tax) }}</p>-->
        </div>
      </div>

      <p class="px-3 py-1.5 bg-[#a78bfa] typography-text-sm rounded-md text-center mb-4">
        You are saving {{ $currency(getTotalDiscount) }} on your order today!
      </p>
      <div
          class="flex justify-between typography-headline-4 md:typography-headline-3 font-bold pb-4 mb-4 border-b border-neutral-200"
      >
        <p>Total</p>
        <p>{{ $currency(getCartTotal) }}</p>
      </div>
      <NuxtLink to="/payment">
        <SfButton size="lg" class="w-full bg-[#ff346d] hover:bg-[#3b82f6]">
          Place Order
        </SfButton>
      </NuxtLink>
      <div class="typography-text-sm mt-4 text-center">
        By placing my order, you agree to our
        <SfLink href="#">Terms and Conditions</SfLink>
        and our
        <SfLink href="#">Privacy Policy.</SfLink>
      </div>
    </div>
  </div>


</template>

<script setup lang="ts">

import {SfButton, SfLink} from '@storefront-ui/vue';
const {getCartItemCount,getCartTotal,getCartTotalOriginal,getTotalDiscount}=storeToRefs(useCart())



const formatPrice = (price: number) => {
  return new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'}).format(price);
};

</script>

<style scoped>

</style>