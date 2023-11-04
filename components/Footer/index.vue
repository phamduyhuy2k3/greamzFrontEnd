<template>
  <footer
    class="flex justify-center items-center text-center text-gray-500 text-sm py-4 bg-[#171a21]"

  >
    <img
        src="https://store.akamai.steamstatic.com/public/images/footerLogo_valve_new.png"
        alt="Valve Software"
        width="92"
        height="26"
    />
    <p>
      {{ $t("footer1") }}
      <br />
      {{ $t("footer2")
      }}<NuxtLink to="#" class="text-blue-700">{{ $t("policy") }}</NuxtLink> |
      <NuxtLink to="#" class="text-blue-700">{{ $t("terms") }}</NuxtLink> |
      <NuxtLink class="text-blue-700" to="#">{{ $t("ssa") }}</NuxtLink> |
      <NuxtLink class="text-blue-700" to="#">{{ $t("refund") }}</NuxtLink> |
      <NuxtLink class="text-blue-700" to="#">{{ $t("cookie") }}</NuxtLink>
    </p>
    <img
        src="https://store.akamai.steamstatic.com/public/images/v6/logo_steam_footer.png"
        alt="Valve Software"
        width="92"
        height="26"
    />
  </footer>
</template>

<script setup></script>

<style scoped>

</style>
