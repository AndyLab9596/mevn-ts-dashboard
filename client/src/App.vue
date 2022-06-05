<template>
  <div>
    <RouterView />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import getTestingApi from '@/api/getTestingApi';

const testingFetch = async () => {
  try {
    await getTestingApi.testing();
  } catch (error: any) {
    console.log(error.message)
  }
}

onMounted(() => {
  testingFetch();
})

</script>

<style scoped lang="scss">
</style>