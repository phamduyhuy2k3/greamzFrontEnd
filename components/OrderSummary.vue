<template>

  <div class="md:shadow-lg md:rounded-md md:border md:border-neutral-100">
    <div class="flex justify-between items-end bg-neutral-100 md:bg-transparent py-2 px-4 md:px-6 md:pt-6 md:pb-4">
      <p class="typography-headline-4 font-bold md:typography-headline-3">Order Summary</p>
      <p class="typography-text-base font-medium">(Items: {{ orderDetails.items }})</p>
    </div>
    <div class="px-4 pb-4 mt-3 md:px-6 md:pb-6 md:mt-0">
      <div class="flex justify-between typography-text-base pb-4">
        <div class="flex flex-col grow pr-2">
          <p>Items Subtotal</p>
          <p class="typography-text-xs text-neutral-500">Original Price</p>
          <p class="typography-text-xs text-secondary-700">Savings</p>

        </div>
        <div class="flex flex-col text-right">
          <p>{{ formatPrice(itemsSubtotal) }}</p>
          <p class="typography-text-xs text-neutral-500">{{ formatPrice(orderDetails.originalPrice) }}</p>
          <p class="typography-text-xs text-secondary-700">{{ formatPrice(orderDetails.savings) }}</p>

        </div>
      </div>

      <p class="px-3 py-1.5 bg-[#bfdbfe] text-[#4338ca]  rounded-md text-center mb-4">
        You are saving ${{ Math.abs(orderDetails.savings).toFixed(2) }} on your order today!
      </p>
      <div
          class="flex justify-between typography-headline-4 md:typography-headline-3 font-bold pb-4 mb-4 border-b border-neutral-200"
      >
        <p>Total</p>
        <p>{{ formatPrice(totalPrice) }}</p>
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
import {ref, computed} from 'vue';
import {SfButton, SfLink} from '@storefront-ui/vue';

const orderDetails = {
  items: 3,
  originalPrice: 7824.97,
  savings: -787.0,

};
// const promoCode = ref(0);

const itemsSubtotal = computed(
    () => orderDetails.originalPrice + orderDetails.savings,
);

const totalPrice = computed(() => itemsSubtotal.value);


const formatPrice = (price: number) => {
  return new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'}).format(price);
};

</script>

<style scoped>

</style>