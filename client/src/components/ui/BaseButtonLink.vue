<template>
    <router-link :to="link" class="text-lg text-white px-2 py-2 bg-cyan-500 hover:bg-cyan-700 border-transparent rounded-md capitalize inline-block shadow-lg hover:shadow-2xl transition duration-300 ease-in-out">
        <slot></slot>
    </router-link>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

interface ILink {
    name: string;
    [x: string]: unknown
}

interface IBaseButtonLink {
    link: ILink
}

defineProps<IBaseButtonLink>();
</script>

<style>
.router-link {
    display: inline-block;
}
</style>
