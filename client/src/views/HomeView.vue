<template>
  <section>
    <main class="flex h-full">
      <BigSideBar />
      <div class="flex-auto">
        <DashboardNavbar />
        <div>
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

<style scoped>
</style>