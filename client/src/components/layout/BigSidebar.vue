<template>
    <aside class="sideBar flex-shrink-0 w-[250px] h-full min-h-screen shadow-lg bg-white sticky top-0 "
        :class="{ '-ml-[250px]': globalStore.isShowSideBar, 'ml-0': !globalStore.isShowSideBar }">

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
.sideBar {
    transition: margin-left 2s .5s ease-in-out
}
</style>
