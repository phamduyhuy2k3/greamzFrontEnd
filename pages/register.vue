<template>
  <section v-if="step===1" id="register-section-step-1" class="p-5 flex justify-center align-middle">
    <div
      class="w-full lg:max-w-xl p-3 rounded-lg shadow-xl dark:bg-gray-800 bg-[#181a21]"
    >

      <div class="space-y- p-3">
        <h2 class="text-2xl font-bold text-white">{{ $t('register.title') }}</h2>
        <form class="mt-8 space-y-6" @submit.prevent="sendOtpRequest()">
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
              <strong class="text-red-500">{{ $t(error.$message) }}</strong>
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
              <strong class="text-red-500">{{ $t(error.$message) }}</strong>
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
              <strong class="text-red-500">{{ $t(error.$message) }}</strong>
            </p>
          </div>
          <button
              type="submit"
              class="ml-auto px-5 py-3 text-base  font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 sm:w-auto dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Next
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
    </div>
  </section>
  <section v-if="step===2" id="register-section-step-2" class="p-5 flex justify-center align-middle">
    <div
        class="w-full lg:max-w-xl p-3 rounded-lg shadow-xl dark:bg-gray-800 bg-[#181a21]"
    >
      <a @click="step=1" class="cursor-pointer">
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
          <path fill="currentColor"
                d="m7.825 13l4.9 4.9q.3.3.288.7t-.313.7q-.3.275-.7.288t-.7-.288l-6.6-6.6q-.15-.15-.213-.325T4.425 12q0-.2.063-.375T4.7 11.3l6.6-6.6q.275-.275.688-.275t.712.275q.3.3.3.713t-.3.712L7.825 11H19q.425 0 .713.288T20 12q0 .425-.288.713T19 13H7.825Z"/>
        </svg>
      </a>
      <div class="space-y- p-3">
        <h2 class="text-2xl font-bold text-white">Register</h2>
        <form class="mt-8 space-y-6" >
          <n-alert v-if="invalidOtp" type="error">
            Invalid codes
          </n-alert>
          <n-card size="huge" :hoverable="true">

            <template #default>
              <div class="flex flex-col items-center justify-center gap-4">
                <h3 class="text-h6 mb-4">Verify Your Email</h3>
                <div class="text-body-2">
                  We sent a verification code to {{registerData.email}} <br>
                  Please check your email and paste the code below.
                </div>
                <div style="display: flex; flex-direction: row">
                  <VOtpInput
                      ref="otpInput"
                      v-model:value="otp"
                      input-classes="otp-input"
                      separator="-"
                      :num-inputs="6"
                      :should-auto-focus="true"
                      input-type="letter-numeric"

                  />
                </div>
                <div class="text-caption ">
                  Didn't receive the code? <a class="text-[#8b5cf6]" @click.prevent="sendOtpRequest()">Resend</a>
                </div>
              </div>
            </template>

          </n-card>

          <button
              type="button"
              @click="validateOtp()"
              class="w-full px-5 py-3 text-base font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 sm:w-auto dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Next
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
    </div>
  </section>
  <section v-if="step===3" id="register-section-step-3" class="p-5 flex justify-center align-middle">
    <div
        class="w-full lg:max-w-xl p-3 rounded-lg shadow-xl dark:bg-gray-800 bg-[#181a21]"
    >
      <a @click="step=2" class="cursor-pointer">
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
          <path fill="currentColor"
                d="m7.825 13l4.9 4.9q.3.3.288.7t-.313.7q-.3.275-.7.288t-.7-.288l-6.6-6.6q-.15-.15-.213-.325T4.425 12q0-.2.063-.375T4.7 11.3l6.6-6.6q.275-.275.688-.275t.712.275q.3.3.3.713t-.3.712L7.825 11H19q.425 0 .713.288T20 12q0 .425-.288.713T19 13H7.825Z"/>
        </svg>
      </a>
      <div class="space-y- p-3">
        <h2 class="text-2xl font-bold text-white">Register</h2>
        <form class="mt-8 space-y-6" @submit.prevent="register()">
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
              <strong class="text-red-500">{{ $t(error.$message) }}</strong>
            </p>
          </div>
          <div >
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
              <strong class="text-red-500">{{ $t(error.$message) }}</strong>
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

    </div>
  </section>
