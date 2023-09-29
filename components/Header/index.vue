<template>
  <nav class="bg-[#171a21] text-white fixed w-full z-20 top-0 left-0 mb-16">
    <div class="max-w-screen-xl flex flex-wrap items-center justify-start mx-auto p-4 ">
      <div class="flex ">

        <button @click="collapseNavbar.tooggle()" data-collapse-toggle="navbar-sticky" type="button" class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-sticky" aria-expanded="false">
          <span class="sr-only">Open main menu</span>
          <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M1 1h15M1 7h15M1 13h15"/>
          </svg>
        </button>
      </div>
      <NuxtLink to="https://flowbite.com/" class="flex items-center ms-16">
        <IconSteam :width="170" :height="50"/>

      </NuxtLink>

      <div class="items-center justify-between hidden w-full md:flex md:w-auto md:order-1 ms-16" id="navbar-sticky">
        <ul class="flex flex-col p-4 md:p-0 mt-4 font-medium text-[1.3em] text-white   md:flex-row md:space-x-1 md:mt-0   ">
          <li>
            <NuxtLink href="#"
               class="block py-2 pl-3 pr-4  bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500"
               aria-current="page">Home</NuxtLink>
          </li>
          <li>
            <NuxtLink href="#"
               class="block py-2 pl-3 pr-4  rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">About</NuxtLink>
          </li>
          <li>
            <NuxtLink href="#"
               class="block py-2 pl-3 pr-4  rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Services</NuxtLink>
          </li>
          <li>
            <NuxtLink href="#"
               class="block py-2 pl-3 pr-4  rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Contact</NuxtLink>
          </li>
        </ul>
      </div>
    </div>
  </nav>


</template>
<script setup>
import {Collapse} from 'flowbite'

onMounted(() => {
  const collapseNavbar = new Collapse(
      document.getElementById('navbar-sticky')
      ,

      document.getElementById('navbar-hamburger')
  )
})

</script>
