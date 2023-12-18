<template>
  <div class="px-10  text-black  bg-transparent" >
    <BreadCrumb :breadcrumbs="userBreadCrumb().breadcrumbs"></BreadCrumb>

    <div class="grid grid-cols-12 gap-4 bg-transparent  ">
      <div class="pt-[90px] col-span-3 h-full">
        <div class="sticky top-[12%] overflow-y-auto  card bg-[#BCC7CA] p-3 ">
          <div class="text-[1.8rem] text-center">Filter</div>
          <div class="flex flex-col gap-8 ">

            <fieldset>
              <legend class="text-[1.2rem]">Categories</legend>
              <n-tree-select
                  multiple
                  checkable
                  filterable
                  v-model:value="valueCategories"

                  placeholder="Select categories"
                  :clear-filter-after-select="false"
                  clearable
                  :options="categories"
                  @update:value="onSelect()"

              />
            </fieldset>
<!--            <fieldset>-->
<!--              <legend class="text-[1.2rem]">Platforms</legend>-->
<!--              <n-tree-select-->
<!--                  multiple-->
<!--                  checkable-->
<!--                  filterable-->
<!--                  v-model:value="valuePlatform"-->

<!--                  placeholder="Select platforms"-->
<!--                  :clear-filter-after-select="false"-->
<!--                  clearable-->
<!--                  :options="platforms"-->
<!--                  @update:value="onSelect()"-->

<!--              />-->
<!--            </fieldset>-->
            <fieldset>
              <legend class="text-[1.2rem]">Sort by</legend>
              <n-select
                  filterable
                  v-model:value="valueSorBy"

                  placeholder="Sort by"
                  :clear-filter-after-select="false"
                  clearable
                  :options="sortBys"
                  @update:value="onSelect()"

              />
            </fieldset>

            <div>
              <span class="text-[1.2rem]">
              Price between:
              </span>
              <div class="flex gap-2">
                <div class="flex flex-col">
                  <span>Min</span>
                  <n-input-number
                      :default-value="0"
                      :parse="parseCurrency"
                      :format="formatCurrency"
                      v-model:value="priceMin"
                      :step="100000"
                  />
<!--                  <input type="number" v-model="priceMin"  class="w-[100px] border rounded-lg p-2" placeholder="min"-->
<!--                         step="100000">-->
                </div>
                <div class="flex flex-col">
                  <span>Max</span>
                  <n-input-number
                      :default-value="0"
                      :parse="parseCurrency"
                      :format="formatCurrency"
                      v-model:value="priceMax"
                      :step="100000"
                  />
<!--                  <input type="number" v-model="priceMax" class="w-[100px] border rounded-lg p-2" placeholder="max"-->
<!--                         step="100000">-->
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div  class="col-span-9 overflow-y-auto relative h-full ">
        <div class="sticky top-0 ">
          <div class="relative">
            <div
                class="text-white absolute inset-y-0 left-0 flex items-center pr-3 font-medium text-sm px-4 py-2 ">
              <svg class="w-4 h-4 text-white " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                   viewBox="0 0 20 20">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
              </svg>
            </div>
            <input type="search" id="default-search"
                   @input="debounce(onSelect(), 800)"
                   v-model="search"
                   class="block w-full  pl-11 text-sm text-gray-900 border rounded bg-gray-50 focus:ring-blue-500 focus:border-blue-500 bg-gray-700 border-gray-600 placeholder-gray-400 text-white "
                   placeholder="Search games">

          </div>
        </div>
        <div v-if="pending" class="flex justify-center pt-16 text-white">
          <span  class="loading loading-dots loading-lg"></span>
        </div>
        <div class="px-4" v-if="!pending" >

          <template v-if="!data.empty">
            <InfiniteScrollGameCard :pager="data"/>
          </template>
          <template v-else>
            <div class="flex justify-center items-center  text-white ">
              <span class="text-2xl">No games found</span>
            </div>
          </template>
        </div>
        <Pagination v-if="!data.empty" :totalPages="data.totalPages" :current-page="data.number"  @page-changed="onPageAndSizeChange" :size-current-page="data.size"/>

      </div>

    </div>
  </div>
