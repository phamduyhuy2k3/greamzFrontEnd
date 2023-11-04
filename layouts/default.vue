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
  <main  class=" pb-6"  >
<!--    <div  class="fixed bottom-6 end-10 group" style="z-index: 757">-->
<!--      <button type="button" @click="main.scrollTop=0"  aria-expanded="false" class="flex items-center justify-center text-white bg-blue-700 rounded-full w-14 h-14 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 focus:outline-none dark:focus:ring-blue-800">-->

<!--        <svg  class="rotate-180 transition-transform w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 14">-->
<!--          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 1v12m0 0 4-4m-4 4L1 9"/>-->
<!--        </svg>-->
<!--        <span class="sr-only">Scroll to top</span>-->
<!--      </button>-->
<!--    </div>-->
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
