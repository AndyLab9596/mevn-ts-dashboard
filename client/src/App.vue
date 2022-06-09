<template>
  <div class="bg-gray-100">
    <RouterView />
  </div>
</template>

<script setup lang="ts">
import { useGlobalStore } from '@/stores/globalStore';
import { storeToRefs } from 'pinia';
import { onMounted, watch } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const globalStore = useGlobalStore();
const { isAutoLogOut } = storeToRefs(globalStore);

onMounted(() => {
  globalStore.tryLogin()
});

watch(isAutoLogOut, (oldValue, newValue) => {
  if (oldValue !== newValue) {
    router.replace({ name: 'home' })
  }
})

</script>
