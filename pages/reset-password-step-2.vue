<template>
  <section
      id="login-section"
      class="p-5 flex justify-center align-middle pt-16"
      style=""
  >
    <div
        class="w-full lg:max-w-xl p-6 space-y-8 sm:p-8 rounded-lg shadow-xl dark:bg-gray-800 bg-[#181a21]"
    >
      <h2 class="text-sm font-bold text-white flex items-center justify-center px-10">
        Reset your password
      </h2>
      <div
          v-if="alert && alert.type !== 'error'"
          class="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400"
          role="alert"
      >
        <span class="font-medium">{{ alert.message }}</span>
      </div>

      <form class="mt-8 space-y-6 flex flex-col" @submit.prevent="sendRequest()" >
        <div>
          <label
              for="password"
              class="block mb-2 text-sm font-medium text-[#1999ff] uppercase font-weight-black"
          >New Password</label
          >
          <div class="relative">
            <input
                id="password"
                v-model="resetPasswordStep2Form.password"
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
        <div >
          <label
              for="confirmPassword"
              class="block mb-2 text-sm font-medium text-[#1999ff] uppercase font-weight-black"
          >Confirm your new password</label
          >
          <div class="relative">
            <input
                id="confirmPassword"
                v-model="resetPasswordStep2Form.confirmPassword"
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
        <button v-if="!pending" type="submit"
                class="w-full px-5 py-3 mx-auto text-base font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 sm:w-auto dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Submit
        </button>
        <button v-else type="button" disabled
                class="w-full px-5 py-3 mx-auto text-base font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 sm:w-auto dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Sending request
          <p>
            <n-spin size="medium" />
          </p>
        </button>


      </form>
    </div>
  </section>
</template>

<script setup>
definePageMeta({
  validate: async (route) => {
    const token=route.query.token;
    console.log(token)
    const {data,error}=await useAsyncData('checkToken_'+token,
        ()=>
            $fetch(`${useRuntimeConfig().public.apiUrl}/api/v1/auth/reset-password`,{
              method:"GET",
              query:{
                token:token
              }
            })
    );
    if(error.value){
      return false
    }
    return true
  }
})
import {
  required,
  email,
  sameAs,
  helpers,
  minLength,
  maxLength,

} from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
import Swal from "sweetalert2";
const config=useRuntimeConfig()
const oneUpperCase = (value) => /[A-Z]/.test(value);
const oneSpecialChar = (value) =>
    /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(value);
const oneNumber = (value) => /[0-9]/.test(value);
const resetPasswordStep2Form = reactive({
  password: "",
  confirmPassword: "",
});
const rules=computed(()=>{
  return {
    password: {
      required: helpers.withMessage("Password is required", required),
      minLength: helpers.withMessage(
          "Password must be at least 8 characters",
          minLength(8)
      ),
      maxLength: helpers.withMessage(
          "Password must be at most 20 characters",
          maxLength(20)
      ),
      oneUpperCase: helpers.withMessage(
          "Password must contain at least one uppercase letter",
          oneUpperCase
      ),
      oneSpecialChar: helpers.withMessage(
          "Password must contain at least one special character",
          oneSpecialChar
      ),
      oneNumber: helpers.withMessage(
          "Password must contain at least one number",
          oneNumber
      ),
    },
    confirmPassword: {
      required: helpers.withMessage("Confirm password is required", required),
      sameAs: helpers.withMessage(
          "Confirm password must be the same as password",
          sameAs(resetPasswordStep2Form.password)
      ),
    },
  }
})
const v$ = useVuelidate(rules
    ,
    resetPasswordStep2Form
);
const pending=ref(false)
const route=useRoute()
const sendRequest=async ()=>{
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
  pending.value=true
  const {error}=await  useAsyncData('reset_password'+Math.random()*100,
      ()=>
          $fetch(`${config.public.apiUrl}/api/v1/auth/reset-password`,{
            method:"POST",
            body:JSON.stringify({
              token:route.query.token,
              password:resetPasswordStep2Form.password,
              confirmPassword:resetPasswordStep2Form.confirmPassword
            })
          })
  );
  if(error.value){
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: error.value.message,
    });
    pending.value=false
  }else {
    pending.value=false
    setTimeout(()=>{
      useRouter().push({path: '/login', query: {message: 'Reset password success',alert: 'success'}})
    },2000)
  }
}
</script>

<style scoped>

</style>