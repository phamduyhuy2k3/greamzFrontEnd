<script>



import {
  required,
  email,
  sameAs,
  helpers,
  minLength,
  maxLength,
  createI18nMessage
} from "@vuelidate/validators";

import {useVuelidate} from "@vuelidate/core";
import {useMessage} from 'naive-ui'
import VOtpInput from "vue3-otp-input";
export default {
  middleware: ['auth'],
  methods: {
    async changeEmailHandle() {
      const isFormValid = await this.vEmail$.$validate();
      this.pending = true
      if (!isFormValid) {
        this.message.error(this.$t('profile.security.changeEmail.alert.error'))
        this.pending = false
        return;
      }
      const {data,error} = await useAsyncData('changeEmail_validate_password',
          () =>
              $fetch(`/api/server/v1/user/change-email-step-1`, {
                method: 'POST',
                headers: {
                  'Authorization': `Bearer ${this.token}`
                },
                body: JSON.stringify(this.changeEmail)
              })
      )
      if(error.value){
        this.message.error(this.$t('profile.security.changeEmail.alert.error'))
        this.pending = false
        return;
      }
      if(data.value){
        this.sendOtpRequest()
      }

    },
    async changePasswordHandle() {
      const isFormValid = await this.vPassword$.$validate();
      this.pendingPassword = true
      if (!isFormValid) {
        this.message.error(this.$t('profile.security.changePassword.alert.error'))
        this.pendingPassword = false
        return;
      }
      const {data} = await useAsyncData('changePassword',
          () =>
              $fetch(`/api/server/v1/user/change-password`, {
                method: 'POST',
                headers: {
                  'Authorization': `Bearer ${this.token}`
                },
                body: JSON.stringify(this.changePassword)
              })
      )
      if(data.value){
        this.message.success(this.$t('profile.security.changePassword.alert.success'))
        this.pendingPassword = false
        this.changePassword.oldPassword=""
        this.changePassword.newPassword=""
        this.changePassword.confirmPassword=""
      }else {
        this.message.error(this.$t('profile.security.changePassword.alert.error'))
        this.pendingPassword = false

      }
    },
    async sendOtpRequest ()  {
      this.otp = "";
      let minm = 100000;
      let maxm = 999999;

      this.otpForVerify =  Math.floor(Math
          .random() * (maxm - minm + 1)) + minm;
      const {error}=await useAsyncData('send-otp',
          ()=>
              $fetch("/api/server/v1/auth/send-otp-email", {
                method: "POST",
                body: JSON.stringify({
                  email: this.changeEmail.confirmNewEmail,
                  otp: this.otpForVerify,
                }),
              })
      )
      if(error.value){
        this.message.error(this.$t('profile.security.changeEmail.alert.otp.sendFailed'))
        this.pending = false
      }else {
        this.changeEmailStep=2
        this.message.success(this.$t('profile.security.changeEmail.alert.otp.sendSuccess'))
        this.pending = false
      }

    },
    async validateOtp(){
      this.pending = true
      let otp=parseInt(this.otp)

      if(otp===this.otpForVerify){
        const {data,error} = await useAsyncData('changeEmail_validate_password',
            () =>
                $fetch(`/api/server/v1/user/change-email-step-2`, {
                  method: 'POST',
                  headers: {
                    'Authorization': `Bearer ${this.token}`
                  },
                  body: JSON.stringify(this.changeEmail)
                })
        )
        if(error.value){
          this.message.error(this.$t('profile.security.changeEmail.alert.error'))
          this.pending = false
          return;
        }
        if(data.value){
          this.changeEmailStep=1
          this.otp=""
          this.otpForVerify=""
          this.invalidOtp=false
          this.pending = false
          this.message.success(this.$t('profile.security.changeEmail.alert.success'))
          setTimeout(()=>{
            this.logUserOut()
          },2000)
        }

      }else {
        this.invalidOtp=true
        this.pending = false
        setTimeout(()=>{
          this.invalidOtp=false
        },2000)
      }
    },

  },

  setup() {
    const {userProfile, setProfile, token,refreshToken,setToken,logUserOut} = useAuthStore()
    const emailRef = ref(userProfile.email)
    const config = useRuntimeConfig()

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
    const changeEmail = reactive({
      newEmail: '',
      confirmNewEmail: '',
      currentPassword: '',
    })
    const changeEmailRules = computed(()=>{
      return {
        newEmail: {
          required: helpers.withMessage("profile.security.changeEmail.validate.require.newEmail", required),
          email: helpers.withMessage("profile.security.changeEmail.validate.email.invalidFormat", email),
          isEmailExisted: helpers.withMessage(
              "register.validate.email.isExisted",
              helpers.withAsync(isEmailExisted),
          ),
        },
        confirmNewEmail: {
          required: helpers.withMessage("profile.security.changeEmail.validate.require.confirmNewEmail", required),
          sameAs: helpers.withMessage("profile.security.changeEmail.validate.sameAs.confirmNewEmail", sameAs(changeEmail.newEmail)),
        },
        currentPassword: {
          required: helpers.withMessage("profile.security.changeEmail.validate.require.currentPassword", required),
        },
      }
    })
    const changePassword = reactive({
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
    })
    const oneUpperCase = (value) => /[A-Z]/.test(value);
    const oneSpecialChar = (value) =>
        /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(value);
    const oneNumber = (value) => /[0-9]/.test(value);
    const changePasswordRules = computed(() => {
          return {
            oldPassword: {
              required: helpers.withMessage("profile.security.changePassword.validate.require.oldPassword", required),
            },
            newPassword: {
              required: helpers.withMessage("profile.security.changePassword.validate.require.newPassword", required),
              minLength: helpers.withMessage("profile.security.changePassword.validate.minLength.newPassword", minLength(8)),
              maxLength: helpers.withMessage("profile.security.changePassword.validate.maxLength.newPassword", maxLength(20)),
              oneUpperCase: helpers.withMessage(
                  "register.validate.oneUpperCase.password",
                  oneUpperCase,
              ),
              oneSpecialChar: helpers.withMessage(
                  "register.validate.oneSpecialCharacter.password",
                  oneSpecialChar,
              ),
              oneNumber: helpers.withMessage(
                  "register.validate.oneNumber.password",
                  oneNumber,
              ),
            },
            confirmPassword: {
              required: helpers.withMessage("profile.security.changePassword.validate.require.confirmPassword", required),
              sameAs: helpers.withMessage("profile.security.changePassword.validate.sameAs.confirmPassword", sameAs(changePassword.newPassword))
            },
          }
        }
    )
    const vEmail$ = useVuelidate(changeEmailRules, changeEmail);
    const vPassword$ = useVuelidate(changePasswordRules, changePassword);
    const router = useRouter()
    const pending = ref(false)
    const message = useMessage()
    const changeEmailStep=ref(1)
    const otp = ref("");
    const otpForVerify = ref("");
    const invalidOtp = ref(false);
    const pendingPassword = ref(false)
    return {
      emailRef,
      userProfile,
      setProfile,
      pending,
      message,
      router,
      changeEmail,
      changePassword,
      vEmail$,
      vPassword$,
      config,
      token,
      changeEmailStep,
      otp,
      otpForVerify,
      invalidOtp,
      refreshToken,
      setToken,logUserOut,pendingPassword
    }
  }
};
</script>
<template>
  <div class="bg-[#1f254a] p-12">
    <div>
      <div class="font-bold text-[1.3rem]">Account security</div>
      <span class="font-thin">{{ emailRef }}</span>
    </div>
    <div class="w-full grid grid-flow-row md:grid-flow-col grid-cols-12 mt-3">
      <div class="col-span-6">
        <span class="font-bold text-[1.3rem]">{{ $t("profile.security.changeEmail.title") }}</span>
        <form v-if="changeEmailStep===1" class="mt-8 space-y-6" @submit.prevent="changeEmailHandle()">
          <div>
            <label
                for="currentPassword"
                class="block mb-2 text-sm font-medium text-[#1999ff] uppercase font-weight-black"
            >{{ $t("profile.security.changeEmail.label.currentPassword") }}</label
            >
            <div class="relative">
              <input
                  id="currentPassword"
                  v-model="changeEmail.currentPassword"
                  type="password"
                  name="currentPassword"
                  placeholder="••••••••"
                  class="bg-[#32353c] text-white border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  @input="vEmail$.currentPassword.$touch"
                  @blur="vEmail$.currentPassword.$touch"
                  autocomplete="off"
              />
              <Icon
                  v-if="!vEmail$.currentPassword.$invalid || vEmail$.currentPassword.$error"
                  class="absolute top-0 right-2 h-full text-xl text-green-500"
                  :class="{
                'text-green-500': vEmail$.currentPassword.$validate,
                'text-yellow-500': vEmail$.currentPassword.$error,
              }"
                  :name="`${
                !vEmail$.currentPassword.$error
                  ? 'icon-park-outline:check-one'
                  : 'simple-line-icons:exclamation'
              }`"
              />
            </div>
            <p v-for="error of vEmail$.currentPassword.$errors" :key="error.$uid">
              <strong class="text-red-500">{{ $t(error.$message) }}</strong>
            </p>
          </div>
          <div>
            <label
                for="newEmail"
                class="block mb-2 text-sm font-medium text-[#1999ff] uppercase font-weight-black"
            >{{ $t("profile.security.changeEmail.label.newEmail") }}</label
            >
            <div class="relative">
              <input
                  id="newEmailBoy"
                  v-model="changeEmail.newEmail"
                  type="email"
                  name="newEmailBoy"
                  placeholder="abcxyz@mail.com"
                  class="bg-[#32353c] text-white border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  @input="vEmail$.newEmail.$touch"
                  @blur="vEmail$.newEmail.$touch"
                  autocomplete="off"
              />
              <Icon
                  v-if="!vEmail$.newEmail.$invalid || vEmail$.newEmail.$error"
                  class="absolute top-0 right-2 h-full text-xl text-green-500"
                  :class="{
                'text-green-500': vEmail$.newEmail.$validate,
                'text-yellow-500': vEmail$.newEmail.$error,
              }"
                  :name="`${
                !vEmail$.newEmail.$error
                  ? 'icon-park-outline:check-one'
                  : 'simple-line-icons:exclamation'
              }`"
              />
            </div>
            <p v-for="error of vEmail$.newEmail.$errors" :key="error.$uid">
              <strong class="text-red-500">{{ $t(error.$message) }}</strong>
            </p>
          </div>
          <div>
            <label
                for="confirmNewEmail"
                class="block mb-2 text-sm font-medium text-[#1999ff] uppercase font-weight-black"
            >{{ $t("profile.security.changeEmail.label.confirmNewEmail") }}</label
            >
            <div class="relative">
              <input
                  id="confirmNewEmail"
                  v-model="changeEmail.confirmNewEmail"
                  type="email"
                  name="confirmNewEmail"
                  placeholder=""
                  class="bg-[#32353c] text-white border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  @input="vEmail$.confirmNewEmail.$touch"
                  @blur="vEmail$.confirmNewEmail.$touch"
              />
              <Icon
                  v-if="!vEmail$.confirmNewEmail.$invalid || vEmail$.confirmNewEmail.$error"
                  class="absolute top-0 right-2 h-full text-xl text-green-500"
                  :class="{
                'text-green-500': vEmail$.confirmNewEmail.$validate,
                'text-yellow-500': vEmail$.confirmNewEmail.$error,
              }"
                  :name="`${
                !vEmail$.confirmNewEmail.$error
                  ? 'icon-park-outline:check-one'
                  : 'simple-line-icons:exclamation'
              }`"
              />
            </div>
            <p v-for="error of vEmail$.confirmNewEmail.$errors" :key="error.$uid">
              <strong class="text-red-500">{{ $t(error.$message) }}</strong>
            </p>
          </div>
          <button
              v-if="!pending"
              type="submit"
              class="bg-[#1999ff] text-white font-bold uppercase text-sm px-6 py-3 rounded-lg w-full"
          >
            Submit
          </button>
          <button
              v-else
              type="button"
              disabled
              class="bg-[#1999ff] font-bold uppercase text-sm px-6 py-3 rounded-lg w-full"
          >
            <n-spin size="medium" />

          </button>
        </form>
        <form v-if="changeEmailStep===2" class="mt-8 space-y-6" @submit.prevent="validateOtp()">
          <a @click="changeEmailStep=1" class="cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
              <path fill="currentColor"
                    d="m7.825 13l4.9 4.9q.3.3.288.7t-.313.7q-.3.275-.7.288t-.7-.288l-6.6-6.6q-.15-.15-.213-.325T4.425 12q0-.2.063-.375T4.7 11.3l6.6-6.6q.275-.275.688-.275t.712.275q.3.3.3.713t-.3.712L7.825 11H19q.425 0 .713.288T20 12q0 .425-.288.713T19 13H7.825Z"/>
            </svg>
          </a>
          <n-alert v-if="invalidOtp" type="error">
            Invalid codes
          </n-alert>
          <n-card size="huge" :hoverable="true">

            <template #default>
              <div class="flex flex-col items-center justify-center gap-4">
                <h3 class="text-h6 mb-4">Verify Your Email</h3>
                <div class="text-body-2">
                  We sent a verification code to {{changeEmail.confirmNewEmail}} <br>
                  Please check your email and paste the code below.
                </div>
                <div class="flex flex-wrap">
                  <Otp

                      v-model="otp"
                  />
                </div>
                <div class="text-caption ">
                  Didn't receive the code? <a class="text-[#8b5cf6]" @click.prevent="sendOtpRequest()">Resend</a>
                </div>
              </div>
            </template>

          </n-card>

          <button
              v-if="!pending"
              type="submit"
              class="w-full px-5 py-3 text-base font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 sm:w-auto dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Submit
          </button>
          <button
              v-else
              type="button"
               disabled
              class="w-full px-5 py-3 text-base font-medium text-center bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 sm:w-auto dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            <n-spin size="medium" />
          </button>
        </form>
      </div>
      <div class="md:block hidden w-[5px] mx-auto bg-gray-700 h-full"></div>
      <div class="col-span-6">
        <span class="font-bold text-[1.3rem]">{{ $t("profile.security.changePassword.title") }}</span>
        <form class="mt-8 space-y-6" @submit.prevent="changePasswordHandle()" autocomplete="off">
          <div>
            <label
                for="oldPassword"
                class="block mb-2 text-sm font-medium text-[#1999ff] uppercase font-weight-black"
            >{{ $t("profile.security.changePassword.label.currentPassword") }}</label
            >
            <div class="relative">
              <input
                  id="oldPassword"
                  v-model="changePassword.oldPassword"
                  type="password"
                  name="oldPassword"
                  placeholder="••••••••"
                  class="bg-[#32353c] text-white border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  @input="vPassword$.oldPassword.$touch"
                  @blur="vPassword$.oldPassword.$touch"
                  autocomplete="off"
              />
              <Icon
                  v-if="!vPassword$.oldPassword.$invalid || vPassword$.oldPassword.$error"
                  class="absolute top-0 right-2 h-full text-xl text-green-500"
                  :class="{
                'text-green-500': vPassword$.oldPassword.$validate,
                'text-yellow-500': vPassword$.oldPassword.$error,
              }"
                  :name="`${
                !vPassword$.oldPassword.$error
                  ? 'icon-park-outline:check-one'
                  : 'simple-line-icons:exclamation'
              }`"
              />
            </div>
            <p v-for="error of vPassword$.oldPassword.$errors" :key="error.$uid">
              <strong class="text-red-500">{{ $t(error.$message) }}</strong>
            </p>
          </div>
          <div>
            <label
                for="newPassword"
                class="block mb-2 text-sm font-medium text-[#1999ff] uppercase font-weight-black"
            >{{ $t("profile.security.changePassword.label.newPassword") }}</label>
            <div class="relative">
              <input
                  id="newPassword"
                  v-model="changePassword.newPassword"
                  type="password"
                  name="newPassword"
                  placeholder="••••••••"
                  class="bg-[#32353c] text-white border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  @input="vPassword$.newPassword.$touch"
                  @blur="vPassword$.newPassword.$touch"
                  autocomplete="off"
              />
              <Icon
                  v-if="!vPassword$.newPassword.$invalid || vPassword$.newPassword.$error"
                  class="absolute top-0 right-2 h-full text-xl text-green-500"
                  :class="{
                'text-green-500': vPassword$.newPassword.$validate,
                'text-yellow-500': vPassword$.newPassword.$error,
              }"
                  :name="`${
                !vPassword$.newPassword.$error
                  ? 'icon-park-outline:check-one'
                  : 'simple-line-icons:exclamation'
              }`"
              />

            </div>
            <p v-for="error of vPassword$.newPassword.$errors" :key="error.$uid">
              <strong class="text-red-500">{{ $t(error.$message) }}</strong>
            </p>
          </div>
          <div>
            <label
                for="confirmPassword"
                class="block mb-2 text-sm font-medium text-[#1999ff] uppercase font-weight-black"
            >{{ $t("profile.security.changePassword.label.confirmPassword") }}</label
            >
            <div class="relative">
              <input
                  id="confirmPassword"
                  v-model="changePassword.confirmPassword"
                  type="password"
                  name="confirmPassword"
                  placeholder="••••••••"
                  class="bg-[#32353c] text-white border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  @input="vPassword$.confirmPassword.$touch"
                  @blur="vPassword$.confirmPassword.$touch"
              />
              <Icon
                  v-if="!vPassword$.confirmPassword.$invalid || vPassword$.confirmPassword.$error"
                  class="absolute top-0 right-2 h-full text-xl text-green-500"
                  :class="{
                'text-green-500': vPassword$.confirmPassword.$validate,
                'text-yellow-500': vPassword$.confirmPassword.$error,
              }"
                  :name="`${
                !vPassword$.confirmPassword.$error
                  ? 'icon-park-outline:check-one'
                  : 'simple-line-icons:exclamation'
              }`"
              />
            </div>
            <p v-for="error of vPassword$.confirmPassword.$errors" :key="error.$uid">
              <strong class="text-red-500">{{ $t(error.$message) }}</strong>
            </p>
          </div>
          <button
              type="submit"
              class="bg-[#1999ff] text-white font-bold uppercase text-sm px-6 py-3 rounded-lg w-full"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  </div>
</template>


<style scoped>

</style>