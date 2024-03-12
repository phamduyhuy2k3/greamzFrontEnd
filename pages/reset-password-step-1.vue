<template>
  <section
      id="login-section"
      class="p-5 flex justify-center align-middle pt-16"
      style=""
  >

    <div
        class="w-full lg:max-w-xl p-3 rounded-lg shadow-xl dark:bg-gray-800 bg-[#181a21]"
    >
      <NuxtLink to="/login" class="">
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
          <path fill="currentColor"
                d="m7.825 13l4.9 4.9q.3.3.288.7t-.313.7q-.3.275-.7.288t-.7-.288l-6.6-6.6q-.15-.15-.213-.325T4.425 12q0-.2.063-.375T4.7 11.3l6.6-6.6q.275-.275.688-.275t.712.275q.3.3.3.713t-.3.712L7.825 11H19q.425 0 .713.288T20 12q0 .425-.288.713T19 13H7.825Z"/>
        </svg>
      </NuxtLink>

      <div class="space-y- p-3">
        <h2 class="text-sm font-bold text-white flex items-center justify-center px-10">Enter the email address associated
          with your account and we'll send you a link to reset your password</h2>
        <div
            v-if="alert && alert.type !== 'error'"
            class="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400"
            role="alert"
        >
          <span class="font-medium">{{ alert.message }}</span>
        </div>

        <form class="mt-8 space-y-6 flex flex-col" @submit.prevent="sendRequest()">
          <div>
            <label
                for="email"
                class="block mb-2 text-sm font-medium text-[#1999ff] uppercase font-weight-black"
            >Email</label
            >
            <div class="relative">
              <input
                  id="email"
                  type="email"
                  name="text"
                  v-model="emailInput.email"
                  class="bg-[#32353c] text-white border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="Your email"
                  required
                  @input="v$.email.$touch"
                  @blur="v$.email.$touch"
              />
              <Icon
                  v-if="!v$.email.$invalid || v$.email.$error"
                  class="absolute top-0 bottom-0 right-2 h-full text-xl text-green-500"
                  :class="{
                'text-green-500': v$.email.$validate,
                'text-yellow-500': v$.email.$error,
              }"
                  :name="`${
                !v$.email.$invalid
                   ? 'mdi:check-circle-outline'
                  : 'mdi:alert-circle-outline'
              }`"
              />
            </div>
            <p v-for="error of v$.email.$errors" :key="error.$uid">
              <strong class="text-red-500">{{ error.$message }}</strong>
            </p>
          </div>
          <button v-if="!pending" type="submit"
                  class="w-full px-5 py-3 mx-auto text-base font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 sm:w-auto dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Send request
          </button>
          <button v-else type="button" disabled
                  class="w-full px-5 py-3 mx-auto text-base font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 sm:w-auto dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Sending request
            <p>
              <n-spin size="medium"/>
            </p>
          </button>


        </form>
      </div>
    </div>
  </section>
</template>

<script setup>
import {useVuelidate} from "@vuelidate/core";

definePageMeta({
  layout: "auth",
  breadcrumb: "Reset password step 1",
});
import {
  required,
  email, helpers
} from "@vuelidate/validators";
import Swal from "sweetalert2";

const config = useRuntimeConfig()
const pending = ref(false)

async function isEmailExisted(value) {
  if (!value) return true

  const {data, error} = await useFetch(
      "/api/server/v1/auth/validate-email-provider-local/" + value,
      {
        method: "GET",
      },
  );
  if (error.value) {
    console.log(error.value);
    alert.value = {
      type: "error",
      message: error.value.message,
    };

    return false;
  }
  return data.value;
}

const emailInput = reactive({
  email: ''
})
const rules = computed(() => {
  return {
    email: {
      required: helpers.withMessage("Email is required", required),
      email: helpers.withMessage("Email is not valid", email),
    },

  };
});
const v$ = useVuelidate(rules, emailInput);
const alert = ref(null);
const sendRequest = async () => {
  const isFormValid = await v$.value.$validate();
  if (!isFormValid) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Please, fill the form correctly",
    });
    return;
  }
  pending.value = true
  const {data, error} = await useFetch(
      "/api/server/v1/auth/send-reset-password-email",
      {
        key: 'resetpassword' + Math.random() + 1000,
        method: "POST",
        query: {
          email: emailInput.email
        }
      },
  );
  if (error.value) {
    v$.value.$reset()
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: error.value,
    });
    console.log(error);
    pending.value = false
    return;
  }
  if (data.value) {
    pending.value = false
    useRouter().push({path: '/reset-password-update'})
  }
}
</script>

<style scoped>

</style>