<template>
    <section class="w-[90%] mx-0 my-auto px-8 py-0">
        <div class="rounded-lg w-full bg-white pt-12 pb-16 px-8">
            <form @submit.prevent="handleSubmit">
                <h3 class="text-3xl mb-4">Profile</h3>

                <div class="grid grid-cols-1 gap-2 lg:grid-cols-2 lg:gap-4 lg:items-center xl:grid-cols-3">
                    <BaseInputFormField label="Name" type="text" name="name" v-model="nameInput" />
                    <BaseInputFormField label="Last Name" type="text" name="lastName" v-model="lastNameInput" />
                    <BaseInputFormField label="Email" type="email" name="email" v-model="emailInput" />
                    <BaseInputFormField label="Location" type="text" name="userLocation" v-model="userLocation" />
                    <BaseButton type="submit">
                        Save Changes
                    </BaseButton>
                </div>
            </form>
        </div>
    </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import BaseButton from '@/components/ui/BaseButton.vue';

const nameInput = ref<string>('');
const lastNameInput = ref<string>('');
const emailInput = ref<string>('');
const userLocation = ref<string>('');

const handleSubmit = () => {
    // do something
}

</script>
