<template>
    <section class="rounded-lg w-full bg-cyan-50 pt-12 pb-16 px-8 grid grid-cols-1 lg:grid-cols-2 gap-4">
        <BaseCard v-for="n in 4" :key="n" />
    </section>
</template>

<script setup lang="ts">
import BaseCard from '@/components/ui/BaseCard.vue';
import { ref } from 'vue';

const n = ref(1)

</script>
