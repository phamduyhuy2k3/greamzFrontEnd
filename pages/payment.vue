<template>
  <div class="mx-auto md:xl:w-[80%] w-[95%] text-white">
    <BreadCrumb  :breadcrumbs="userBreadCrumb().breadcrumbs"></BreadCrumb>
    <div class="cart-header flex items-center justify-center  rounded">
      <ul class="steps w-full">
        <li data-content="✓" class="step step-primary">Shopping cart</li>
        <li class="step step-primary ">Payment</li>
        <li class="step">Game activation</li>

      </ul>

    </div>
    <div class="md:grid xl:grid  md:grid-cols-12 xl:grid-cols-12 flex flex-col gap-4 mt-3">
      <div class="col-span-6">
        <fieldset class="">
          <legend class="mb-4 typography-headline-5 font-bold text-[1.5rem]  text-white">Payment method</legend>
          <div class="grid grid-cols-2 gap-4 items-stretch">
            <label v-for="{ label, value, logo, active,text } in paymentMethods" :key="value" class="relative">
              <input type="radio" name="payment_method" class="absolute peer top-1/2 bottom-1/2 left-8" :value="value"
                     :disabled="!active" v-model="paymentMethod.value" @change="paymentMethod.label=label"/>
              <div
                  class="h-full flex flex-col items-center justify-center py-7 px-4 cursor-pointer rounded-md border border-neutral-200 -outline-offset-2 hover:border-primary-200 hover:bg-[#22d3ee] peer-focus:border-primary-200 peer-focus:bg-primary-100 active:border-[#22d3ee] active:bg-[#22d3ee] peer-disabled:opacity-50 peer-disabled:bg-neutral-100  peer-disabled:cursor-not-allowed peer-disabled:[&_img]:grayscale"
              >
                <img :src="logo" :alt="label" class="h-6 select-none"/>
                <p class="select-none text-white typography-text-xs">{{ text }}</p>
                <p v-if="!active" class="absolute bottom-2 select-none text-disabled-900 typography-text-xs">Coming
                  soon</p>
              </div>
            </label>
          </div>
        </fieldset>
      </div>
      <div class="col-span-6">
        <OrderSummaryCheckout :payment-method="paymentMethod"/>
      </div>
    </div>
  </div>
</template>

<script setup>

const paymentMethods = [
  {
    label: 'PayPal',
    value: 'paypal',
    text: 'PayPal',
    logo: 'https://storage.googleapis.com/sfui_docs_artifacts_bucket_public/production/paypal-logo.svg',
    active: true,
  },
  {
    label: 'Momo',
    value: 'momo',
    text: 'Ví điện tử Momo',
    logo: '/img/momo_square_pinkbg.svg',
    active: true,
  },
  {
    label: 'VnPay',
    text: 'Ví điện tử VnPay',
    value: 'vnpay',
    logo: 'img/VNPAY-QR dương bản 2.png',
    active: true,
  },
  {
    label: 'Credit card',
    value: 'credit-card',
    text: 'Credit card',
    logo: 'https://storage.googleapis.com/sfui_docs_artifacts_bucket_public/production/visa-logo.svg',
    active: false,
  },
];
const paymentMethod = reactive({
  value: '',
  label: '',
});

</script>

<style scoped>
main {
  background-color: #161a3a;
}
</style>