<template>
  <nav
      class="absolute top-5 mx-auto left-0 right-0 greamz-navbar"
      style="width: 70%; max-width: 70%; z-index: 45454543"
      v-if="$device.isDesktop"
  >
    <div class="xl:flex md:flex hidden rounded-md shadow-sm ">
      <NuxtLink to="/"
                class="btn border-0 bg-transparent hover:b  m-1 px-4 text-sm font-medium font-black text-white rounded-l-lg focus:z-10 focus:ring-2 focus:ring-blue-700 dark:focus:ring-blue-500">
        {{ $t("navbar.home") }}
      </NuxtLink>
      <div class="bg-transparent">
        <button
            type="button"
            @click.stop="showCategoryDropdown"
            class="btn border-0 bg-transparent  hover:b  m-1 px-4 text-sm font-medium font-black text-white rounded-l-lg focus:z-10 focus:ring-2 focus:ring-blue-700 dark:focus:ring-blue-500"
        >
          {{ $t("navbar.categories") }}
        </button>

      </div>
      <NuxtLink to="/"
                class="btn border-0 bg-transparent hover:b  m-1 px-4 text-sm font-medium font-black text-white rounded-l-lg focus:z-10 focus:ring-2 focus:ring-blue-700 dark:focus:ring-blue-500">
        Point shop
      </NuxtLink>
      <div class="ml-auto my-2 mr-2 w-[340px]">
        <div class="relative">
          <input v-model="inputValue" type="search" id="default-search"
                 class="block w-full  pr-11 text-sm text-gray-900 border rounded bg-gray-50 focus:ring-blue-500 focus:border-blue-500 bg-gray-700 border-gray-600 placeholder-gray-400 text-white "
                 placeholder="search" required>
          <button type="submit"
                  @click="routeSearch()"
                  class="text-white absolute inset-y-0 right-0 rounded-r flex items-center pr-3 bg- bg-blue-800  font-medium text-sm px-4 py-2 ">
            <svg class="w-4 h-4 text-white " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                 viewBox="0 0 20 20">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
            </svg>
          </button>
          <div v-if="searchResults && searchResults.length>0"
               class="absolute bottom--1 z-30 h-[400px] overflow-y-auto w-full">
            <LazyGameCardSearch v-for="item in searchResults" :item="item"/>
          </div>
        </div>

      </div>
    </div>
    <ul ref="categoriesEl" v-show="showCategoriesDropdown"
        class="absolute p-2 left-0 right-0 shadow rounded-box flex flex-row  justify-center "
        style="background: linear-gradient(90deg, rgba(33, 162, 255, 0.1) 1.89%, rgba(50, 50, 51, 0) 50%), linear-gradient(180deg, #575860 11.6%, #3A4852 54.73%, #2C2D34 100%); ">
      <lazy-client-only>
        <li class="">
          <div class="p-4 pb-0 text-gray-900 md:pb-4 dark:text-white w-auto">
            <span class="font-bold text-[1.2rem] text-white text-center mx-auto">Special sections</span>
            <div class="flex flex-col gap-4 pt-3">
              <suspense>
                <NuxtLink :to="'/search?categories='+gen.id" v-for="gen in categories.SPECIAL_SECTIONS"
                          class="text-[12px]  text-[#94a3b8] hover:text-blue-600" style="word-wrap: break-word;">
                  {{ gen.name }}
                </NuxtLink>
                <template #fallback>
                  <n-spin size="medium"/>
                </template>
              </suspense>
            </div>
          </div>
        </li>
        <li class="">
          <div class="p-4 pb-0 text-gray-900 md:pb-4 dark:text-white w-auto">
            <span class="font-bold text-[1.2rem] text-white text-center mx-auto">Genres</span>
            <div class="grid grid-cols-3 gap-2 pt-3">
              <suspense>
                <NuxtLink :to="'/search?categories='+gen.id" v-for="gen in categories.GENRES"
                          class="text-[12px] text-[#94a3b8] hover:text-blue-600" style="word-wrap: break-word;">
                  {{ gen.name }}
                </NuxtLink>
                <template #fallback>
                  <n-spin size="medium"/>
                </template>
              </suspense>
            </div>
          </div>
        </li>
        <li class="">
          <div class="p-4 pb-0 text-gray-900 md:pb-4 dark:text-white w-auto">
            <span class="font-bold text-[1.2rem] text-white text-center mx-auto">Themes</span>
            <div class="flex flex-col gap-3 pt-3">
              <suspense>
                <NuxtLink :to="'/search?categories='+gen.id" v-for="gen in categories.THEMES"
                          class="text-[12px] text-[#94a3b8] hover:text-blue-600">
                  {{ gen.name }}
                </NuxtLink>
                <template #fallback>
                  <n-spin size="medium"/>
                </template>
              </suspense>
            </div>
          </div>
          <div class="p-4 pb-0 text-gray-900 md:pb-4 dark:text-white w-auto">
            <span class="font-bold text-[1.2rem] text-white text-center mx-auto">Player support</span>
            <div class="flex flex-col gap-3 pt-3">
              <suspense>
                <NuxtLink :to="'/search?categories='+gen.id" v-for="gen in categories.PLAYER_SUPPORT"
                          class="text-[12px] text-[#94a3b8] hover:text-blue-600" style="word-wrap: break-word;">
                  {{ gen.name }}
                </NuxtLink>
                <template #fallback>
                  <n-spin size="medium"/>
                </template>
              </suspense>
            </div>
          </div>
        </li>
      </lazy-client-only>
    </ul>
  </nav>
  <n-drawer class="bg-[#171a21]"  v-model:show="drawerActive"  placement="left" >
    <n-drawer-content >
      <template #header>
        <NuxtLink exact-active-class="g2398f238fh8392gy8u34fgyuw3rg" to="/" title="home" class="flex items-center border-0 text-white">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 16 16"><g fill="currentColor"><path d="M.329 10.333A8.01 8.01 0 0 0 7.99 16C12.414 16 16 12.418 16 8s-3.586-8-8.009-8A8.006 8.006 0 0 0 0 7.468l.003.006l4.304 1.769A2.198 2.198 0 0 1 5.62 8.88l1.96-2.844l-.001-.04a3.046 3.046 0 0 1 3.042-3.043a3.046 3.046 0 0 1 3.042 3.043a3.047 3.047 0 0 1-3.111 3.044l-2.804 2a2.223 2.223 0 0 1-3.075 2.11a2.217 2.217 0 0 1-1.312-1.568L.33 10.333Z"/><path d="M4.868 12.683a1.715 1.715 0 0 0 1.318-3.165a1.705 1.705 0 0 0-1.263-.02l1.023.424a1.261 1.261 0 1 1-.97 2.33l-.99-.41a1.7 1.7 0 0 0 .882.84Zm3.726-6.687a2.03 2.03 0 0 0 2.027 2.029a2.03 2.03 0 0 0 2.027-2.029a2.03 2.03 0 0 0-2.027-2.027a2.03 2.03 0 0 0-2.027 2.027Zm2.03-1.527a1.524 1.524 0 1 1-.002 3.048a1.524 1.524 0 0 1 .002-3.048Z"/></g></svg>
          <span class="text-2xl font-bold ms-2">Steam</span>
        </NuxtLink>
      </template>
