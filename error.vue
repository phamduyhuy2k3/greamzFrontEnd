<template>

    <div>
      <div class="text-4xl">You've Arrived Here on Error, boss</div>
      <div class="text-2xl">{{   }}</div>
      <div class="text-2xl">{{ error.message }}</div>
      <button class="font-bold button" @click="clearError({ redirect: '/' })">Back</button>
    </div>

</template>

<script setup>
defineProps(['error'])
</script>

<style scoped>
.button {
  padding: 4px 6px;
  margin: 10px 0px;
  background: black;
  color: white;
}
</style>