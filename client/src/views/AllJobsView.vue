<template>
    <section class="w-[90%] mx-auto my-auto py-0">
        <BaseDialog :show="isShowDialog" @close-dialog="closeDialog" typeOperate="Delete" @on-operate="onDeleteJob">
            {{ titleDialogDeleteJob }}
        </BaseDialog>

        <div>
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
import BaseDialog from '@/components/ui/BaseDialog.vue';
import { IJobInterfaceData } from '@/models/jobTypes';
import { useGlobalStore } from '@/stores/globalStore';
import moment from 'moment';
import { storeToRefs } from 'pinia';
import { onMounted, provide, ref, watch } from 'vue';

const globalStore = useGlobalStore();
const { page, search, searchStatus, searchType, sort } = storeToRefs(globalStore);

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
});

watch([page, searchStatus, searchType, sort], async () => {
    try {
        await globalStore.getAllJobs();
    } catch (error) {
        console.log(error)
    }
});

let timerId: number | undefined;

watch(search, () => {

    if (timerId) {
        clearTimeout(timerId)
    }
    timerId = setTimeout(async () => {
        try {
            await globalStore.getAllJobs();
        } catch (error) {
            console.log(error)
        }
    }, 500)
})

</script>