<!--      Search-->
      <div class="relative">
        <input v-model="inputValue" type="search" id="default-search"
               class="block w-full  pr-11 text-sm text-gray-900 border rounded bg-gray-50 focus:ring-blue-500 focus:border-blue-500 bg-gray-700 border-gray-600 placeholder-gray-400 text-white "
               placeholder="search" required>
        <button type="submit"
                @click="routeSearch()"
                class="text-white absolute inset-y-0 right-0 rounded-r flex items-center pr-3 bg- bg-blue-800  font-medium text-sm px-4 py-2 ">
          <svg class="w-4 h-4 text-white " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
               viewBox="0 0 20 20">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
          </svg>
        </button>
        <div v-if="searchResults && searchResults.length>0"
             class="absolute bottom--1 z-30 h-[400px] overflow-y-auto w-full">
          <LazyGameCardSearch v-for="item in searchResults" :item="item"/>
        </div>
      </div>
      <n-collapse class="mt-3"  :default-expanded-names="'Categories'">
        <n-collapse-item name="Categories" class="text-white" >
          <template #header>
            <span class="font-bold text-[1.2rem] text-white">{{ $t('navbar.categories') }}</span>
          </template>
          <n-collapse>
            <n-collapse-item name="Genres"  >
              <template #header>
                <span class="font-bold text-[1rem] text-white">Genres</span>
              </template>
              <div class="max-h-[260px] overflow-y-auto">
                <div v-for="gen in categories.GENRES" :key="gen.id" >
                  <NuxtLink :to="'/search?categories='+gen.id" class="text-[12px] text-[#94a3b8] hover:text-blue-600">
                    {{ gen.name }}
                  </NuxtLink>
                </div>
              </div>

            </n-collapse-item>
            <n-collapse-item name="Special sections"  >
              <template #header>
                <span class="font-bold text-[1rem] text-white">Special sections</span>
              </template>
              <div class="max-h-[260px] overflow-y-auto">
                <div v-for="gen in categories.SPECIAL_SECTIONS" :key="gen.id" >
                  <NuxtLink :to="'/search?categories='+gen.id" class="text-[12px] text-[#94a3b8] hover:text-blue-600">
                    {{ gen.name }}
                  </NuxtLink>
                </div>
              </div>
            </n-collapse-item>
            <n-collapse-item name="Themes">
              <template #header>
                <span class="font-bold text-[1rem] text-white">Themes</span>
              </template>
              <div  class="max-h-[260px] overflow-y-auto">
                <div v-for="gen in categories.THEMES" :key="gen.id" >
                  <NuxtLink :to="'/search?categories='+gen.id" class="text-[12px] text-[#94a3b8] hover:text-blue-600">
                    {{ gen.name }}
                  </NuxtLink>
                </div>

              </div>
            </n-collapse-item>
            <n-collapse-item name="Player support" >
              <template #header>
                <span class="font-bold text-[1rem] text-white">Player support</span>
              </template>
              <div class="max-h-[260px] overflow-y-auto">
                <div v-for="gen in categories.PLAYER_SUPPORT" :key="gen.id" >
                  <NuxtLink :to="'/search?categories='+gen.id" class="text-[12px] text-[#94a3b8] hover:text-blue-600">
                    {{ gen.name }}
                  </NuxtLink>
                </div>
              </div>
            </n-collapse-item>
          </n-collapse>

        </n-collapse-item>

      </n-collapse>
    </n-drawer-content>
