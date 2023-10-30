<script setup>
import { IconFlagEN, IconFlagVN } from "#components";
const { setLocaleCookie, locale } = useI18n();
const localeCookie = useCookie("i18n_redirected");

const languages = [
  {
    text: "English (US)",
    iso: "en",
    icon: IconFlagEN,
  },
  {
    text: "VietNam (VN)",
    iso: "vi",
    icon: IconFlagVN,
  },
];
const language = shallowRef({
  text: "English (US)",
  iso: "en",
  icon: IconFlagEN,
});

const changeLanguage = (value) => {
  language.value = value;
  locale.value = value.iso;
  setLocaleCookie(locale.value);
};
const inputValue = ref("");

const search =async () => {

};


onMounted(() => {
  if (localeCookie.value) {
    console.log(localeCookie.value);
    const lang = languages.find((l) => l.iso === localeCookie.value);
    if (lang) {
      language.value = lang;
      locale.value = lang.iso;
    }
  }


});
</script>

<template>
  <nav class="bg-[#171a21] text-white w-full sticky top-0 left-0" style="z-index: 9" >
    <div  class="max-w-screen-xl flex items-center justify-start mx-auto p-4">
      <div class="flex">
        <button
          type="button"
          class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          data-drawer-target="drawer-navigation" data-drawer-show="drawer-navigation" aria-controls="drawer-navigation"
        >
          <span class="sr-only">Open main menu</span>
          <svg
            class="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>
      </div>
      <NuxtLink to="/" title="home" class="flex items-center ms-16 greamz-icon">

      </NuxtLink>

      <div  class="hidden w-full md:flex md:w-auto ms-16">
        <ul
          class="sm:hidden hidden md:flex p-4 md:p-0 mt-4 font-medium text-[1.3em] text-white md:flex-row md:space-x-4 md:mt-0"
        >
          <li>
            <NuxtLink
              to="/"
              class="block py-2 pl-3 pr-4 bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500"
              aria-current="page"
            >
              {{ $t("store") }}
            </NuxtLink>
          </li>
          <li>
            <NuxtLink
              to="#"
              class="block py-2 pl-3 pr-4 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
            >
              {{ $t("community") }}
            </NuxtLink>
          </li>
          <li>
            <NuxtLink
              href="#"
              class="block py-2 pl-3 pr-4 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
            >
              {{ $t("about") }}
            </NuxtLink>
          </li>
          <li>
            <NuxtLink
              href="#"
              class="block py-2 pl-3 pr-4 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
            >
              {{ $t("support") }}
            </NuxtLink>
          </li>
        </ul>
      </div>
      <nav class="ml-auto">
        <div class="flex flex-row flex-nowrap">
          <div>
            <NuxtLink to="/cart" type="button" class="inline-flex items-center font-medium justify-center px-4 py-2 text-sm text-gray-900 rounded-lg cursor-pointer hover:bg-[#0ea5e9] text-white">
              <IconCart/>
            </NuxtLink>
          </div>
          <div>
            <NuxtLink to="/login"  class="inline-flex items-center mr-2 font-medium justify-center px-4 py-2 text-sm text-gray-900 rounded-lg cursor-pointer hover:bg-[#0ea5e9] text-white">
              <IconUser/>
              <span  class="ml-2 hidden md:block">
                Sign in
              </span>
            </NuxtLink>
          </div>
          <div class="">
            <button
              type="button"
              data-dropdown-toggle="language-dropdown-menu"
              class="inline-flex items-center font-medium justify-center px-4 py-2 text-sm text-gray-900 dark:text-white rounded-lg cursor-pointer hover:bg-[#0ea5e9] dark:hover:text-white"
            >
              <span class="text-white">
                {{ language.text }}
              </span>
              <Component :is="language.icon" class="w-5 h-5 ml-2" />
              <svg
                class="w-2.5 h-2.5 ml-2.5 text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 10 6"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m1 1 4 4 4-4"
                />
              </svg>
            </button>
            <!-- Dropdown -->
            <div
              id="language-dropdown-menu"
              class="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700"
            >
              <ul class="py-2 font-medium" role="none">
                <template v-for="l in languages" :key="l.iso">
                  <li>
                    <a
                      href="#"
                      class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
                      role="menuitem"
                      @click="changeLanguage(l)"
                    >
                      {{ l.text }}
                      <div class="inline-flex items-center">
                        <Component :is="l.icon" />
                      </div>
                    </a>
                  </li>
                </template>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </div>
  </nav>
  <div  id="drawer-navigation" class="fixed top-0 left-0 z-40 h-screen p-4 overflow-y-auto transition-transform -translate-x-full  w-64 bg-gray-800 z-999" tabindex="-1" aria-labelledby="drawer-navigation-label">
    <h5 id="drawer-navigation-label" class="text-base font-semibold text-gray-500 uppercase dark:text-gray-400">Menu</h5>
    <button type="button" data-drawer-hide="drawer-navigation" aria-controls="drawer-navigation" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 absolute top-2.5 right-2.5 inline-flex items-center justify-center dark:hover:bg-gray-600 dark:hover:text-white" >
      <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
      </svg>
      <span class="sr-only">Close menu</span>
    </button>
    <div class="py-4 overflow-y-auto">
      <div class="relative">
        <!--            <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">-->
        <!--             -->
        <!--            </div>-->
        <input @input="search()" v-model="inputValue" type="search" id="default-search" class="block w-full  pr-11 text-sm text-gray-900 border rounded-l-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 bg-gray-700 border-gray-600 placeholder-gray-400 text-white " placeholder="Search Mockups, Logos..." required>
        <button type="submit" class="text-white absolute inset-y-0 right-0 flex items-center pr-3 bg- hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium text-sm px-4 py-2 ">
          <svg class="w-4 h-4 text-white " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
          </svg>
        </button>
      </div>
      <ul
          class="text-white flex-col space-y-2 font-medium mt-5"
      >
        <li>
          <NuxtLink
              to="/"
              class="block py-2 pl-3 pr-4 bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500"
              aria-current="page"
          >
            {{ $t("store") }}
          </NuxtLink>
        </li>
        <li>
          <NuxtLink
              to="#"
              class="block py-2 pl-3 pr-4 rounded hover:bg-blue-700 md:hover:bg-transparent md:hover:text-blue-700 md:p-0"
          >
            {{ $t("community") }}
          </NuxtLink>
        </li>
        <li>
          <NuxtLink
              href="#"
              class="block py-2 pl-3 pr-4 rounded hover:bg-blue-700 md:hover:bg-transparent md:hover:text-blue-700 md:p-0"
          >
            {{ $t("about") }}
          </NuxtLink>
        </li>
        <li>
          <NuxtLink
              href="#"
              class="block py-2 pl-3 pr-4 rounded hover:bg-blue-700 md:hover:bg-transparent md:hover:text-blue-700 md:p-0"
          >
            {{ $t("support") }}
          </NuxtLink>
        </li>
      </ul>
    </div>
  </div>
</template>
<style scoped>
.greamz-icon{
  background-image: url("/img/logo-horizontal (1).svg");
  background-size: 100%;
  background-repeat: no-repeat;
  width: 150px;
  height: 40px;
}
</style>