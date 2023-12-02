<script setup>
import { IconFlagEN, IconFlagVN } from "#components";
const { setLocaleCookie, locale } = useI18n();
const localeCookie = useCookie("i18n_redirected");
const {$state,getAuthenticated}=useAuthStore()
const scroll = ref(0);
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
const isMobile=useState('isMobile');
const changeLanguage = (value) => {
  language.value = value;
  locale.value = value.iso;
  setLocaleCookie(locale.value);
};

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
const handleScroll=(event)=> {
  scroll.value = window.scrollY;

}
const active = ref(false)
onMounted(() => {
  window.addEventListener('scroll', handleScroll);
  if (localeCookie.value) {
    const lang = languages.find((l) => l.iso === localeCookie.value);
    if (lang) {
      language.value = lang;
      locale.value = lang.iso;
    }
  }

});
</script>

<template>

  <nav id="mainHeader"  :class="scroll>0? 'greamz-header' : 'w-full top-0'" class="text-white sticky left-0 bg-[#171a21]" style="z-index: 444" >
    <div  class="flex items-center justify-between mx-auto px-2 py-4">
      <div class="flex">
        <button
          type="button"
          @click="active=!active"
          class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg xl:hidden md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
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
      <NuxtLink exact-active-class="g2398f238fh8392gy8u34fgyuw3rg" to="/" title="home" class="flex items-center border-0 text-white">
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 16 16"><g fill="currentColor"><path d="M.329 10.333A8.01 8.01 0 0 0 7.99 16C12.414 16 16 12.418 16 8s-3.586-8-8.009-8A8.006 8.006 0 0 0 0 7.468l.003.006l4.304 1.769A2.198 2.198 0 0 1 5.62 8.88l1.96-2.844l-.001-.04a3.046 3.046 0 0 1 3.042-3.043a3.046 3.046 0 0 1 3.042 3.043a3.047 3.047 0 0 1-3.111 3.044l-2.804 2a2.223 2.223 0 0 1-3.075 2.11a2.217 2.217 0 0 1-1.312-1.568L.33 10.333Z"/><path d="M4.868 12.683a1.715 1.715 0 0 0 1.318-3.165a1.705 1.705 0 0 0-1.263-.02l1.023.424a1.261 1.261 0 1 1-.97 2.33l-.99-.41a1.7 1.7 0 0 0 .882.84Zm3.726-6.687a2.03 2.03 0 0 0 2.027 2.029a2.03 2.03 0 0 0 2.027-2.029a2.03 2.03 0 0 0-2.027-2.027a2.03 2.03 0 0 0-2.027 2.027Zm2.03-1.527a1.524 1.524 0 1 1-.002 3.048a1.524 1.524 0 0 1 .002-3.048Z"/></g></svg>
        <span class="text-2xl font-bold ms-2">Steam</span>
      </NuxtLink>

      <div  class="hidden w-full md:flex md:w-auto">
        <ul
          class="sm:hidden hidden md:flex p-4 md:p-0 mt-4 font-medium text-[1.1rem] text-white md:flex-row md:space-x-4 md:mt-0"
        >
          <li>
            <NuxtLink
              to="/"
              exact-active-class="g2398f238fh8392gy8u34fgyuw3rg"
              class="block py-2 pl-3 pr-4 bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500"
              aria-current="page"
            >
              {{ $t("store") }}
            </NuxtLink>
          </li>
          <li>
            <NuxtLink
              to="#"
              exact-active-class="g2398f238fh8392gy8u34fgyuw3rg"
              class="block py-2 pl-3 pr-4 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
            >
              {{ $t("community") }}
            </NuxtLink>
          </li>
          <li>
            <NuxtLink
              href="#"
              exact-active-class="g2398f238fh8392gy8u34fgyuw3rg"
              class="block py-2 pl-3 pr-4 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
            >
              {{ $t("about") }}
            </NuxtLink>
          </li>
          <li>
            <NuxtLink
              href="#"
              exact-active-class="g2398f238fh8392gy8u34fgyuw3rg"
              class="block py-2 pl-3 pr-4 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
            >
              {{ $t("support") }}
            </NuxtLink>
          </li>
        </ul>
      </div>
      <nav class="">
        <div class="flex flex-row items-center gap-4 flex-nowrap">
          <div>
            <NuxtLink to="/cart" type="button" class="inline-flex items-center font-medium justify-center px-4 py-2 text-sm text-gray-900 rounded-lg cursor-pointer hover:bg-[#0ea5e9] text-white relative">
              <div id="cart_nav">
                <IconCart/>
                <div   class="absolute inline-flex items-center justify-center w-5 h-5 text-xs text-center font-bold text-white bg-red-500  rounded-full -top-2 -end-2 ">
                  {{ useCart().getCartItemCount }}
                </div>
              </div>
            </NuxtLink>
          </div>
          <div class="dropdown dropdown-hover">

            <NuxtLink v-if="!getAuthenticated" to="/login"  class="inline-flex items-center mr-2 font-medium justify-center px-4 py-2 text-sm text-gray-900 rounded-lg cursor-pointer hover:bg-[#0ea5e9] text-white">
              <IconUser/>
              <span  class="ml-2 hidden md:block">
                {{$t('login')}}
              </span>
            </NuxtLink>
            <template v-else>
              <div  tabindex="0" role="button"  class=" md:inline-flex  items-center xl:mr-2 font-medium justify-center xl:px-4 xl:py-2 text-sm text-gray-900 rounded-lg cursor-pointer hover:bg-[#0ea5e9] dark:text-white">
                <img class="h-8 w-8 rounded-full" :src="$state.userProfile.photo" alt="userAvatar">
              </div>
              <ul tabindex="0" class="dropdown-content z-[1]  right-0 menu p-2 shadow bg-base-100 rounded-box w-52">
                <li><NuxtLink to="/dash-board/orders">{{$t('dashboard')}}</NuxtLink></li>
                <li><NuxtLink to="/dash-board/profile/settings-avatar">{{ $t('setting') }}</NuxtLink></li>
                <li><a @click="useAuthStore().logUserOut()">{{$t('logout')}}</a></li>
              </ul>
            </template>
          </div>

          <div class="">
            <button
              type="button"
              data-dropdown-toggle="language-dropdown-menu"
              class="inline-flex items-center font-medium justify-center xl:px-4 xl:py-2 text-sm text-gray-900 dark:text-white rounded-lg cursor-pointer hover:bg-[#0ea5e9] dark:hover:text-white"
            >
              <span class="text-white hidden md:block xl:block">
                {{ language.text }}
              </span>
              <Component :is="language.icon" class="w-5 h-5 " />
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
                    <button
                      class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
                      role="menuitem"
                      @click="changeLanguage(l)"
                    >
                      {{ l.text }}
                      <div class="inline-flex items-center">
                        <Component :is="l.icon" />
                      </div>
                    </button>
                  </li>
                </template>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </div>
  </nav>
  <n-drawer class="bg-[#171a21]" v-if="isMobile" v-model:show="active"  placement="left">
    <n-drawer-content >
      <template #header>
        <NuxtLink exact-active-class="g2398f238fh8392gy8u34fgyuw3rg" to="/" title="home" class="flex items-center border-0 text-white">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 16 16"><g fill="currentColor"><path d="M.329 10.333A8.01 8.01 0 0 0 7.99 16C12.414 16 16 12.418 16 8s-3.586-8-8.009-8A8.006 8.006 0 0 0 0 7.468l.003.006l4.304 1.769A2.198 2.198 0 0 1 5.62 8.88l1.96-2.844l-.001-.04a3.046 3.046 0 0 1 3.042-3.043a3.046 3.046 0 0 1 3.042 3.043a3.047 3.047 0 0 1-3.111 3.044l-2.804 2a2.223 2.223 0 0 1-3.075 2.11a2.217 2.217 0 0 1-1.312-1.568L.33 10.333Z"/><path d="M4.868 12.683a1.715 1.715 0 0 0 1.318-3.165a1.705 1.705 0 0 0-1.263-.02l1.023.424a1.261 1.261 0 1 1-.97 2.33l-.99-.41a1.7 1.7 0 0 0 .882.84Zm3.726-6.687a2.03 2.03 0 0 0 2.027 2.029a2.03 2.03 0 0 0 2.027-2.029a2.03 2.03 0 0 0-2.027-2.027a2.03 2.03 0 0 0-2.027 2.027Zm2.03-1.527a1.524 1.524 0 1 1-.002 3.048a1.524 1.524 0 0 1 .002-3.048Z"/></g></svg>
          <span class="text-2xl font-bold ms-2">Steam</span>
        </NuxtLink>
      </template>
      Stoner is a 1965 novel by the American writer John Williams.
    </n-drawer-content>
  </n-drawer>
</template>
<style scoped>
.greamz-icon{
  background-image: url("/img/logo-horizontal (1).svg");
  background-size: 100%;
  background-repeat: no-repeat;
  width: 150px;
  height: 40px;
}
.greamz-header{

  @apply xl:w-[80%] xl:rounded-[999px] mx-auto top-0;
  transition: all 0.5s ease-in;

}
</style>