<template>

  <div class="bg-[#1f254a] p-12">
    <div v-if="pending" class="flex flex-col justify-center items-center">
      <n-spin size="medium"/>
      <span class="text-[1.2rem] font-bold">Processing....</span>
    </div>
    <div class="grid grid-cols-12">
      <div class="col-span-5">
        <div class="flex flex-col gap-3">
          <div class="font-bold text-[1.3rem]">Profile picture</div>
          <div id="edit-avatar" class="flex items-center gap-3 ">
            <form id="avatar-form" class="w-full h-full" style="display: none">
              <input ref="fileInput" type="file" accept="image/*" @change="handleFileSelect" hidden>
            </form>
            <img @click="openFileInput" class="h-20 w-20 rounded-full cursor-pointer" :src="profile.photo"
                 alt="userAvatar">
            <div @click="openFileInput" class="cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 256 256">
                <path fill="currentColor"
                      d="M208 58h-28.79L165 36.67a6 6 0 0 0-5-2.67H96a6 6 0 0 0-5 2.67L76.78 58H48a22 22 0 0 0-22 22v112a22 22 0 0 0 22 22h160a22 22 0 0 0 22-22V80a22 22 0 0 0-22-22Zm10 134a10 10 0 0 1-10 10H48a10 10 0 0 1-10-10V80a10 10 0 0 1 10-10h32a6 6 0 0 0 5-2.67L99.21 46h57.57L171 67.33a6 6 0 0 0 5 2.67h32a10 10 0 0 1 10 10ZM128 90a42 42 0 1 0 42 42a42 42 0 0 0-42-42Zm0 72a30 30 0 1 1 30-30a30 30 0 0 1-30 30Z"/>
              </svg>
              <span>.jpg .png</span>
            </div>
          </div>
        </div>
      </div>
      <div class="col-span-7">
        <div class="flex flex-col items-center justify-center gap-3">
          <form @submit.prevent="updateUsername()" class="flex items-center w-full  gap-3">
            <fieldset class="w-full">
              <legend class="text-[1.3rem] font-bold">Nick name</legend>
              <input type="text" v-model="profile.username"
                     class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            </fieldset>
            <button type="submit"
                    class="mt-8 focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5  dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">
              Submit
            </button>
          </form>
          <form @submit.prevent="updateFullname()" class="flex items-center w-full  gap-5">
            <fieldset class="w-full">
              <legend class="text-[1.3rem] font-bold">Full name</legend>
              <input type="text" v-model="profile.fullname"
                     class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            </fieldset>
            <button type="submit"
                    class="mt-8 focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5  dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>


</template>

<script>


import {useMessage} from 'naive-ui'

export default {
  middleware: ['auth'],
  methods: {
    openFileInput() {

      this.$refs.fileInput.click();
    },
    async handleFileSelect(event) {
      const selectedFile = event.target.files[0];
      if (selectedFile) {
        const formData = new FormData();
        formData.append('file', selectedFile);
        this.pending = true
        const {data: cookie, error: cookieError} = await useFetch(`/api/client/cookie`, {
              method: 'GET',
            }
        )
        const {data, error} = await useFetch(`${cookie.value.apiBaseUrl}/api/v1/file/image`, {
          method: 'POST',
          server: false,
          headers: {

            Authorization: `Bearer ${cookie.value.accessToken}`,
          },
          body: formData,
        })

        if (error.value) {
          console.log(error.value)
          this.message.error("Change avatar failed")
          this.pending = false
          return;
        }
        if (data.value) {
          this.message.success("Upload avatar success")
          this.profile.photo = data.value.url
          await this.updatePhoto()
          this.pending = false
        }
      }
    },
    async updatePhoto() {
      this.pending = true
      const {data, error} = await useFetch(`/api/server/user/edit-photo`, {

        method: 'PUT',
        headers: {
          Authorization: `Bearer`
        },
        body: JSON.stringify(this.profile),
      })

      if (error.value) {
        this.message.error(JSON.stringify(error.value))
        this.pending = false;
        return;
      }
      if (data.value) {
        this.message.success("Update profile success")
        this.setProfile(data.value)
        this.pending = false
      }
    },
    async updateUsername() {
      this.pending = true
      console.log(this.profile)
      const {data, error} = await useFetch(`/api/server/user/edit-username`, {
        key: 'update-username_' + Math.random() * 100,
        method: 'PUT',
        headers: {
          Authorization: `Bearer`
        },
        body: JSON.stringify({
          username: this.profile.username,
          id: this.profile.id
        }),
      })

      if (error.value) {
        console.log(error)
        this.message.error(error.value.data.username)
        this.pending = false;
        return;
      }
      if (data.value) {
        this.message.success("Update username success")
        this.pending = false
        this.setProfile(data.value)
      }

    },
    async updateFullname() {
      this.pending = true
      const {data, error} = await useFetch(`/api/server/user/edit-fullname`, {
        key: 'update-fullname_' + Math.random(),
        method: 'PUT',
        headers: {
          Authorization: `Bearer`
        },
        body: JSON.stringify({
          fullname: this.profile.fullname,
          id: this.profile.id
        }),
      })

      if (error.value) {
        this.message.error(JSON.stringify(error.value))
        this.pending = false;
        return;
      }
      if (data.value) {
        this.message.success("Update fullname success")
        this.pending = false
        this.setProfile(data.value)
      }

    }
  },

  setup() {
    const {userProfile, setProfile} = useAuthStore()
    const profile = ref({
      id: userProfile.id,
      username: userProfile.username,
      fullname: userProfile.fullname,
      photo: userProfile.photo
    })
    const router = useRouter()
    const pending = ref(false)
    const message = useMessage()
    return {profile, userProfile, setProfile, pending, message, router}
  }
};
</script>

<style scoped>

</style>