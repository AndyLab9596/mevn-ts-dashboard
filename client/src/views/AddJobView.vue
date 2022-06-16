<template>
    <DashboardContent :loadingState="globalStore.isLoading">
        <form @submit.prevent="handleSubmit">
            <h3 class="text-3xl mb-4">Add Job</h3>
            <BaseAlert />
            <div class="grid grid-cols-1 gap-2 lg:grid-cols-2 lg:gap-4 lg:items-center xl:grid-cols-3">
                <BaseInputFormField label="Position" type="text" name="position" v-model="positionInput" />
                <BaseInputFormField label="Company" type="text" name="company" v-model="companyInput" />
                <BaseInputFormField label="Job Location" type="text" name="jobLocation" v-model="jobLocationInput" />
                <BaseSelectFormField label="Status" name="status" v-model="statusSelect" :options="statusOptions" />
                <BaseSelectFormField label="Job Type" name="jobType" v-model="jobTypeSelect"
                    :options="jobTypeOptions" />
                <div class="flex justify-between items-center space-x-1 mt-4">

                    <BaseButton type="submit" class="w-2/4">
                        Submit
                    </BaseButton>

                    <BaseButton type="button" class="w-2/4">
                        Clear
                    </BaseButton>

                </div>
            </div>
        </form>
    </DashboardContent>
</template>

<script setup lang="ts">
import { IPayloadCreateJob, TJobType, TStatus } from '@/models/jobTypes';
import { useGlobalStore } from '@/stores/globalStore';
import { storeToRefs } from 'pinia';
import { computed } from 'vue';

const globalStore = useGlobalStore();

const { jobTypeOptions, statusOptions } = storeToRefs(globalStore);

const handleSubmit = async () => {
    // do something
}

const positionInput = computed({
    get() {
        return globalStore.position
    },
    set(value: IPayloadCreateJob['position']): void {
        return globalStore.changeJobInfo('position', value);
    }
})

const companyInput = computed({
    get() {
        return globalStore.company
    },
    set(value: IPayloadCreateJob['company']): void {
        return globalStore.changeJobInfo('company', value);
    }
})

const jobLocationInput = computed({
    get() {
        return globalStore.jobLocation
    },
    set(value: IPayloadCreateJob['jobLocation']): void {
        return globalStore.changeJobInfo('jobLocation', value);
    }
})

const statusSelect = computed({
    get() {
        return globalStore.status
    },
    set(value: TStatus): void {
        return globalStore.changeJobInfo('status', value);
    }
})

const jobTypeSelect = computed({
    get() {
        return globalStore.jobType
    },
    set(value: TJobType): void {
        return globalStore.changeJobInfo('jobType', value);
    }
})



</script>
