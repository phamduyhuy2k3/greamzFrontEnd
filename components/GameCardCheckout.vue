<template>

  <div class="overflow-x-auto border-b-[1px] bg-[#1f254a] border-neutral-200 hover:shadow-lg p-4">
    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400 text-white">
      <thead class="text-xs uppercase bg-gray-700 text-gray-400">
      <tr>
        <th scope="col" class="sr-only">
        </th>
        <th scope="col" class="px-6 py-3">
          Product name
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
      <tbody>
      <tr class="text-[12px]  bg-gray-800 border-gray-700 hover:bg-gray-600">
        <td class="pl-1">
          <img :src="item.header_image" :alt="item.name" >
        </td>
        <th scope="row" class="px-6 py-4 font-bold text-white whitespace-nowrap truncate">
            {{item.name  }}
        </th>
        <td class="px-6 py-4">
          {{ $currency(item.price)}}
        </td>
        <td class="px-6 py-4">
          {{ item.quantity }}
        </td>
        <td class="px-6 py-4">
          {{ item.discount? item.discount +'%' : 'None' }}
        </td>
        <td class="px-6 py-4">
          {{ $currency(useCart().amtOf(item) )}}
        </td>
      </tr>

      </tbody>
    </table>
  </div>
</template>

<script lang="ts" setup>
import {SfLink, SfIconSell, SfIconDelete} from '@storefront-ui/vue';

const NuxtLink = resolveComponent("NuxtLink");
const {item} = defineProps({
  item: {
    type: Object,
    required: true,
  },
});
</script>
