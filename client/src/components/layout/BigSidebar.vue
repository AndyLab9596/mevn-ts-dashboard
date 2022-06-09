<template>
    <aside class="sideBar flex-shrink-0 h-full min-h-screen shadow-lg bg-white sticky top-0 transition-all duration-300 ease-in"
        :class="{ 'w-[250px] opacity-100': globalStore.showSideBar, 'w-0 opacity-0': !globalStore.showSideBar }">

        <section>
            <header class="flex justify-center items-center my-6">
                <LogoSVG class="h-[50px]" />
            </header>
            <NavLinks />

        </section>
    </aside>
</template>

<script setup lang="ts">
import LogoSVG from '@/assets/images/logo.svg';
import { useGlobalStore } from '@/stores/globalStore';
import NavLinks from './NavLinks.vue';

const globalStore = useGlobalStore();

</script>

<style>
</style>
