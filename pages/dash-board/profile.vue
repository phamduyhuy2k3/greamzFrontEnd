<template>
  <div class="rounded-lg bg-transparent flex flex-col">

    <div class="grid grid-flow-row-dense md:grid-flow-col md:grid-cols-12">
      <div class="md:col-span-3 md:gap-3">
        <NuxtLink exact-active-class="profile_route"  to="/dash-board/profile/settings-avatar"
                  class="md:flex items-center gap-3 p-2">
          <svg class="w-6 h-6 text-[#b91c1c] dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
               fill="currentColor" viewBox="0 0 20 16">
            <path
                d="M18 0H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2ZM6.5 3a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3.014 13.021l.157-.625A3.427 3.427 0 0 1 6.5 9.571a3.426 3.426 0 0 1 3.322 2.805l.159.622-6.967.023ZM16 12h-3a1 1 0 0 1 0-2h3a1 1 0 0 1 0 2Zm0-3h-3a1 1 0 1 1 0-2h3a1 1 0 1 1 0 2Zm0-3h-3a1 1 0 1 1 0-2h3a1 1 0 1 1 0 2Z"/>
          </svg>
          <div class="flex flex-col justify-start">
            <span class="text-[1.2rem] text-blue-600">Customize your profile</span>
            <span class="text-[1rem]">Avatar, nick name, full name</span>
          </div>
          <div class="ml-auto">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
              <path fill="currentColor" d="M10 6L8.59 7.41L13.17 12l-4.58 4.59L10 18l6-6z"/>
            </svg>
          </div>
        </NuxtLink>
        <NuxtLink  exact-active-class="profile_route"  to="/dash-board/profile/settings-security"
                   class="md:flex items-center gap-3 p-2 ">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-[#b91c1c] dark:text-white"  viewBox="0 0 24 24"><path fill="currentColor" d="M4 22V8h3V6q0-2.075 1.463-3.537T12 1q2.075 0 3.538 1.463T17 6v2h3v14H4Zm8-5q.825 0 1.413-.587T14 15q0-.825-.587-1.412T12 13q-.825 0-1.412.588T10 15q0 .825.588 1.413T12 17ZM9 8h6V6q0-1.25-.875-2.125T12 3q-1.25 0-2.125.875T9 6v2Z"/></svg>
          <div class="flex flex-col justify-start">
            <span class="text-[1.2rem] text-blue-600">Email, password</span>
            <span class="text-[1rem]">Manage your email, password</span>
          </div>
          <div class="ml-auto">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
              <path fill="currentColor" d="M10 6L8.59 7.41L13.17 12l-4.58 4.59L10 18l6-6z"/>
            </svg>
          </div>
        </NuxtLink>
      </div>
      <div class="col-span-9">
        <NuxtPage page-key="static"></NuxtPage>
      </div>
    </div>

  </div>

</template>

<script setup>
definePageMeta({
  breadcrumb: "Your profile",
  middleware: ['auth']
});
const defaultRoute = useRoute();
</script>

<style scoped>
.profile_route{
  background-color: #1f254a;
  border-radius: 0.5rem 0 0 0.5rem;

}
</style>