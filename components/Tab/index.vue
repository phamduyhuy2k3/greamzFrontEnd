<template>

  <section class="w-[85%] mt-3 mx-auto">
    <div class="mb-4 border-b border-gray-200 dark:border-gray-700">
      <ul class="flex flex-wrap -mb-px text-sm font-medium text-center" id="myTab">
        <li class="" role="presentation">
          <button class="inline-block p-4 border-b-2 " id="profile-tab">New & Trending</button>
        </li>
        <li class="" role="presentation">
          <button class="inline-block p-4 border-b-2 " id="dashboard-tab">Top Sellers</button>
        </li>
        <li class="" role="presentation">
          <button class="inline-block p-4 border-b-2 " id="settings-tab">Popular Upcoming</button>
        </li>
        <li role="presentation">
          <button class="inline-block p-4 border-b-2 " id="contacts-tab" >Specials</button>
        </li>
      </ul>
    </div>
    <div id="myTabContent" class="px-5 py-4 tab-bg" style="">
      <TabContent tab-name="New & Trending" id="newTrending"/>
      <TabContent tab-name="Top Sellers" id="topSeller"/>
      <TabContent tab-name="Popular Upcoming" id="popularUpcoming"/>
      <TabContent tab-name="Specials" id="special"/>
    </div>
  </section>

</template>

<script setup lang="ts">
import { Tabs } from "flowbite";
import type { TabsOptions, TabsInterface, TabItem } from "flowbite";
onMounted(() => {
  const tabElements: TabItem[] = [
    {
      id: 'profile',
      triggerEl: document.querySelector('#profile-tab') ,
      targetEl: document.querySelector('#newTrending')
    },
    {
      id: 'dashboard',
      triggerEl: document.querySelector('#dashboard-tab'),
      targetEl: document.querySelector('#topSeller')
    },
    {
      id: 'settings',
      triggerEl: document.querySelector('#settings-tab'),
      targetEl: document.querySelector('#popularUpcoming')
    },
    {
      id: 'contacts',
      triggerEl: document.querySelector('#contacts-tab'),
      targetEl: document.querySelector('#special')
    }
  ];
  const options: TabsOptions = {
    defaultTabId: 'settings',
    activeClasses: 'text-blue-600 hover:text-blue-600 dark:text-blue-500 dark:hover:text-blue-400 border-blue-600 dark:border-blue-500 tab-bg',
    inactiveClasses: 'text-gray-500 hover:text-gray-600 dark:text-gray-400 border-gray-100 hover:border-gray-300 dark:border-gray-700 dark:hover:text-gray-300',
    onShow: (tabs, tab) => {
      console.log(tab.id + ' tab is shown');
    }
  };
  const tabs: TabsInterface = new Tabs(tabElements, options);
  tabs.show('profile')
});

</script>

<style scoped>
.tab-bg{
  background: linear-gradient( to bottom, rgba(42,71,94,1.0) 5%, rgba(42,71,94,0.0) 70%)
}
</style>