<!--    Categories-->

  </n-drawer>
</template>
<script setup>
const {isDesktop}=useDevice()
const inputValue = ref("");
const searchResults = ref(null);
watch([inputValue], () => {
  search()
})
const showCategoriesDropdown = ref(false);
const drawerActive = useState('drawerSide',()=>!isDesktop);

const search = async () => {
  if (inputValue.value === "") {
    searchResults.value = null
    return
  }
  const {data} = await useFetch(`/api/server/v1/game/search?term=${inputValue.value}&size=6`, {
    method: "GET",
    pick: ["content"]
  })
  if (data.value) {
    searchResults.value = data.value.content
  }
};
const routeSearch = () => {
  if (inputValue.value === "") {
    return
  }
  useRouter().push({path: "/search", query: {q: inputValue.value}})
}
const categories = reactive({
  GENRES: [],
  SPECIAL_SECTIONS: [],
  THEMES: [],
  PLAYER_SUPPORT: []

})
await useFetch(`/api/server/v1/category/findAllFromClient`, {
  method: 'GET',
  transform: (data) => {
    categories.GENRES = data.filter((category) => category.categoryTypes === "GENRES").sort((a, b) => a.name.localeCompare(b.name))
    categories.SPECIAL_SECTIONS = data.filter((category) => category.categoryTypes === "SPECIAL_SECTIONS").sort((a, b) => a.name.localeCompare(b.name))
    categories.THEMES = data.filter((category) => category.categoryTypes === "THEMES").sort((a, b) => a.name.localeCompare(b.name))
    categories.PLAYER_SUPPORT = data.filter((category) => category.categoryTypes === "PLAYER_SUPPORT").sort((a, b) => a.name.localeCompare(b.name))
  },
  immediate: true
})
const showCategoryDropdown = () => {
  showCategoriesDropdown.value = !showCategoriesDropdown.value

}
const categoriesEl = ref(null)
onClickOutside(categoriesEl, event => showCategoriesDropdown.value = false)
</script>

<style scoped>
.greamz-navbar {
  backdrop-filter: blur(60px) saturate(100%);
  background-color: transparent;
  z-index: 1;
}

.greamz-navbar-item:hover {
  cursor: pointer;
}
</style>
