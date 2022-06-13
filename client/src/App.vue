<template>
  <div class="bg-gray-100">
    <RouterView />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useGlobalStore } from './stores/globalStore';

const router = useRouter();
const globalStore = useGlobalStore();

const isAutoLogout = computed(() => {
  return globalStore.isAutoLogout
})

watch(isAutoLogout, (oldVal, newVal) => {
  if (oldVal !== newVal) {
    router.replace('/')
  }
})

onMounted(() => {
  globalStore.tryLogin();
})


</script>
