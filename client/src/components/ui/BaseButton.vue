<template>
    <button :type="type" class="text-base text-white px-2 py-2 bg-cyan-500 hover:bg-cyan-700 border-transparent rounded-md capitalize block w-full shadow-lg hover:shadow-2xl transition duration-300 ease-in-out">
        <slot></slot>
    </button>
</template>

<script setup lang="ts">
import { ButtonHTMLAttributes, defineProps } from 'vue';
interface IBaseButton {
    type: ButtonHTMLAttributes['type']
}

defineProps<IBaseButton>();
</script>
