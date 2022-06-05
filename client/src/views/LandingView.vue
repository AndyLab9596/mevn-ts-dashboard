<template>
    <main>
        <nav class="w-[90vw] lg:container h-20 mx-auto my-0 flex items-center">
            <LogoSVG class="h-[50px] flex-1" />
        </nav>
        <section
            class="w-[90vw] min-h-screen lg:container mx-auto my-0 -mt-12 grid items-center grid-cols-1 lg:grid-cols-2 gap-12">
            <div class="">
                <h1 class="font-bold text-5xl mb-5 capitalize ">Job <span class="text-cyan-500">Tracking</span> App</h1>
                <p class="text-gray-600 mb-6">
                    I'm baby wayfarers hoodie next level taiyaki brooklyn cliche blue bottle single-origin coffee chia.
                    Aesthetic post-ironic venmo, quinoa lo-fi tote bag adaptogen everyday carry meggings +1 brunch
                    narwhal.
                </p>
                <BaseButtonLink :link="{ name: 'auth' }">
                    Login/Register
                </BaseButtonLink>
            </div>
            <LandingImg class="hidden lg:block w-full h-auto" />
        </section>
    </main>
</template>

<script setup lang="ts">
import LogoSVG from '@/assets/images/logo.svg'
import LandingImg from '@/assets/images/main.svg';
import BaseButtonLink from '@/components/ui/BaseButtonLink.vue';

</script>

<style scoped>
</style>