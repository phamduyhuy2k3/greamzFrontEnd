<template>
  <div class="rounded-lg bg-transparent flex flex-col justify-center items-center" v-if="data?.content" >
    <template v-if="!toggleModalOrderDetail">

      <n-table :single-line="false" v-if="data?.content" class="w-full text-sm text-left  text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          <th scope="col" class="">
          </th>
          <th scope="col" class="px-6 py-3">
            Name
          </th>
          <th scope="col" class="px-6 py-3">
            Total activate codes
          </th>
          <th scope="col" class="px-6 py-3">
            Action
          </th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="game in data?.content" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
          <!--          <td class="w-4 p-4">-->
          <!--            <div class="flex items-center">-->
          <!--              <input id="checkbox-table-search-1" type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">-->
          <!--              <label for="checkbox-table-search-1" class="sr-only">checkbox</label>-->
          <!--            </div>-->
          <!--          </td>-->
          <td class="flex items-center justify-center">
            <img class="w-20 h-10" :src="game.header_image" :alt="`orderDetail_${game.appid}`">
          </td>
          <td class="px-6 py-4">
            {{ game.name }}
          </td>
          <td class="px-6 py-4">
            {{ game.totalQuantity }}
          </td>

          <td class="px-6 py-4">
            <a @click="handleToggleModalGame(game)" class="cursor-pointer font-medium text-blue-600 dark:text-blue-500 hover:underline">View</a>
          </td>
        </tr>
        </tbody>
      </n-table >
      <Pagination class="w-full py-4" :totalPages="data?.totalPages" :current-page="data?.number"  @page-changed="onPageAndSizeChange" :size-current-page="data?.size" />
    </template>

    <template v-else>
      <button class="flex justify-center items-center bg-gray-700 p-2 mb-3 mr-auto"  @click="toggleModalOrderDetail=false">
        Back
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="M21 11H6.83l3.58-3.59L9 6l-6 6l6 6l1.41-1.41L6.83 13H21v-2z"/></svg>
      </button>
      <div class="flex flex-wrap justify-center w-full items-center">

        <div class="flex flex-col items-center justify-center">
          <div>
            <img class="w-48 h-24" :src="gameCodes.game.header_image">
          </div>
          <div>
            <h3>Name: <strong>{{gameCodes.game.name}}</strong></h3>
          </div>

        </div>
      </div>

      <n-table :single-line="false" class="">

        <thead class="">
        <tr>

          <th scope="col" class="">
            #
          </th>
          <th scope="col" class="">
            Codes
          </th>
          <th scope="col" class="">
            Platform
          </th>
          <th scope="col" class="">
            Is code active
          </th>
          <th scope="col" class="" >
            Action
          </th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(gc,index) in gameCodes.codeActive" :key="gc.index"
            class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
          <td class="flex items-center justify-center">
            {{ index+1 }}
          </td>
          <th scope="row" class="font-medium text-gray-900 whitespace-nowrap dark:text-white">
            <CodeToggle :code="gc.code"></CodeToggle>
          </th>
          <th scope="row" class="font-medium text-gray-900 whitespace-nowrap dark:text-white">
            {{gc.platform.name}}
          </th>
          <th scope="row" class="font-medium text-gray-900 whitespace-nowrap dark:text-white">

            <n-switch v-model:value="gc.active" disabled  />
          </th>
          <td class="px-6 py-4" >
            <a @click.stop.prevent="handleCoppy(gc.code)" class="p-2 cursor-pointer text-blue-600">
              Copy to clipboard
            </a>
          </td>

        </tr>
        </tbody>
      </n-table>
    </template>

  </div>
  <div v-else>
    You have no game in your library
  </div>
  <div v-if="pending" class="rounded-lg bg-transparent flex justify-center items-center "  >
    <span  class="loading loading-dots loading-lg text-center mx-auto"></span>
  </div>

</template>

<script setup>
definePageMeta({

  breadcrumb: "Your game library",
  middleware: ['auth']
});
import { useMessage } from 'naive-ui'
const message=useMessage()
const sort= ref('createdAt')
const router= useRouter()
const loading=ref(false)
const {data,pending,execute }=await useAsyncData(`gamelibray_`+Math.random()*1000,
    ()=>
        $fetch(`${useRuntimeConfig().public.apiUrl}/api/v1/order/game-library?page=${useRoute().query.page | 0}&size=${useRoute().query.size |10}`,{
          headers:{
            Authorization: `Bearer ${useAuthStore().token}`
          },
          method:'GET'
        })
)
const toggleModalOrderDetail=ref(false)
const { text, isSupported, copy } = useClipboard()
const gameCodes=ref(null)
const handleToggleModalGame=async (game)=>{
  toggleModalOrderDetail.value=!toggleModalOrderDetail.value
  // gameCodes.value={
  //   game: game,
  //   codes: Array.from({length: game.totalQuantity}, () => generateString(19))
  // }
  loading.value=true
  const {data,execute}=await useAsyncData(`gamelibrayCodes_`+Math.random()*1000,
      ()=>
          $fetch(`${useRuntimeConfig().public.apiUrl}/api/v1/codeActive/findAllByAccount_Id/${game.appid}`,{
            headers:{
              Authorization: `Bearer ${useAuthStore().token}`
            },
            method:'GET'
          })
  )
  if(data.value){
    console.log(data.value)
    gameCodes.value=data.value;
    loading.value=false
  }
}
const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
const handleCoppy=async (code)=>{
  await copy(code)
  message.success(
      "Copied to clipboard"
  )
}
function generateString(length) {
  let result = ' ';
  const charactersLength = characters.length;
  for ( let i = 0; i < length; i++ ) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
}
const onPageAndSizeChange=async (page,size) => {
  await router.push({
    path: '/dash-board/game-library/',
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