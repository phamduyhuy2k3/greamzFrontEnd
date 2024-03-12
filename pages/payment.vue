<template>
  <div class="mx-auto text-white relative">

    <BreadCrumb  :breadcrumbs="userBreadCrumb().breadcrumbs"></BreadCrumb>
    <h1 class="font-bold text-[2.5rem] mt-3">
      Payment
    </h1>
    <div class="cart-header flex items-center justify-center  rounded">
      <ul class="steps w-full">
        <li  data-content="✓" class="step step-primary"><NuxtLink to="/cart">Shopping cart</NuxtLink></li>
        <li class="step step-primary ">Payment</li>
        <li class="step">Game activation</li>

      </ul>
    </div>
    <div class="grid grid-cols-12  gap-4 mt-3">
      <div class="xl:col-span-8 col-span-12">
        <fieldset>
          <legend class="mb-4 typography-headline-5 font-bold text-[1.5rem]  text-white">Payment method</legend>
          <div class="grid grid-cols-2 gap-4 items-stretch relative">
            <label v-for="{ label, textValue, logo, active,text } in paymentMethods" :key="textValue" class="relative">
              <input :disabled="getCartTotal<=0" type="radio" name="payment-method"  class="peer absolute top-1/2 bottom-1/2 left-4" :value="textValue"
              v-model="paymentMethod"
              />
              <div
                  class="h-full flex flex-col gap-2 items-center justify-center py-7 px-4 cursor-pointer rounded-md border border-neutral-200 -outline-offset-2 hover:border-primary-200 hover:bg-primary-100 peer-focus:border-primary-200 peer-focus:bg-primary-100 active:border-primary-300 active:bg-blue peer-checked:outline peer-checked:outline-2 peer-checked:outline-primary-700 peer-disabled:opacity-50 peer-disabled:bg-neutral-100 peer-disabled:border-neutral-200 peer-disabled:cursor-not-allowed peer-disabled:[&_img]:grayscale"
              >
                <img :src="logo" :alt="label" class="h-6 select-none" />
                <span>{{text}}</span>
                <p v-if="!active" class="absolute bottom-2 select-none text-disabled-900 typography-text-xs">Coming soon</p>
              </div>
            </label>
          </div>
        </fieldset>
        <fieldset class="mt-2 ">
          <legend class="mb-4 typography-headline-5 font-bold text-[1.5rem]  text-white">Items</legend>
          <div class="">
            <div class="border-b-[1px] bg-[#1f254a] border-neutral-200 hover:shadow-lg p-4 mb-2">
              <table class="w-full overflow-y-auto text-sm text-left text-gray-500 dark:text-gray-400 text-white">
                <thead class="text-xs uppercase bg-gray-700 text-gray-400">
                <tr>
                  <th scope="col" class="sr-only">
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Product name
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Platform
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Price
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Quantity
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Discount
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Total
                  </th>
                </tr>
                </thead>
                <tbody class="">
                <tr v-for="item in useCart().items"  class="text-[12px] text-center bg-gray-800 border-gray-700 hover:bg-gray-600">
                  <td class="pl-1">
                    <img :src="item.game.header_image" :alt="item.name" >
                  </td>
                  <th scope="row" class="px-6 py-4 font-bold text-white whitespace-nowrap truncate">
                    {{item.game.name  }}
                  </th>
                  <th scope="row" class="px-6 py-4 font-bold text-white whitespace-nowrap truncate">
                    {{item.platform.name  }}
                  </th>
                  <td class="px-6 py-4">
                    {{ $currency(item.game.price)}}
                  </td>
                  <td class="px-6 py-4">
                    {{ item.quantity }}
                  </td>
                  <td class="px-6 py-4">
                    {{ item.game.discount? item.game.discount +'%' : 'None' }}
                  </td>
                  <td class="px-6 py-4">
                    {{ $currency(useCart().amtOf(item) )}}
                  </td>
                </tr>

                </tbody>
              </table>
            </div>
          </div>
        </fieldset>
      </div>
      <div class="xl:col-span-4 col-span-12">
        <OrderSummaryCheckout :payment-method="paymentMethod" />
      </div>
    </div>
  </div>

</template>

<script setup>
import {ref} from "vue";


definePageMeta({
  middleware: ["payment"]
  // or middleware: 'auth'
})

const {getCartTotal}=useCart()

const paymentMethods = [
  {
    label: 'PayPal',
    textValue: 'PAYPAL',
    text: 'PayPal',
    logo: '/img/paypal-logo.svg',
    active: true,
  },
  {
    label: 'Momo',
    textValue: 'MOMO',
    text: 'Ví điện tử Momo',
    logo: '/img/momo_square_pinkbg.svg',
    active: true,
  },
  {
    label: 'VnPay',
    text: 'Ví điện tử VnPay',
    textValue: 'VNPAY',
    logo: 'img/VNPAY-QR dương bản 2.png',
    active: true,
  },
  {
    label: 'Solana wallet'
    ,textValue: 'SOLANA',
    text: 'Solana wallet',
    logo: 'img/Size=24, Color=color-black@2x.png',
    active: true,
  }
  // {
  //   label: 'Credit card',
  //   textValue: 'credit-card',
  //   text: 'Credit card',
  //   logo: 'https://storage.googleapis.com/sfui_docs_artifacts_bucket_public/production/visa-logo.svg',
  //   active: false,
  // },
];
const paymentMethod = ref('');
const promo = ref(0);
const updatePromo= (newPromo)=>{

}


const placeOrder=  (promo=null)=>{

  console.log(promo)
  // if(promo){
  //   orderToPlace.voucher=promo;
  // }


}
</script>

<style scoped>
main {
  background-color: #161a3a;
}
</style>