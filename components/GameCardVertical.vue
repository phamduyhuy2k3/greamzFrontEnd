<template>
  <div class="rounded-md hover:shadow-lg xl:md:max-w-[400px] sm:max-w-[460px] max-w-[510px]">
    <div class="relative">
      <SfLink href="#" class="block ">
        <img
            src="/img/capsule_616x353 (5).jpg"
            alt="Great product"
            class="rounded-md"
            height="150"
            width="510"
        />
      </SfLink>
      <div class="absolute bottom-0 left-0 discount  border-transparent ">
        <SfIconSell size="xs" class="mr-1" />
        -81%
      </div>
    </div>
    <div class="flex justify-between text-white">
      <div class="text-[1.2rem]">
        sdasdd
      </div>
      <div class="text-[1.2rem]">
        sadsadsad
      </div>
    </div>

  </div>
</template>

<script lang="ts" setup>
import { SfLink, SfIconSell } from "@storefront-ui/vue";
</script>
<style>
.discount {
  font-weight: 700;
  background-color: #ff346d;
  color: #fff;
  position: absolute;
  border-radius: 5px 5px 0;
  padding: 5px 6px 6px 7px;
  z-index: 2;
}
.discount:after {
  transform: skewX(16deg);
  width: 100%;
  border-radius: 6px 3px;
  content: "";
  position: absolute;
  background-color: #ff346d;
  top: 0;
  bottom: 0;
  right: -4px;
  z-index: -1;
}
</style>