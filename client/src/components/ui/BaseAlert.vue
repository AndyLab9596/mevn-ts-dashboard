<template>
    <div class="px-1 py-2 mb-4 rounded-lg text-center tracking-wide text-sm" :class="{
        'text-red-700 bg-red-200': alertType === 'danger',
        'text-green-700 bg-green-200': alertType === 'success'
    }">
        {{ alertText }}
    </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

interface IAlertProps {
    alertType: 'danger' | 'success';
    alertText: string;
}

defineProps<IAlertProps>()

</script>
