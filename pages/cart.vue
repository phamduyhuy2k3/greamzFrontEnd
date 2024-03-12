<template>
  <div class="mx-auto text-white">
    <BreadCrumb  :breadcrumbs="breadcrumbs"></BreadCrumb>
    <h1 class="font-bold text-[2.5rem] mt-3 uppercase">
      {{ $t('cart.yspc') }}
    </h1>
    <div class="mt-5 p-2">
      <div class="cart-header flex items-center justify-center">
        <ul class="steps w-full">
          <li class="step step-primary">Shopping cart</li>
          <li class="step ">Payment</li>
          <li class="step">Game activation</li>

        </ul>
      </div>

      <div class="grid grid-rows-2 xl:grid-cols-12">
        <div  class="xl:col-span-8 h-full relative cart_container">

          <div class="flex flex-col">
            <LazyGameCardHorizonal v-for="cart in getItems" :item="cart" class="mt-3"/>
            <button v-if="toggleCart" class="mx-auto" @click="handleToggleCart()">

              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="m4 12l1.41 1.41L11 7.83V20h2V7.83l5.58 5.59L20 12l-8-8l-8 8z"/></svg>
            </button>
<!--            <template v-if="(getCartItemCount>=4 && !isMobile&& !toggleCart) || (getCartItemCount>=2 && isMobile&& !toggleCart) ">-->
<!--              <button  class="see-more-btn" @click="handleToggleCart()">See More</button>-->
<!--              <div class="cart_item_blur">-->
<!--              </div>-->
<!--            </template>-->

          </div>

        </div>
        <div class="xl:col-span-4 xl:sticky xl:top-[15%]">
          <LazyOrderSummary/>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>

const toggleCart = ref(false);
const {getItems}=storeToRefs(useCart())

const handleToggleCart = () => {
  toggleCart.value = !toggleCart.value;
};
const {breadcrumbs}= userBreadCrumb();

</script>

<style scoped>
main {
  background-color: #161a3a;
}
.cart_item_blur{
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100px; /* Chiều cao của phần tử con dưới cùng */

  backdrop-filter: blur(12px) saturate(100%);
}
.see-more-btn {
  position: absolute;
  left: 50%;
  bottom: 0;
  transform: translateX(-50%);
  z-index: 1; /* Đặt z-index để button không bị che phủ */
}

</style>