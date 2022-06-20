<template>
    <section class="rounded-lg w-full bg-cyan-50 pt-12 pb-16 px-8 grid grid-cols-1 xl:grid-cols-2 gap-4">
        <div v-if="totalJobs < 1">
            <h3>No job to display</h3>
        </div>
        <BaseCard v-else v-for="job in jobs" :key="job._id" :job="job" />
    </section>
</template>

<script setup lang="ts">
import BaseCard from '@/components/ui/BaseCard.vue';
import { useGlobalStore } from '@/stores/globalStore';
import { storeToRefs } from 'pinia';

const globalStore = useGlobalStore();
const { jobs, totalJobs } = storeToRefs(globalStore);


</script>
