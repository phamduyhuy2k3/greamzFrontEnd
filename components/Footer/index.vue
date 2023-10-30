<template>
  <footer
    class="card-footer"
    style="
      background-color: #313234;
      width: 100%;
      height: 100px;
      padding: 20px 150px;
      color: whitesmoke;
    "
  >
    <div style="float: left; padding-right: 10px; height: 100%">
      <img
        src="https://store.akamai.steamstatic.com/public/images/footerLogo_valve_new.png"
        width="88px"
        height="25px"
        alt="Valve Software"
      />
    </div>
    <div style="float: right; padding-left: 10px; height: 100%">
      <img
        src="https://store.cloudflare.steamstatic.com/public/images/v6/logo_steam_footer.png"
        alt="Valve Software"
        width="92px"
        height="26px"
      />
    </div>
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
  </footer>
</template>

<script setup></script>

<style scoped>
.overlay a:hover,
.overlay a:focus {
  color: #f1f1f1;
  text-decoration: none;
}

.carousel-inner img {
  width: 100%;
  height: 100%;
}

@media screen and (max-width: 860px) {
  .card-footer {
    display: none;
  }
}
</style>
