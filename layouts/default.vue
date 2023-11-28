<template>

  <LazyHeader></LazyHeader>
  <div v-if="toastMessage && useRoute().query.alert==='info' && useRoute().query.message " class="toast top-[15%] toast-end" style="z-index: 696969">
    <div class="alert alert-info">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-current shrink-0 w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
      <span>{{useRoute().query.message}}</span>
    </div>
  </div>
  <div v-if="toastMessage && useRoute().query.alert==='success' && useRoute().query.message " class="toast top-[15%] toast-end" style="z-index: 696969">
    <div class="alert alert-success">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-current shrink-0 w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
      <span>{{useRoute().query.message}}</span>
    </div>
  </div>
  <main  class="w-full xl:w-[90%] min-h-[880px] md:w-[96%] mx-auto  pb-6"  >
      <slot>
      </slot>
  </main>

  <Footer></Footer>
</template>
<script setup>
import {initFlowbite} from "flowbite";
onMounted(() => {
  initFlowbite();

});



const toastMessage = ref(false);
watch(() => useRoute().query, () => {
  if(useRoute().query.message){
    toastMessage.value = true;
    setTimeout(() => {
      toastMessage.value = false;
      useRoute().query.message = null;
    }, 2000);
  }
});
const gameAdded=useState('gameAdded',()=>null);

</script>

<style>
body {
  background-image: url("/img/pattern_leaves_red.gif");
  background-repeat: repeat;
  font-family: Nunito;
}
.added-product {
  display: none;
  position: absolute;
  bottom: 0;
  left: 0;
  transition: transform 0.5s linear;
  /* Các CSS khác cho sản phẩm mới */
}

.game_card:hover .item_button{
  display: flex;
}
/*.item_button:hover  {*/
/*  display: flex;*/
/*  position: absolute;*/
/*  top: 0;*/
/*  left: 0;*/
/*  width: 100%;*/
/*  height: 100%;*/
/*  transform: translate(0, -100%);*/
/*}*/

</style>
