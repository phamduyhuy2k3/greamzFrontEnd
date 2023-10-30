<template>
  <BreadCrumb  :breadcrumbs="userBreadCrumb().breadcrumbs"></BreadCrumb>
  <section id="register-section" class="p-5 flex justify-center align-middle">
    <div
      class="w-full lg:max-w-xl p-6 space-y-8 sm:p-8 rounded-lg shadow-xl dark:bg-gray-800 bg-[#181a21]"
    >
      <h2 class="text-2xl font-bold text-white">Register</h2>
      <form class="mt-8 space-y-6" @submit.prevent="register()">
        <div>
          <label
            for="fullName"
            class="block mb-2 text-sm font-medium text-[#1999ff] uppercase font-weight-black"
            >Full name</label
          >
          <div class="relative">
            <input
              id="fullName"
              v-model="registerData.fullname"
              type="text"
              name="fullName"
              class="bg-[#32353c] text-white border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder=""
              @input="v$.fullname.$touch"
              @blur="v$.fullname.$touch"
            />
            <Icon
              v-if="!v$.fullname.$invalid || v$.fullname.$error"
              class="absolute top-0 right-2 h-full text-xl text-green-500"
              :class="{
                'text-green-500': v$.fullname.$validate,
                'text-yellow-500': v$.fullname.$error,
              }"
              :name="`${
                !v$.fullname.$error
                  ? 'icon-park-outline:check-one'
                  : 'simple-line-icons:exclamation'
              }`"
            />
          </div>
          <p v-for="error of v$.fullname.$errors" :key="error.$uid">
            <strong class="text-red-500">{{ error.$message }}</strong>
          </p>
        </div>
        <div>
          <label
            for="email"
            class="block mb-2 text-sm font-medium text-[#1999ff] uppercase font-weight-black"
            >Email</label
          >
          <div class="relative">
            <input
              id="email"
              v-model="registerData.email"
              type="email"
              name="email"
              class="bg-[#32353c] text-white border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder=""
              @input="v$.email.$touch"
              @blur="v$.email.$touch"
            />
            <Icon
              v-if="!v$.email.$invalid || v$.email.$error"
              class="absolute top-0 right-2 h-full text-xl text-green-500"
              :class="{
                'text-green-500': v$.email.$validate,
                'text-yellow-500': v$.email.$error,
              }"
              :name="`${
                !v$.email.$invalid
                   ? 'icon-park-outline:check-one'
                  : 'simple-line-icons:exclamation'
              }`"
            />
          </div>
          <p v-for="error of v$.email.$errors" :key="error.$uid">
            <strong class="text-red-500">{{ error.$message }}</strong>
          </p>
        </div>
        <div>
          <label
            for="username"
            class="block mb-2 text-sm font-medium text-[#1999ff] uppercase font-weight-black"
            >Username</label
          >
          <div class="relative">
            <input
              id="username"
              v-model="registerData.username"
              type="text"
              name="username"
              placeholder=""
              class="bg-[#32353c] text-white border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              @input="v$.username.$touch"
              @blur="v$.username.$touch"
            />
            <Icon
              v-if="!v$.username.$invalid || v$.username.$error"
              class="absolute top-0 right-2 h-full text-xl text-green-500"
              :class="{
                'text-green-500': v$.username.$validate,
                'text-yellow-500': v$.username.$error,
              }"
              :name="`${
                !v$.username.$invalid
                   ? 'icon-park-outline:check-one'
                  : 'simple-line-icons:exclamation'
              }`"
            />
          </div>
          <p v-for="error of v$.username.$errors" :key="error.$uid">
            <strong class="text-red-500">{{ error.$message }}</strong>
          </p>
        </div>
        <div>
          <label
            for="password"
            class="block mb-2 text-sm font-medium text-[#1999ff] uppercase font-weight-black"
            >Password</label
          >
          <div class="relative">
            <input
              id="password"
              v-model="registerData.password"
              type="password"
              name="password"
              placeholder="••••••••"
              class="bg-[#32353c] text-white border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              @input="v$.password.$touch"
              @blur="v$.password.$touch"
            />
            <Icon
              v-if="!v$.password.$invalid || v$.password.$error"
              class="absolute top-0 right-2 h-full text-xl text-green-500"
              :class="{
                'text-green-500': v$.password.$validate,
                'text-yellow-500': v$.password.$error,
              }"
              :name="`${
                !v$.password.$error
                  ? 'icon-park-outline:check-one'
                  : 'simple-line-icons:exclamation'
              }`"
            />
          </div>
          <p v-for="error of v$.password.$errors" :key="error.$uid">
            <strong class="text-red-500">{{ error.$message }}</strong>
          </p>
        </div>
        <div class="relative">
          <label
            for="confirmPassword"
            class="block mb-2 text-sm font-medium text-[#1999ff] uppercase font-weight-black"
            >Confirm password</label
          >
          <div class="relative">
            <input
              id="confirmPassword"
              v-model="registerData.confirmPassword"
              type="password"
              name="confirmPassword"
              placeholder="••••••••"
              class="bg-[#32353c] text-white border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              @input="v$.confirmPassword.$touch"
              @blur="v$.confirmPassword.$touch"
            />
            <Icon
              v-if="!v$.confirmPassword.$invalid || v$.confirmPassword.$error"
              class="absolute top-0 right-2 h-full text-xl text-green-500"
              :class="{
                'text-green-500': v$.confirmPassword.$validate,
                'text-yellow-500': v$.confirmPassword.$error,
              }"
              :name="`${
                !v$.confirmPassword.$invalid
                 ? 'icon-park-outline:check-one'
                  : 'simple-line-icons:exclamation'
              }`"
            />
          </div>
          <p v-for="error of v$.confirmPassword.$errors" :key="error.$uid">
            <strong class="text-red-500">{{ error.$message }}</strong>
          </p>
        </div>

        <button
          type="submit"
          class="w-full px-5 py-3 text-base font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 sm:w-auto dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Create account
          <div v-if="loading" role="status">
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
        </button>
        <div class="text-sm font-medium text-white">
          <NuxtLink
            to="/login"
            class="text-blue-600 hover:underline dark:text-blue-500"
            >Already have account? Back to login</NuxtLink
          >
        </div>
      </form>
    </div>
  </section>
</template>
<script setup>
definePageMeta({
  layout: "auth",
  breadcrumb: "Register Page",
});
import {
  required,
  email,
  sameAs,
  helpers,
  minLength,
  maxLength,
  createI18nMessage
} from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
import Swal from "sweetalert2";
const router = useRouter();
const { authRegisterUser } = useAuthStore();
const { loading, authenticated } = storeToRefs(useAuthStore());
const config=useRuntimeConfig()
const oneUpperCase = (value) => /[A-Z]/.test(value);
const oneSpecialChar = (value) =>
  /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(value);
const oneNumber = (value) => /[0-9]/.test(value);

const registerData = reactive({
  fullname: "",
  email: "",
  username: "",
  password: "",
  confirmPassword: "",
});
async function isEmailExisted (value ) {
  if(!value) return true
  const { data, error } = await useFetch(
      config.public.apiUrl+"/api/v1/auth/validate-email/" + value,
      {
        method: "GET"
      },

  );
  if (error.value) {
    console.log(error.value);
    return false;
  }
  return !data.value;
}
const isUsernameExisted=async (value)=> {
  if(!value) return true
  const { data, error } = await useFetch(
      config.public.apiUrl+ "/api/v1/auth/validate-username/" + value,
      {
        method: "GET",

      },
  );
  if (error.value) {
    console.log(error.value);
    return false;
  }
  return !data.value;
};
const rules = computed(() => {
  return {
    fullname: {
      required: helpers.withMessage("The fullname field is required", required),
    },
    username: {
      required: helpers.withMessage("The username field is required", required),
      minLength: helpers.withMessage(
        "The username must be at least 3 characters",
        minLength(6),
      ),
      maxLength: helpers.withMessage(
        "The username must be at most 18 characters",
        maxLength(18),
      ),
      isUsernameExisted: helpers.withMessage(
        "Username is already existed",
        helpers.withAsync(isUsernameExisted),
      ),
    },
    email: {
      required: helpers.withMessage("The email field is required", required),
      email: helpers.withMessage("Invalid email format", email),
      isEmailExisted: helpers.withMessage(
        "Email is already existed",
        helpers.withAsync(isEmailExisted),
      ),
    },
    password: {
      required: helpers.withMessage("The password field is required", required),
      oneUpperCase: helpers.withMessage(
        "The password must contain at least one uppercase letter",
        oneUpperCase,
      ),
      oneSpecialChar: helpers.withMessage(
        "The password must contain at least one special character",
        oneSpecialChar,
      ),
      minLength: helpers.withMessage(
        "The password must be between 6 and 18 characters",
        minLength(8),
      ),
      maxLength: helpers.withMessage(
        "The password must be between 6 and 18 characters",
        maxLength(18),
      ),
      oneNumber: helpers.withMessage(
        "The password must contain at least one number",
        oneNumber,
      ),
    },
    confirmPassword: {
      required: helpers.withMessage(
        "The password confirmation field is required",
        required,
      ),
      sameAs: helpers.withMessage(
        "Passwords don't match",
        sameAs(registerData.password),
      ),
    },
  };
});
const v$ = useVuelidate(rules, registerData);


const register = async () => {
  const isFormValid = await v$.value.$validate();
  console.log(isFormValid);
  if (!isFormValid) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Please, validate all your information",
    });
    return;
  }
  const res = await authRegisterUser(registerData);
  if (res === true) {
    router.push({
      path: "/login",
      query: { registered: "true" },
    });
  }
};
</script>
<style scoped></style>
