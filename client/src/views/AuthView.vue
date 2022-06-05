<template>
    <section class="grid items-center min-h-screen">
        <form autocomplete="off"
            class="max-w-[400px] w-[90vw] mx-auto my-12 px-8 py-10 bg-white rounded-lg border-t-[5px] border-t-cyan-500 transition duration-300 ease-in shadow-lg hover:shadow-2xl">
            <LogoSVG class="h-[50px] block mx-auto mt-0 mb-5" />
            <h3 class="text-3xl text-center mb-5">Login</h3>
            <BaseInputFormField label="Email" type="email" name="email" />
            <BaseInputFormField label="Password" type="password" name="password" />
            <BaseButton type="submit" class="mt-8">
                Login
            </BaseButton>

        </form>
    </section>
</template>

<script setup lang="ts">
import LogoSVG from '@/assets/images/logo.svg'
import BaseInputFormField from '@/components/ui/BaseInputFormField.vue';
import BaseButton from '@/components/ui/BaseButton.vue';

</script>
