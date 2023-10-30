<template>
  <nav
    class="absolute top-5 mx-auto left-0 right-0 greamz-navbar"
    style="width: 70%; max-width: 70%"
  >
    <div  class="md:flex hidden rounded-md shadow-sm ">
      <div data-dropdown-toggle="dropdownStore"
           data-dropdown-trigger="hover"
           data-dropdown-delay="50"
          class="py-2 greamz-navbar-item"
      >
        <a
            id="navHome"

            class="px-4 text-sm font-medium font-black text-white rounded-l-lg focus:z-10 focus:ring-2 focus:ring-blue-700 dark:focus:ring-blue-500"
        >
          Your Store
        </a>
        <div
            id="dropdownStore"
            class="z-10 hidden font-normal bg-white rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600 "
        >
          <ul class="py-2 text-sm text-gray-700 dark:text-gray-400">
            <li>
              <a
                  href="#"
                  class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >Home</a
              >
            </li>
            <li>
              <a
                  href="#"
                  class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >Recently viewed</a
              >
            </li>
          </ul>

        </div>
      </div>
      <div
          data-dropdown-toggle="dropdownCategories"
          data-dropdown-trigger="hover"
          data-dropdown-delay="50"
          class="py-2 greamz-navbar-item"
      >
        <a
            id="navCategories"

            class="px-4 text-sm font-medium font-black text-white rounded-l-lg focus:z-10 focus:ring-2 focus:ring-blue-700 dark:focus:ring-blue-500"
        >
          Categories
        </a>
        <div id="dropdownCategories" class="absolute z-10 grid hidden w-auto grid-cols-2 text-sm bg-white border border-gray-100 rounded-lg shadow-md dark:border-gray-700 md:grid-cols-3 dark:bg-gray-700">
          <div class="p-4 pb-0 text-gray-900 md:pb-4 dark:text-white" >
            <ul class="space-y-4" aria-labelledby="mega-menu-icons-dropdown-button">
              <li>
                <a href="#" class="flex items-center text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-500 group">
                  About Us
                </a>
              </li>

            </ul>
          </div>

        </div>
      </div>
      <div
          data-dropdown-toggle="dropdownPoint"
          data-dropdown-trigger="hover"
          data-dropdown-delay="50"
          class="py-2 greamz-navbar-item"
      >
        <a
            id="navPoint"
            class="px-4 text-sm font-medium font-black text-white rounded-l-lg focus:z-10 focus:ring-2 focus:ring-blue-700 dark:focus:ring-blue-500"
        >
          Point shop
        </a>
        <div
            id="dropdownPoint"
            class="z-10 hidden font-normal bg-white rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600 top-0"
        >
          <ul class="py-2 text-sm text-gray-700 dark:text-gray-400">
            <li>
              <a
                  href="#"
                  class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >Dashboard</a
              >
            </li>
            <li>
              <a
                  href="#"
                  class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >Settings</a
              >
            </li>
            <li>
              <a
                  href="#"
                  class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >Earnings</a
              >
            </li>
          </ul>
          <div class="py-1">
            <a
                href="#"
                class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-400 dark:hover:text-white"
            >Sign out</a
            >
          </div>
        </div>
      </div>
      <div class="ml-auto my-2 mr-2">
          <div class="relative">
            <input @input="search()" v-model="inputValue" type="search" id="default-search" class="block w-full  pr-11 text-sm text-gray-900 border rounded bg-gray-50 focus:ring-blue-500 focus:border-blue-500 bg-gray-700 border-gray-600 placeholder-gray-400 text-white " placeholder="search" required>
            <button type="submit" class="text-white absolute inset-y-0 right-0 rounded-r flex items-center pr-3 bg- bg-blue-800  font-medium text-sm px-4 py-2 ">
              <svg class="w-4 h-4 text-white " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
            </svg>
            </button>
<!--            <div v-if="searchResults && inputValue.value != ''" class="absolute bottom&#45;&#45;1 z-30 text-white ">-->

<!--            </div>-->
          </div>

      </div>
    </div>

  </nav>
</template>

<script setup>

const inputValue = ref("");
const searchResults = ref(null);

const search =async () => {
searchResults.value=inputValue.value
  console.log(searchResults.value)
};
const {categories}=useCategory()
const GENRES= categories.filter((category)=>category.categoryTypes=="GENRES").map((category)=>{
  category.categoryTypes='Genres'
})
const SPECIAL_SECTIONS= categories.filter((category)=>category.categoryTypes=="SPECIAL_SECTIONS").map((category)=>{
  category.categoryTypes='Special Sections'
})
const THEMES= categories.filter((category)=>category.categoryTypes=="THEMES").map((category)=>{
  category.categoryTypes='Themes'
})
const PLAYER_SUPPORT= categories.filter((category)=>category.categoryTypes=="PLAYER_SUPPORT").map((category)=>{
  category.categoryTypes='Player Support'
})
</script>

<style scoped>
.greamz-navbar{
  backdrop-filter: blur(60px) saturate(100%);
  background-color: transparent;
}
.greamz-navbar-item:hover{
  cursor: pointer;
}
</style>
