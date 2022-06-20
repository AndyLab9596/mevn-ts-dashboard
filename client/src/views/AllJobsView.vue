<template>
    <section class="w-[90%] mx-auto my-auto py-0">
        <BaseDialog :show="isShowDialog" @close-dialog="closeDialog" typeOperate="Delete" @on-operate="onDeleteJob">
            {{ titleDialogDeleteJob }}
        </BaseDialog>

        <div v-if="globalStore.isLoading"
            class="rounded-lg w-full bg-cyan-50 pt-12 pb-16 px-8 flex justify-center items-center">
            <BaseSpinner />
        </div>
        <div v-else>
            <SearchJobContainer />
            <h4 class="my-4 text-2xl font-semibold">
                {{ globalStore.totalJobs }} Job{{ globalStore.totalJobs > 1 ? 's' : '' }} Found
            </h4>
            <AllJobContainer />
        </div>
    </section>
</template>

<script setup lang="ts">
import AllJobContainer from '@/components/layout/AllJobContainer.vue';
import SearchJobContainer from '@/components/layout/SearchJobContainer.vue';
import { useGlobalStore } from '@/stores/globalStore';
import { onMounted, provide, ref } from 'vue';
import BaseDialog from '@/components/ui/BaseDialog.vue';
import { IJobInterfaceData } from '@/models/jobTypes';
import moment from 'moment';

const globalStore = useGlobalStore();
const isShowDialog = ref<boolean>(false);
const deletejobId = ref<string>('');
const titleDialogDeleteJob = ref<string>('');

const closeDialog = () => {
    isShowDialog.value = false;
}

const openDialog = (id: IJobInterfaceData['_id']) => {
    deletejobId.value = id;
    const job = globalStore.jobs.find(job => job._id === id);
    titleDialogDeleteJob.value = `Delete job ${job?.position} at ${job?.company} which is created at ${moment(job?.createdAt).format('MMM Do YY')}?`
    isShowDialog.value = true;
}

const onDeleteJob = async () => {
    await globalStore.deleteJob(deletejobId.value)
    closeDialog();
}

provide('dialog', openDialog);


onMounted(() => {
    globalStore.getAllJobs();
})

</script>
