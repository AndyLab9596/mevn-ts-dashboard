<template>
    <section class="w-[90%] mx-0 my-auto px-8 py-0">
        <div v-if="loadingState"
            class="rounded-lg w-full bg-cyan-50 pt-12 pb-16 px-8 flex justify-center items-center min-h-[500px]">
            <BaseSpinner />
        </div>

        <div v-else class="rounded-lg w-full bg-cyan-50 pt-12 pb-16 px-8">
            <slot></slot>
        </div>

    </section>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

interface IDashboardContentProps {
    loadingState: boolean
}

defineProps<IDashboardContentProps>()

</script>