</template>
<script setup>
definePageMeta({
  layout: "auth",
  breadcrumb: "Register Page",
});
import VOtpInput from "vue3-otp-input";
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
const step = ref(1);

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
  const emailRegex = /^(?:[A-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[A-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9]{2,}(?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/i;
  if (!emailRegex.test(value)) {
    return true;
  }
  const { data, error } = await useFetch(
      "/api/server/v1/auth/validate-email/" + value,
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
      "/api/server/v1/auth/validate-username/" + value,
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
      required: helpers.withMessage("register.validate.require.fullname", required),
    },
    username: {
      required: helpers.withMessage("register.validate.require.username", required),
      minLength: helpers.withMessage(
        "register.validate.minLength.username",
        minLength(6),
      ),
      maxLength: helpers.withMessage(
        "register.validate.maxLength.username",
        maxLength(18),
      ),
      isUsernameExisted: helpers.withMessage(
        "register.validate.username.isExisted",
        helpers.withAsync(isUsernameExisted),
      ),
    },
    email: {
      required: helpers.withMessage("register.validate.require.email", required),
      email: helpers.withMessage("register.validate.email.invalidFormat", email),
      isEmailExisted: helpers.withMessage(
        "register.validate.email.isExisted",
        helpers.withAsync(isEmailExisted),
      ),
    },
    password: {
      required: helpers.withMessage("register.validate.require.password", required),
      oneUpperCase: helpers.withMessage(
        "register.validate.oneUpperCase.password",
        oneUpperCase,
      ),
      oneSpecialChar: helpers.withMessage(
        "register.validate.oneSpecialCharacter.password",
        oneSpecialChar,
      ),
      minLength: helpers.withMessage(
        "register.validate.minLength.password",
        minLength(8),
      ),
      maxLength: helpers.withMessage(
        "register.validate.maxLength.password",
        maxLength(18),
      ),
      oneNumber: helpers.withMessage(
        "register.validate.oneNumber.password",
        oneNumber,
      ),
    },
    confirmPassword: {
      required: helpers.withMessage(
        "register.validate.require.confirmPassword",
        required,
      ),
      sameAs: helpers.withMessage(
        "register.validate.sameAs.confirmPassword",
        sameAs(registerData.password),
      ),
    },
    $validationGroups:{
      step1:['fullname','username','email'],
    }
  };
});
const v$ = useVuelidate(rules, registerData);
const otp = ref("");
const otpForVerify = ref("");
const emailCurrent = ref("");
const sendOtpRequest =async () => {
  const isInvalid = await v$.value.$validationGroups.step1.$invalid;
  console.log(isInvalid)
  console.log(otp.value)
  if(isInvalid) return
  step.value = 2;
  if(emailCurrent.value===registerData.email) return
  otp.value = "";
  otpForVerify.value = generateRandomNumber();
  emailCurrent.value = registerData.email;
  const {error}=await useAsyncData('send-otp_'+otpForVerify.value,
      ()=>
          $fetch("/api/server/v1/auth/send-otp-email", {
            method: "POST",
            body: JSON.stringify({
              email: emailCurrent.value,
              otp: otpForVerify.value,
            }),
          })
  )
  if(error.value){
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: error.value,
    });

  }

};
const invalidOtp = ref(false);
const validateOtp = () => {
  console.log(otp.value, otpForVerify.value)
  if (parseInt(otp.value) === otpForVerify.value) {
    step.value = 3;
  } else {
    invalidOtp.value = true;
    setTimeout(() => {
      invalidOtp.value = false;
    }, 3500);
  }
};
function generateRandomNumber() {
  let minm = 100000;
  let maxm = 999999;
  return Math.floor(Math
      .random() * (maxm - minm + 1)) + minm;
}
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
