<template>
    <section class="w-[90%] mx-0 my-auto px-8 py-0">
        <div v-if="globalStore.isLoading"
            class="rounded-lg w-full bg-cyan-50 pt-12 pb-16 px-8 flex justify-center items-center min-h-[500px]">
            <BaseSpinner />
        </div>
        <div v-else class="rounded-lg w-full bg-cyan-50 pt-12 pb-16 px-8">
            <form @submit.prevent="handleSubmit">
                <h3 class="text-3xl mb-4">Profile</h3>

                <div class="grid grid-cols-1 gap-2 lg:grid-cols-2 lg:gap-4 lg:items-center xl:grid-cols-3">
                    <BaseInputFormField label="Name" type="text" name="name" v-model="nameInput"
                        ref="baseNameComponentRef" />
                    <BaseInputFormField label="Last Name" type="text" name="lastName" v-model="lastNameInput" />
                    <BaseInputFormField label="Email" type="email" name="email" v-model="emailInput" isDisabled />
                    <BaseInputFormField label="Location" type="text" name="userLocation" v-model="userLocation" />
                    <div class="mt-[18px]">
                        <BaseButton type="submit">
                            Save Changes
                        </BaseButton>
                    </div>
                </div>
            </form>
        </div>
    </section>
</template>

<script setup lang="ts">
import BaseButton from '@/components/ui/BaseButton.vue';
import BaseInputFormField from '@/components/ui/BaseInputFormField.vue';
import { useGlobalStore } from '@/stores/globalStore';
import { ComponentPublicInstance, computed, onMounted, ref, WritableComputedRef } from 'vue';

const globalStore = useGlobalStore();
const baseNameComponentRef = ref<ComponentPublicInstance<typeof BaseInputFormField & { inputFocus: () => void }>>();

onMounted(() => {
    baseNameComponentRef.value?.inputFocus();
})

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

const emailInput = computed(() => globalStore.user?.email as string);

const handleSubmit = async () => {
    await globalStore.updateUser()
}

</script>
