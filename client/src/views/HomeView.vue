<template>
  <section>
    <main class="flex h-full">
      <BigSideBar />
      <div class="flex-auto">
        <DashboardNavbar />
        <div class="w-[90vw] mx-auto my-0 py-8 px-0">
          <RouterView />
        </div>
      </div>
    </main>
  </section>
</template>

<script setup lang="ts">
import BigSideBar from '@/components/layout/BigSideBar.vue';
import DashboardNavbar from '@/components/layout/DashboardNavbar.vue';

</script>
