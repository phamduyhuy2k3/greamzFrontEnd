<template>

  <section
      id="login-section"
      class="p-5 flex justify-center align-middle pt-16"
      style=""
  >
    <div
        class="w-full lg:max-w-xl p-6 space-y-8 sm:p-8 rounded-lg shadow-xl dark:bg-gray-800 bg-[#181a21]"
    >
      <h2 class="text-2xl font-bold text-white">Sign in</h2>
      <div v-if="loading" role="status" class="mx-auto text-center">
        <svg
            aria-hidden="true"
            class="inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-green-500"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
          <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
          />
          <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
          />
        </svg>
        <span class="sr-only">Loading...</span>
      </div>
      <n-alert v-if="useRoute().query.message &&!offAlert" :type="useRoute().query.alert">
        {{ useRoute().query.message }}
      </n-alert>
      <n-alert v-if="isInvalid&& !loading" type="error">
        {{error}}
      </n-alert>
      <form class="mt-8 space-y-6" @submit.prevent="login()">
        <div>
          <label
              for="email"
              class="block mb-2 text-sm font-medium text-[#1999ff] uppercase font-weight-black"
          >Sign in with your username or email</label
          >
          <input
              id="email"
              v-model="loginForm.username"
              type="text"
              name="text"
              class="bg-[#32353c] text-white border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder=""
              required
              @input="isInvalid=false;"

          />
        </div>
        <div>
          <label
              for="password"
              class="block mb-2 text-sm font-medium text-[#1999ff] uppercase font-weight-black"
          >Your password</label
          >
          <input
              id="password"
              v-model="loginForm.password"
              type="password"
              name="password"
              placeholder=""
              autocomplete="current-password"
              class="bg-[#32353c] text-white border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              @input="isInvalid=false;"

              required
          />
        </div>
        <div class="flex justify-between">
          <button type="submit"
                  class="px-5 py-3 text-base font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 sm:w-auto dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Login to your account

          </button>
          <NuxtLink
              to="/reset-password-step-1"
              class="ml-auto text-sm font-medium text-blue-600 hover:underline dark:text-blue-500"
          >Lost Password?
          </NuxtLink>

        </div>


        <div class="text-sm font-medium text-white">
          Not registered yet?
          <NuxtLink
              to="/register"
              class="text-blue-600 hover:underline dark:text-blue-500"
          >
            Create account
          </NuxtLink>
        </div>
        <div class="inline-flex items-center justify-center w-full">
          <hr class="w-64 h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"/>
          <span
              class="absolute px-3 font-medium text-gray-900 -translate-x-1/2 bg-white left-1/2 dark:text-white dark:bg-gray-900"
          >or</span
          >
        </div>
        <div class="flex flex-col items-center justify-center px-[3rem] gap-3">
          <button type="button"
                  class="rounded-md p-2 w-full flex gap-2 justify-center items-center cursor-pointer bg-[#e4e4e7]"
                  @click="oauthLogin(GOOGLE_AUTH_URL)">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 128 128">
              <path fill="#fff"
                    d="M44.59 4.21a63.28 63.28 0 0 0 4.33 120.9a67.6 67.6 0 0 0 32.36.35a57.13 57.13 0 0 0 25.9-13.46a57.44 57.44 0 0 0 16-26.26a74.33 74.33 0 0 0 1.61-33.58H65.27v24.69h34.47a29.72 29.72 0 0 1-12.66 19.52a36.16 36.16 0 0 1-13.93 5.5a41.29 41.29 0 0 1-15.1 0A37.16 37.16 0 0 1 44 95.74a39.3 39.3 0 0 1-14.5-19.42a38.31 38.31 0 0 1 0-24.63a39.25 39.25 0 0 1 9.18-14.91A37.17 37.17 0 0 1 76.13 27a34.28 34.28 0 0 1 13.64 8q5.83-5.8 11.64-11.63c2-2.09 4.18-4.08 6.15-6.22A61.22 61.22 0 0 0 87.2 4.59a64 64 0 0 0-42.61-.38z"/>
              <path fill="#e33629"
                    d="M44.59 4.21a64 64 0 0 1 42.61.37a61.22 61.22 0 0 1 20.35 12.62c-2 2.14-4.11 4.14-6.15 6.22Q95.58 29.23 89.77 35a34.28 34.28 0 0 0-13.64-8a37.17 37.17 0 0 0-37.46 9.74a39.25 39.25 0 0 0-9.18 14.91L8.76 35.6A63.53 63.53 0 0 1 44.59 4.21z"/>
              <path fill="#f8bd00"
                    d="M3.26 51.5a62.93 62.93 0 0 1 5.5-15.9l20.73 16.09a38.31 38.31 0 0 0 0 24.63q-10.36 8-20.73 16.08a63.33 63.33 0 0 1-5.5-40.9z"/>
              <path fill="#587dbd"
                    d="M65.27 52.15h59.52a74.33 74.33 0 0 1-1.61 33.58a57.44 57.44 0 0 1-16 26.26c-6.69-5.22-13.41-10.4-20.1-15.62a29.72 29.72 0 0 0 12.66-19.54H65.27c-.01-8.22 0-16.45 0-24.68z"/>
              <path fill="#319f43"
                    d="M8.75 92.4q10.37-8 20.73-16.08A39.3 39.3 0 0 0 44 95.74a37.16 37.16 0 0 0 14.08 6.08a41.29 41.29 0 0 0 15.1 0a36.16 36.16 0 0 0 13.93-5.5c6.69 5.22 13.41 10.4 20.1 15.62a57.13 57.13 0 0 1-25.9 13.47a67.6 67.6 0 0 1-32.36-.35a63 63 0 0 1-23-11.59A63.73 63.73 0 0 1 8.75 92.4z"/>
            </svg>
            <span>Google login</span>
          </button>


        </div>
      </form>
    </div>
  </section>
