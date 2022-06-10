<template>
  <div class="bg-gray-100">
    <RouterView />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useGlobalStore } from './stores/globalStore';

const globalStore = useGlobalStore();

onMounted(() => {
  console.log('try login')
  globalStore.tryLogin();
})


</script>
