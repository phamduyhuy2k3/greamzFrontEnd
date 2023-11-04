<template>

  <div class="shadow-lg rounded-md border border-neutral-100">
    <div class="flex justify-between items-end  bg-transparent py-2 px-4 md:px-6 md:pt-6 md:pb-4">
      <p class="typography-headline-4 font-bold md:typography-headline-3">Order Summary</p>
      <p class="typography-text-base font-medium">(Items: {{ items.length }})</p>
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
          <p class="my-2">{{ paymentMethod === '' ? 'Not selected' : paymentMethod }}</p>
          <!--            <p>{{ formatPrice(orderDetails.tax) }}</p>-->
        </div>
      </div>
      <!--      <div v-if="promoCode" class="flex items-center mb-5 py-5 border-y border-neutral-200">-->
      <!--        <p>PromoCode</p>-->
      <!--        <SfButton size="sm" variant="tertiary" class="ml-auto mr-2" @click="removePromoCode">Remove</SfButton>-->
      <!--        <p>{{ $currency(promoCode) }}</p>-->
      <!--      </div>-->
      <!--      <form v-else class="flex gap-x-2 py-4 border-y border-neutral-200 mb-4" @submit.prevent="checkPromoCode">-->
      <!--        <SfInput v-model="inputValue"  placeholder="Enter Promo Code" wrapper-class="grow" />-->
      <!--        <SfButton type="submit" class="bg-[#3b82f6]">Apply</SfButton>-->
      <!--      </form>-->
      <p class="px-3 py-1.5 bg-[#a78bfa]  typography-text-sm rounded-md text-center mb-4">
        You are saving {{ $currency(getTotalDiscount) }} on your order today!
      </p>
      <div
          class="flex justify-between typography-headline-4 md:typography-headline-3 font-bold pb-4 mb-4 border-b border-neutral-200"
      >
        <p>Total</p>
        <p>{{ $currency(getCartTotal) }}</p>
      </div>
      <template v-if="!loading">
        <SfButton v-if="paymentMethod!== 'PAYPAL' &&paymentMethod!== 'SOLANA' &&paymentMethod!==''"
                  :disabled="paymentMethod===''" @click="placeOrderMethod(paymentMethod)" size="lg"
                  class="text-white w-full bg-[#ff346d] hover:bg-[#3b82f6] ">
          Checkout
        </SfButton>
        <SfButton :disabled="paymentMethod===''" v-if="paymentMethod==='SOLANA'&!isRequestSend" @click="showModal=true" size="lg"
                  class="text-white w-full bg-[#ff346d] hover:bg-[#3b82f6] ">
          Checkout
        </SfButton>

        <div>
          <PayPalButton v-if="paymentMethod=== 'PAYPAL'"/>
        </div>
      </template>
      <n-spin v-else class="mx-auto" size="medium" />
      <div class="typography-text-sm mt-4 text-center">
        By placing your order, you agree to our
        <a >Terms and Conditions</a>
        and our
        <a >Privacy Policy.</a>
      </div>

    </div>
  </div>
  <div class="absolute top-0 right-0 mx-2 mt-2 sm:mr-6">
    <!--      <div-->
    <!--          v-if="showAddedCodeAlert"-->
    <!--          role="alert"-->
    <!--          class="flex items-start md:items-center shadow-md max-w-[600px] bg-positive-100 pr-2 pl-4 mb-2 ring-1 ring-positive-200 typography-text-sm md:typography-text-base py-1 rounded-md"-->
    <!--      >-->
    <!--        <SfIconCheckCircle class="mr-2 my-2 text-positive-700" />-->
    <!--        <p class="py-2 mr-2">Your promo code has been added.</p>-->
    <!--        <button-->
    <!--            type="button"-->
    <!--            class="p-1.5 md:p-2 ml-auto rounded-md text-positive-700 hover:bg-positive-200 active:bg-positive-300 hover:text-positive-800 active:text-positive-900"-->
    <!--            aria-label="Close positive alert"-->
    <!--            @click="showAddedCodeAlert = false"-->
    <!--        >-->
    <!--          <SfIconClose class="hidden md:block" />-->
    <!--          <SfIconClose size="sm" class="md:hidden block" />-->
    <!--        </button>-->
    <!--      </div>-->
    <!--      <div-->
    <!--          v-if="showRemovedCodeAlert"-->
    <!--          role="alert"-->
    <!--          class="flex items-start md:items-center shadow-md max-w-[600px] bg-positive-100 pr-2 pl-4 mb-2 ring-1 ring-positive-200 typography-text-sm md:typography-text-base py-1 rounded-md"-->
    <!--      >-->
    <!--        <SfIconCheckCircle class="mr-2 my-2 text-positive-700" />-->
    <!--        <p class="py-2 mr-2">Your promo code has been removed.</p>-->
    <!--        <button-->
    <!--            type="button"-->
    <!--            class="p-1.5 md:p-2 ml-auto rounded-md text-positive-700 hover:bg-positive-200 active:bg-positive-300 hover:text-positive-800 active:text-positive-900"-->
    <!--            aria-label="Close positive alert"-->
    <!--            @click="showRemovedCodeAlert = false"-->
    <!--        >-->
    <!--          <SfIconClose class="hidden md:block" />-->
    <!--          <SfIconClose size="sm" class="md:hidden block" />-->
    <!--        </button>-->
    <!--      </div>-->
    <!--      <div-->
    <!--          v-if="showErrorAlert"-->
    <!--          role="alert"-->
    <!--          class="flex items-start md:items-center max-w-[600px] shadow-md bg-negative-100 pr-2 pl-4 ring-1 ring-negative-300 typography-text-sm md:typography-text-base py-1 rounded-md"-->
    <!--      >-->
    <!--        <p class="py-2 mr-2">This promo code is not valid.</p>-->
    <!--        <button-->
    <!--            type="button"-->
    <!--            class="p-1.5 md:p-2 ml-auto rounded-md text-negative-700 hover:bg-negative-200 active:bg-negative-300 hover:text-negative-800 active:text-negative-900"-->
    <!--            aria-label="Close error alert"-->
    <!--            @click="showErrorAlert = false"-->
    <!--        >-->
    <!--          <SfIconClose class="hidden md:block" />-->
    <!--          <SfIconClose size="sm" class="md:hidden block" />-->
    <!--        </button>-->
    <!--      </div>-->
  </div>
  <n-modal
      v-model:show="showModal"
      class="custom-card"
      preset="card"
      :style="{
        width: '400px',
      }"
      title="Solana wallet"
      :bordered="false"
      size="small"
      z-index="0"
  >
    <div class="flex flex-col items-center">
      <WalletMultiButton class="w-full"  dark/>
    </div>
    <template #footer>
      <div class="flex justify-end gap-x-4">
        <SfButton  variant="secondary" class="flex-1 md:flex-initial" @click="showModal=false">Cancel</SfButton>
        <button v-if="!connecting&&connected" type="button" @click="placeOrderMethod('SOLANA')" class="btn btn-info">Send transaction</button>
        <n-button disabled v-if="!connected"  quaternary type="info">
          Connect your wallet first
        </n-button>
        <button v-if="connecting" disabled type="button" class="btn btn-info text-white"><n-spin size="large" /></button>

      </div>
    </template>
  </n-modal>
