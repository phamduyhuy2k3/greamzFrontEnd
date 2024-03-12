<template>
  <div class="rounded-lg bg-transparent flex flex-col justify-center items-center overflow-x-auto"  v-if="data?.content" >
    <template v-if="!toggleModalOrderDetail">
      <fieldset class="mr-auto overflow-x-auto">
        <legend class="text-[1.2rem]">Orders status</legend>
        <n-select
            filterable
            v-model:value="status"
            placeholder="Sort by"
            :clear-filter-after-select="false"
            :options="statues"
            @update:value="onSelectStatus()"

        />
      </fieldset>
      <n-table :single-line="false" v-if="data?.content" class="w-full text-sm text-left overflow-x-auto  text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 overflow-x-auto">
        <tr>
          <th scope="col" class="px-6 py-3">
            Order id
          </th>
          <th scope="col" class="px-6 py-3">
            Total price
          </th>
          <th scope="col" class="px-6 py-3">
            Payment method
          </th>
          <th scope="col" class="px-6 py-3">
            Status
          </th>
          <th scope="col" class="px-6 py-3">
            Created at
          </th>
          <th scope="col" class="px-6 py-3">
            Action
          </th>
        </tr>
        </thead>
        <tbody class="overflow-x-auto">
        <tr v-for="order in data?.content" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 overflow-x-auto">
          <!--          <td class="w-4 p-4">-->
          <!--            <div class="flex items-center">-->
          <!--              <input id="checkbox-table-search-1" type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">-->
          <!--              <label for="checkbox-table-search-1" class="sr-only">checkbox</label>-->
          <!--            </div>-->
          <!--          </td>-->
          <th scope="row" class="px-6 py-4 font-medium text-gray-900  dark:text-white truncate">
            {{ order.id }}
          </th>
          <td class="px-6 py-4">
            {{ $currency(order.totalPrice) }}
          </td>
          <td class="px-6 py-4">
            {{ order.paymentmethod }}
          </td>
          <td class="px-6 py-4">
            {{ order.ordersStatus }}
          </td>
          <td class="px-6 py-4">
            {{ formatDate(order.createdOn) }}
          </td>
          <td class="px-6 py-4">
            <a @click="handleToggleModalOrderDetail(order.id)" class="cursor-pointer font-medium text-blue-600 dark:text-blue-500 hover:underline">View</a>
          </td>
        </tr>
        </tbody>
      </n-table>
      <Pagination class="w-full py-4" :totalPages="data?.totalPages" :current-page="data?.number"  @page-changed="onPageAndSizeChange" :size-current-page="data?.size" />
    </template>

    <template v-else>
      <div class="flex justify-between flex-wrap w-full items-center">
        <button class="flex justify-center items-center bg-gray-700 p-2 mb-3 mr-auto"  @click="toggleModalOrderDetail=false">
          Back
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="M21 11H6.83l3.58-3.59L9 6l-6 6l6 6l1.41-1.41L6.83 13H21v-2z"/></svg>
        </button>
        <div class="flex flex-col ">
          <div>
            <h3>Order id: <strong>{{orderCurrent.id}}</strong></h3>
          </div>
          <div>
            <h3>Payment method: <strong>{{orderCurrent.paymentmethod}}</strong></h3>
          </div>
          <div>
            <h3>Order status:
              <span class=""
                :class="{
                'text-[#dc2626]': orderCurrent.ordersStatus==='FAILED',
                'text-[#22c55e]': orderCurrent.ordersStatus==='SUCCESS',
                'text-[#fde047]': orderCurrent.ordersStatus==='CANCELLED',
                'text-[#3b82f6]': orderCurrent.ordersStatus==='PROCESSING'
              }">
              {{orderCurrent.ordersStatus}}
              </span></h3>
          </div>
          <div>
            <h3>Created at: <strong>{{formatDate(orderCurrent.createdAt)}}</strong></h3>
          </div>
          <div>
            <h3>Total price: <strong>{{$currency(orderCurrent.totalPrice)}}</strong></h3>
          </div>
        </div>
      </div>

      <OrderDetail :order-data="orderDetail" :order-current="orderCurrent" />
    </template>

  </div>
  <div v-else-if="data?.content.length<=0" class="rounded-lg bg-transparent flex justify-center items-center"  >
    <span class="text-2xl">No orders</span>
  </div>
  <div v-if="pending" class="rounded-lg bg-transparent flex justify-center items-center "  >
    <span  class="loading loading-dots loading-lg text-center mx-auto"></span>
  </div>

</template>

<script setup>
definePageMeta({

  breadcrumb: "Your orders",
  middleware: ['auth']
});
const sort= ref('createdAt')
const router= useRouter()
const status=ref(useRoute().query.orderStatus?useRoute().query.orderStatus: 'SUCCESS')
console.log(useRoute().query.orderStatus)
const statues=[
  {
    value: 'ALL',
    label: 'All'
  },
  {
    value:'SUCCESS',
    label:'Success'
  },
  {
    value:'FAILED',
    label:'Failed'
  },
  {
    value:'CANCELLED',
    label:'Cancelled'
  },
  {
    value:'PROCESSING',
    label:'Processing'
  }
]
console.log(status.value)
const {data,pending,execute }=await useAsyncData(`order_`+Math.random()*1000,
    ()=>
        $fetch(`/api/server/v1/order/status/${status.value}?page=${useRoute().query.page | 0}&size=${useRoute().query.size |10}`,{
          headers:{
            Authorization: `Bearer`
          },
          method:'GET',

        })
)
const toggleModalOrderDetail=ref(false)
const orderDetail=ref(null)
const orderCurrent=ref(null)
const handleToggleModalOrderDetail=async (id)=>{
  const {data, pending:pendingDetail,execute } = await useAsyncData('orderDetail' + id, () =>
      $fetch(`/api/server/v1/order/${id}/detail`, {
        headers: {
          'Authorization': `Bearer`
        },
        method: 'GET'

      })
  )
  pending.value=pendingDetail
  if(data.value){
    orderDetail.value=data.value.orderDetail
    console.log(data.value.orderDetail)
    orderCurrent.value=data.value.order
    pending.value=false
  }
  toggleModalOrderDetail.value=!toggleModalOrderDetail.value
}
const onSelectStatus=async ()=>{
  await router.push({
    path: '/dash-board/orders/',
    query: {
      ...useRoute().query,
      orderStatus: status.value
    }
  })
  await execute().then(() => {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  })
}
const onPageAndSizeChange=async (page,size) => {
  await router.push({
    path: '/dash-board/orders/',
    query: {
      ...useRoute().query,
      page: page,
      size: size
    }
  })
  await execute().then(() => {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  })
}

</script>

<style scoped>

</style>