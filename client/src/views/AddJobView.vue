<template>
    <DashboardContent :loadingState="globalStore.isLoading">
        <form @submit.prevent="handleSubmit">
            <h3 class="text-3xl mb-4">Add Job</h3>
            <BaseAlert />
            <div class="grid grid-cols-1 gap-2 lg:grid-cols-2 lg:gap-4 lg:items-center xl:grid-cols-3">
                <!-- <BaseInputFormField label="Name" type="text" name="name" v-model="nameInput"
                    ref="baseNameComponentRef" />
                <BaseInputFormField label="Last Name" type="text" name="lastName" v-model="lastNameInput" />
                <BaseInputFormField label="Email" type="email" name="email" v-model="emailInput" isDisabled />
                <BaseInputFormField label="Location" type="text" name="userLocation" v-model="userLocation" />
                <div class="mt-[18px]">
                    <BaseButton type="submit">
                        Save Changes
                    </BaseButton>
                </div> -->
            </div>
        </form>
    </DashboardContent>
</template>

<script setup lang="ts">
import { useGlobalStore } from '@/stores/globalStore';


const globalStore = useGlobalStore();

const handleSubmit = async () => {
    // do something
}

</script>