</template>
<script setup>
useHead( {
  title: 'Search'
})
import {debounce} from "lodash/function.js";
const categories = ref([])
const platforms = ref([])
const parseCurrency = (input) => {
  const nums = input.replace(/(,|\₫|\s)/g, '').trim()
  if (/^\d+(\.(\d+)?)?$/.test(nums)) return Number(nums)
  return nums === '' ? null : Number.NaN
}
const formatCurrency=(value ) => {
  if (value === null) return ''
  return `${value.toLocaleString('en-US')} \u20ab`
}
const sortBys = [
  {
    value: "createdAt_DESC",
    label: 'Newest'
  }, {
    value: "createdAt_ASC",
    label: 'Oldest'
  },
  {
    value: "price_ASC",
    label: 'Price: Low to High'
  },
  {
    value: "price_DESC",
    label: 'Price: High to Low'
  },
]
const router = useRouter()
const routeQuery = await router.currentRoute.value.query
const valueCategories = ref(routeQuery.categories ?
    routeQuery.categories.split(',').map((category) => parseInt(category))
    :
    []);
const valueSorBy = ref(routeQuery.sort ? routeQuery.sort : '');
const valuePlatform = ref(routeQuery.platform ?
    routeQuery.platform.split(',').map((platform) => parseInt(platform))
    : []);
const priceMin = ref(routeQuery.priceMin ? parseInt(routeQuery.priceMin) : 0)
const priceMax = ref(routeQuery.priceMax ? parseInt(routeQuery.priceMax) : 0)
const search = ref(routeQuery.q ? routeQuery.q : '')

useCategory().fetch().then(() => {
  categories.value = useCategory().getCategories.map((category) => {
    return {
      key: category.id,
      label: `${category.name} | (${category.gameCount})`
    }
  })
  platforms.value = useCategory().getPlatforms.map((platform) => {
    return {
      key: platform.id,
      label: platform.name,
    }
  })
})
const route = useRoute()
watch([priceMin, priceMax], ([newMin, olMin], [newMax, oldMax]) => {
  if (newMin > oldMax) {
    priceMin.value = olMin
    return
  }
  if (newMax > olMin) {
    priceMax.value = oldMax
    return
  }
  if (newMin < 0) {
    priceMin.value = 0
    return;
  }
  if (newMax < 0) {
    priceMax.value = 0
    return;
  }

  onSelect()
})
const {data, execute,refresh,pending} = await useAsyncData('gamesFilter-' + routeQuery,
    ()=>
        $fetch(`${useRuntimeConfig().public.apiUrl}/api/v1/game/filter`, {

          method: 'get',
          query: {
            categoriesId: valueCategories.value?.join(','),
            platformId: valuePlatform.value?.join(','),
            sort: valueSorBy.value?.substr(0, valueSorBy.value?.indexOf('_')),
            direction: valueSorBy.value?.substr(valueSorBy.value?.indexOf('_') + 1),
            page: useRoute().query.page ? useRoute().query.page : 0,
            size: useRoute().query.size ? useRoute().query.size : 9,
            minPrice: priceMin.value,
            maxPrice: priceMax.value,
            q: search.value
          },
        })
)
const onPageAndSizeChange=async (page,size) => {
  await router.push({
    path: '/search/',
    query: {
      ...useRoute().query,

      page: page,
      size: size
    }
  })
  await execute().then(() => {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  })
}
const onSelect = async () => {
  await router.push({
    path: '/search/',
    query: {
      ...useRoute().query,
      sort: valueSorBy.value,
      categories: valueCategories.value.join(','),
      platform: valuePlatform.value.join(','),
      priceMin: priceMin.value,
      priceMax: priceMax.value,
      q: search.value,
      page: 0,
      size: 9
    }
  })
  await execute().then(() => {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  })

}


</script>

<style scoped>
.isSelectedPage {
  font-weight: bold;
  color: blue;
}

.button_page {
  @apply rounded-full px-3 py-1 text-sm font-semibold  mr-2 border border-neutral-200 hover:bg-neutral-200 hover:text-white cursor-pointer;
}
</style>