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
import BaseButton from '@/components/ui/BaseButton.vue';
import { useGlobalStore } from '@/stores/globalStore';
import { computed, WritableComputedRef } from 'vue';

const globalStore = useGlobalStore();

const nameInput: WritableComputedRef<string> = computed({
    get(): string {
        const nameInput = globalStore.user ? globalStore.user.name : '';
        return nameInput;
    },
    set(value: string): void {
        return globalStore.changeUserValue('name', value)
    }
});

const lastNameInput: WritableComputedRef<string> = computed({
    get(): string {
        const nameInput = globalStore.user ? globalStore.user.lastName : '';
        return nameInput;
    },
    set(value: string): void {
        return globalStore.changeUserValue('lastName', value)
    }
});

const userLocation: WritableComputedRef<string> = computed({
    get(): string {
        const nameInput = globalStore.user ? globalStore.user.location : '';
        return nameInput;
    },
    set(value: string): void {
        return globalStore.changeUserValue('location', value)
    }
});

const emailInput = computed(() => globalStore.user?.email);

const handleSubmit = () => {
    // do something
}

</script>
