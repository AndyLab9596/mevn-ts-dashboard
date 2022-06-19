<template>
    <section class="w-[90%] mx-auto my-auto py-0">
        <div v-if="globalStore.isLoading"
            class="rounded-lg w-full bg-cyan-50 pt-12 pb-16 px-8 flex justify-center items-center min-h-[500px]">
            <BaseSpinner />
        </div>
        <div v-else>
            <SearchJobContainer />
            <h4 class="my-4 text-2xl font-semibold">
                {{ globalStore.totalJobs }} Job{{ globalStore.totalJobs > 1 ? 's' : '' }} Found
            </h4>
            <AllJobContainer />
        </div>
    </section>
</template>

<script setup lang="ts">
import AllJobContainer from '@/components/layout/AllJobContainer.vue';
import SearchJobContainer from '@/components/layout/SearchJobContainer.vue';
import { useGlobalStore } from '@/stores/globalStore';
import { onMounted } from 'vue';

const globalStore = useGlobalStore();

onMounted(() => {
    globalStore.getAllJobs();
})

</script>
