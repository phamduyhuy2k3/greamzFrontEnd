<template>
  <section class="mt-16 p-5 flex justify-center align-middle pt-16" id="login-section" style="" >
    <div class="w-full lg:max-w-xl p-6 space-y-8 sm:p-8  rounded-lg shadow-xl dark:bg-gray-800 bg-[#181a21]">
      <h2 class="text-2xl font-bold  text-white">
        Sign in
      </h2>
      <div v-if="isRegisterSuccess"
           class="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400" role="alert">
        <span class="font-medium">Register successfully</span>
      </div>
      <div v-if="isLogOut"
           class="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400" role="alert">
        <span class="font-medium">Logout successfully</span>
      </div>
      <form class="mt-8 space-y-6" @submit.prevent="login">
        <div>
          <label for="email" class="block mb-2 text-sm font-medium  text-[#1999ff] uppercase font-weight-black">Sign in with your account name</label>
          <input type="email" name="text" id="email" v-model="loginForm.username"
                 class="bg-[#32353c] text-white border border-gray-300  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  "
                 placeholder="" required>
        </div>
        <div>
          <label for="password" class="block mb-2 text-sm font-medium  text-[#1999ff] uppercase font-weight-black">Your password</label>
          <input type="password" name="password" id="password" v-model="loginForm.password" placeholder=""
                 class="bg-[#32353c] text-white border border-gray-300  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5    "
                 required>
        </div>
        <div class="flex items-start">
          <div class="flex items-center h-5">
            <input id="remember" aria-describedby="remember" name="remember" type="checkbox"
                   class="w-4 h-4 border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600">
          </div>
          <div class="ml-3 text-sm">
            <label for="remember" class="font-medium text-gray-500 dark:text-gray-400">Remember this device</label>
          </div>
          <a href="#" class="ml-auto text-sm font-medium text-blue-600 hover:underline dark:text-blue-500">Lost
            Password?</a>
        </div>
        <button type="submit"
                class="w-full px-5 py-3 text-base font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 sm:w-auto dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          Login to your account
          <div role="status" v-if="loading">
            <svg aria-hidden="true"
                 class="inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-green-500"
                 viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor" />
              <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill" />
            </svg>
            <span class="sr-only">Loading...</span>
          </div>
        </button>

        <div class="text-sm font-medium  text-white">
          Not registered yet?
          <NuxtLink to="/register" class="text-blue-600 hover:underline dark:text-blue-500">
            Create account
          </NuxtLink>
        </div>
      </form>
    </div>
  </section>
</template>
<script setup>


const { authenticateUser } = useAuthStore();
const { authenticated, loading } = storeToRefs(useAuthStore());
const loginForm = reactive({
  username: '',
  password: ''
})
const route = useRoute();
const isLogOut=route.query?.logOut;
const isRegisterSuccess = route.query?.registered;
const router = useRouter();

const login = async () => {
  const res= await authenticateUser(loginForm);
  if (res===true) {
    router.push({
      path: '/',
      query: {  loginSuccess: 'true'}
    });
  }
}

</script>
<style scoped>
#login-section {
  background-image: url('./assets/img/new_login_bg_strong_mask.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}
</style>