</template>
<script setup>
import {useCookie} from "nuxt/app";

definePageMeta({
  layout: "auth",
  breadcrumb: "Login Page",
});
useHead({
  title: "Login",
  meta: [
    {
      name: "description",
      content: "Login",
    },
  ],
});
const {authenticateUser, getUserProfile, setToken,OAUTH2_REDIRECT_URI,GOOGLE_AUTH_URL} = useAuthStore();
const isInvalid = ref(false);
const {loading, authenticated} = storeToRefs(useAuthStore());
const loginForm = reactive({
  username: "",
  password: "",
});

const route = useRoute();
const offAlert = ref(false);
onMounted(() => {
  setTimeout(() => {
    offAlert.value = true;
  }, 5000);
})
const oauthLogin = async (url) => {
  let left = (screen.width - 600) / 2;
  let top = (screen.height - 600) / 4;
  const popup = window.open(url, 'popup', 'resizable=yes, width=' + 600
      + ', height=' + 600 + ', top='
      + top + ', left=' + left);
  const checkPopup = setInterval(async () => {
    if (popup.closed || !popup)  clearInterval(checkPopup);
    if (popup.window.location.href.includes('/oauth2/redirect')) {
      await setToken(useCookie('accessToken', {
        watch: true,
        default: () => '',
      }).value)
      await getUserProfile().then((res) => {
        if (res) {
          useRouter().push({path: '/', query: {message: 'Login successfully', alert: 'success'}})
        } else {
          isInvalid.value = true;
        }
        loading.value = false;

      })
      popup.close()
    }


  }, 1000);


}
const error = ref("");
const login = async () => {
  loading.value = true;

  await authenticateUser(loginForm).then((res) => {
    if(res==="Your account is disabled. Please contact the administrator"){
      isInvalid.value = true;
      error.value = res;
      loading.value = false;
      return;
    }
    if (res) {
      useRouter().push({path: '/', query: {message: 'Login successfully', alert: 'success'}})
    } else {
      console.log("asdsadsadasd")
      isInvalid.value = true;
      error.value = "Username or password is incorrect";
    }

  })
  loading.value = false;

};
</script>
<style scoped></style>
