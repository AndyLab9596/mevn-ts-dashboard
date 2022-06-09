<template>
    <aside class="flex-shrink-0 w-[250px] h-full min-h-screen shadow-lg bg-white sticky top-0">
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
import NavLinks from './NavLinks.vue';



</script>