</template>

<script >
import {ref, computed} from 'vue';
import {SfButton, SfInput , SfIconClose, SfIconCheckCircle} from '@storefront-ui/vue';
import {useWallet, WalletMultiButton} from "solana-wallets-vue";
export default {
  components: {
    SfButton,
    SfInput,
    SfIconClose,
    SfIconCheckCircle,
    WalletMultiButton
  },
  props: {
    paymentMethod: {
      type: String,
      default: ''
    },
  },
  methods: {
    async placeOrderMethod (paymentMethod) {
      console.log(paymentMethod)
      this.loading = true
      if(paymentMethod==='SOLANA'){
        this.showModal=false
        this.isRequestSend=true
        this.placeOrder(paymentMethod).then(async r=>{
          this.isRequestSend=false
          if(r!==false){
            navigateTo({path: '/order/success', query: {orderId: r}})
          }else {
            navigateTo({path: '/order/failed'})
          }
        })
        return
      }
      await this.placeOrder(paymentMethod)
      this.loading = false
    }
  },
  setup(props) {
    const {connected,connecting}=useWallet()
    const {placeOrder,getTotalDiscount,getCartTotal,getCartTotalOriginal,items}=useCart()
    const loading = ref(false)
    const showModal = ref(false)
    const isRequestSend = ref(false)
    return {
      placeOrder,
      loading,
      showModal,
      getTotalDiscount,
      getCartTotal,
      getCartTotalOriginal,
      items,connecting,connected,isRequestSend


    }
  }
}

// const placeOrder = () => {
//   console.log(paymentMethod)
//   if (paymentMethodRef.value === 'SOLANA') {
//     return
//   }
//
//
// }
// const checkPromoCode = () => {
//   if ((promoCode.value === -100 && inputValue.value.toUpperCase() === 'VSF2020') || !inputValue.value) return;
//   if (inputValue.value.toUpperCase() === 'VSF2020') {
//     promoCode.value = -100;
//     showAddedCodeAlert.value = true;
//     setTimeout(() => (showAddedCodeAlert.value = false), 5000);
//   } else {
//     showErrorAlert.value = true;
//     setTimeout(() => (showErrorAlert.value = false), 5000);
//   }
// };
// const removePromoCode = () => {
//   promoCode.value = 0;
//   showRemovedCodeAlert.value = true;
//   setTimeout(() => (showRemovedCodeAlert.value = false), 5000);
// };


</script>

<style scoped>

</style>