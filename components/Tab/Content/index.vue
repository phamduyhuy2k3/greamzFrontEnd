<template>
  <div class="hidden p-4 rounded-lg bg-[#0891b2]" :id="id" role="tabpanel">
    <div class="grid grid-cols-12 ">
      <div class="col-span-8">
        <div class="grid grid-cols-10">
          <div class="col-span-6">
            <img src="">
          </div>
          <div class="col-span-4">

          </div>
        </div>
      </div>
      <div class="col-span-4">

      </div>
    </div>
  </div>

</template>

<script setup>

defineProps({
  tabName: {
    type: String,
    required: true
  },
  id: {
    type: String,
    required: true
  }
})

</script>

<style scoped>

</style>