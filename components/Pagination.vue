<template>
  <div class="flex justify-center items-center text-white">
    <n-pagination
        class=""
        :page-slot="5"
        v-model:page="currentPageRef"
        v-model:page-size="sizeCurrent"
        :page-count="totalPages"
        size="medium"
        show-size-picker
        show-quick-jumper
        :page-sizes="[9, 15, 21]"
    >
      <template #goto>
        <span class="text-white font-bold">Go to</span>
      </template>
      <template #label="info">
        <span class="text-white font-bold border-gray-500">{{ info.type==='page' ?info.node: '...'}}</span>
      </template>
      <template #prev>
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24"
             stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M15 19l-7-7 7-7"/>
        </svg>
      </template>
      <template #next>
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24"
             stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M9 5l7 7-7 7"/>
        </svg>
        </template>
    </n-pagination>

  </div>
</template>

<script>
export default {
  props: {
    totalPages: {
      type: Number,
      required: true,
    },
    currentPage: {
      type: Number,
      required: true,
    },
    sizeCurrentPage: {
      type: Number,
      required: true,
    },
  },
  watch: {
    sizeCurrent(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.currentPageRef = 1;
      }
      this.changePage(this.currentPageRef - 1, newVal)
    },
    currentPageRef(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.changePage(newVal - 1, this.sizeCurrent)
      }
    },
  },
  methods: {
    changePage(page, size = 10) {
      this.$emit('page-changed', page, size);
    },
  }
  ,
  setup(props) {
    const currentPageRef = ref(props.currentPage + 1)
    const sizeCurrent = ref(props.sizeCurrentPage)
    watch(() => props.currentPage, (newVal) => {
      currentPageRef.value = newVal + 1;
    });
    return {
      currentPageRef,
      sizeCurrent,
    }
  },

};
</script>

<style>
.pagination {
  list-style: none;
  display: flex;
  justify-content: center;
  align-items: center;
}

.pagination li {
  margin: 0 5px;
}

.pagination button {
  cursor: pointer;
  padding: 5px 10px;
  border: 1px solid #ccc;
}

.pagination button.active {
  background-color: #007bff;
  color: #fff;
}
</style>
