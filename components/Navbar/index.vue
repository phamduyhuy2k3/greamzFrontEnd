<template>
  <nav
      class="absolute top-5 mx-auto left-0 right-0 greamz-navbar"
      style="width: 70%; max-width: 70%"
  >
    <div class="xl:flex md:flex hidden rounded-md shadow-sm ">
      <NuxtLink to="/"
                class="btn border-0 bg-transparent hover:b  m-1 px-4 text-sm font-medium font-black text-white rounded-l-lg focus:z-10 focus:ring-2 focus:ring-blue-700 dark:focus:ring-blue-500">
        {{ $t("navbar.home") }}
      </NuxtLink>
      <div class="dropdown dropdown-hover bg-transparent dropdown-bottom">
        <label tabindex="0"
               data-collapse-toggle="mega-menu-full-dropdown"
               data-dropdown-trigger="hover"
               class="btn border-0 bg-transparent  hover:b  m-1 px-4 text-sm font-medium font-black text-white rounded-l-lg focus:z-10 focus:ring-2 focus:ring-blue-700 dark:focus:ring-blue-500"
               aria-controls="mega-menu-full-dropdown" aria-expanded="false"

        >
          {{ $t("navbar.categories") }}
        </label>

      </div>
      <NuxtLink to="/pointshop"
                class="btn border-0 bg-transparent hover:b  m-1 px-4 text-sm font-medium font-black text-white rounded-l-lg focus:z-10 focus:ring-2 focus:ring-blue-700 dark:focus:ring-blue-500">
        Point shop
      </NuxtLink>
      <div class="ml-auto my-2 mr-2 w-[340px]">
        <div class="relative">
          <input  v-model="inputValue" type="search" id="default-search"
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
    <ul id="mega-menu-full-dropdown"   class="hidden absolute p-2 left-0 right-0 shadow rounded-box flex flex-row  justify-center "
        style="background: linear-gradient(90deg, rgba(33, 162, 255, 0.1) 1.89%, rgba(50, 50, 51, 0) 50%), linear-gradient(180deg, #575860 11.6%, #3A4852 54.73%, #2C2D34 100%);">
      <li class="">
        <div class="p-4 pb-0 text-gray-900 md:pb-4 dark:text-white w-auto">
          <span class="font-bold text-[1.2rem] text-white text-center mx-auto">Special sections</span>
          <div class="flex flex-col gap-4 pt-3">
            <NuxtLink :to="'/search?categories='+gen.id" v-for="gen in SPECIAL_SECTIONS"
                      class="text-[12px]  text-[#94a3b8] hover:text-blue-600" style="word-wrap: break-word;">
              {{ gen.name }}
            </NuxtLink>
          </div>
        </div>
      </li>
      <li class="">
        <div class="p-4 pb-0 text-gray-900 md:pb-4 dark:text-white w-auto">
          <span class="font-bold text-[1.2rem] text-white text-center mx-auto">Genres</span>
          <div class="grid grid-cols-3 gap-2 pt-3">
            <NuxtLink :to="'/search?categories='+gen.id" v-for="gen in GENRES"
                      class="text-[12px] text-[#94a3b8] hover:text-blue-600" style="word-wrap: break-word;">
              {{ gen.name }}
            </NuxtLink>
          </div>
        </div>
      </li>

      <li class="">
        <div class="p-4 pb-0 text-gray-900 md:pb-4 dark:text-white w-auto">
          <span class="font-bold text-[1.2rem] text-white text-center mx-auto">Themes</span>
          <div class="flex flex-col gap-3 pt-3">
            <NuxtLink :to="'/search?categories='+gen.id" v-for="gen in THEMES"
                      class="text-[12px] text-[#94a3b8] hover:text-blue-600">
              {{ gen.name }}
            </NuxtLink>
          </div>
        </div>
        <div class="p-4 pb-0 text-gray-900 md:pb-4 dark:text-white w-auto">
          <span class="font-bold text-[1.2rem] text-white text-center mx-auto">Player support</span>
          <div class="flex flex-col gap-3 pt-3">
            <NuxtLink :to="'/search?categories='+gen.id" v-for="gen in PLAYER_SUPPORT"
                      class="text-[12px] text-[#94a3b8] hover:text-blue-600" style="word-wrap: break-word;">
              {{ gen.name }}
            </NuxtLink>
          </div>
        </div>
      </li>

    </ul>
  </nav>

</template>

<script setup>
const inputValue = ref("");
const searchResults = ref(null);
const isMobile = useState('isMobile')
watch([inputValue], () => {
  search()
})
const search = async () => {
  if (inputValue.value === "") {
    searchResults.value = null
    return
  }
  await useFetch(`${useRuntimeConfig().public.apiUrl}/api/v1/game/search?term=${inputValue.value}&size=6`, {
    method: "GET",
    transform: (data)=>{
      searchResults.value = data.content
    }
  })
};
const routeSearch=()=>{
  if (inputValue.value === "") {
    return
  }
  useRouter().push({path:"/search",query:{q:inputValue.value}})
}
const GENRES = ref([])
const SPECIAL_SECTIONS = ref([])
const THEMES = ref([])
const PLAYER_SUPPORT = ref([])
onMounted(() => {
  useCategory().fetch().then(() => {
    const categories = useCategory().getCategories
    GENRES.value = categories.filter((category) => category.categoryTypes === "GENRES")
    SPECIAL_SECTIONS.value = categories.filter((category) => category.categoryTypes === "SPECIAL_SECTIONS")
    THEMES.value = categories.filter((category) => category.categoryTypes === "THEMES")
    PLAYER_SUPPORT.value = categories.filter((category) => category.categoryTypes === "PLAYER_SUPPORT")
  })

})

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
