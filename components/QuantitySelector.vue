<template>
  <div class="inline-flex flex-col items-center">
    <div class="flex border border-[#d1d5db] rounded-md">
      <SfButton
          variant="tertiary"
          :disabled="isDisabled&& item.quantity <= min"
          square
          class="rounded-r-none"
          :aria-controls="inputId"
          aria-label="Decrease value"
          @click="decreaseQuantity()"
      >
        <SfIconRemove/>
      </SfButton>
      <input
          :id="inputId"
          v-model="item.quantity"
          type="number"
          class="appearance-none mx-2 w-[50px] text-center bg-transparent font-medium [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-inner-spin-button]:display-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-outer-spin-button]:display-none [&::-webkit-outer-spin-button]:m-0 [-moz-appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none disabled:placeholder-disabled-900 focus-visible:outline focus-visible:outline-offset focus-visible:rounded-sm"
          :min="min"
          :max="max"
          @input="handleOnChange"
      />
      <SfButton
          variant="tertiary"
          :disabled="item.quantity >= max"
          square
          class="rounded-l-none"
          :aria-controls="inputId"
          aria-label="Increase value"
          @click="item.quantity++"
      >
        <SfIconAdd/>
      </SfButton>
    </div>
    <p class="text-xs mt-2 text-neutral-500">
      <strong class="text-[#d4d4d8]">{{ max }}</strong> in stock
    </p>
  </div>
</template>

<script setup lang="ts">
import {SfButton, SfIconAdd, SfIconRemove, useId} from '@storefront-ui/vue';
import {clamp} from '@storefront-ui/shared';
import {useCounter} from '@vueuse/core';
import Swal from "sweetalert2";
const {item} = defineProps({
  isDisabled: {
    type: Boolean,
    default: true,
  },
  item: {
    type: Object,
    required: true,
  },
});
const min = ref(1);
const max = ref(item.stock);
const inputId = useId();
const {  set} = useCounter(item.quantity, {min: min.value, max: max.value});
const decreaseQuantity = () => {
  item.quantity--;

  if(item.quantity <min.value){
    Swal.fire({
      title: "Remove this item?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, remove it!"
    }).then((result) => {
      if (result.isConfirmed) {
        useCart().removeFromCart(item,false);
      }else {
        item.quantity=1;
      }
    });
  }
};
function handleOnChange(event: Event) {
  const currentValue = (event.target as HTMLInputElement)?.value;
  const nextValue = parseFloat(currentValue);
  if(item.quantity >=item.stock){
    item.quantity=item.stock;
  }else if(item.quantity <=min.value){
    Swal.fire({
      title: "Remove this item?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, remove it!"
    }).then((result) => {
      if (result.isConfirmed) {
        useCart().removeFromCart(item,false);
      }else {
        item.quantity=1;
      }
    });

  }
  set(clamp(nextValue, min.value, max.value));
}

</script>

<style scoped>

</style>