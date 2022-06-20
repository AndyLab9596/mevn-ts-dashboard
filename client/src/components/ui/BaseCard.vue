<template>
    <article class="bg-white grid-rows-2 shadow-lg px-4 py-8  rounded-lg">
        <header class="row-auto p-1 border-b-slate-300 border-b-2 flex items-center">
            <div
                class="w-14 h-14 rounded-xl uppercase grid place-items-center bg-cyan-500 text-xl font-bold mr-8 text-white">
                {{ job.company.charAt(0) }}
            </div>
            <div class="">
                <h5 class="mb-2 text-lg">{{ job.company }}</h5>
                <p class="m-0 capitalize text-gray-400 tracking-wide">
                    {{ job.position }}
                </p>
            </div>
        </header>
        <div class="row-span-full">
            <div class="py-4 px-6 grid grid-cols-2 gap-2">
                <div class="mt-2 flex items-center">
                    <vue-feather type="navigation" class="mr-4 flex items-center" stroke-width="2.5" stroke="#9ca3af">
                    </vue-feather>
                    <span class="capitalize tracking-wider">
                        {{ job.jobLocation }}
                    </span>
                </div>
                <div class="mt-2 flex items-center">
                    <vue-feather type="calendar" class="mr-4 flex items-center" stroke-width="2.5" stroke="#9ca3af">
                    </vue-feather>
                    <span class="capitalize tracking-wider">
                        {{ moment(job.createdAt).format("MMM Do, YY") }}
                    </span>
                </div>
                <div class="mt-2 flex items-center">
                    <vue-feather type="briefcase" class="mr-4 flex items-center" stroke-width="2.5" stroke="#9ca3af">
                    </vue-feather>
                    <span class="capitalize tracking-wider">
                        {{ job.jobType }}
                    </span>
                </div>
                <div class="rounded-md capitalize tracking-wider text-center w-24 h-7 bg-yellow-200 text-yellow-600 text-sm leading-7"
                    :class="{
                        'bg-yellow-200 text-yellow-600': job.status === 'pending',
                        'bg-red-200 text-red-600': job.status === 'declined',
                        'bg-blue-200 text-blue-600': job.status === 'interview'
                    }">
                    {{ job.status }}
                </div>
            </div>
            <footer class="mt-4 px-6">
                <div>
                    <RouterLink :to="editLink"
                        class="bg-green-200 text-green-700 mr-3 cursor-pointer h-7 p-2 rounded-md text-sm font-normal">
                        Edit
                    </RouterLink>
                    <span class="bg-red-200 text-red-700 cursor-pointer rounded-md p-2 text-sm font-normal">
                        Delete
                    </span>
                </div>
            </footer>
        </div>
    </article>
</template>

<script setup lang="ts">
import moment from 'moment';
import { IJobInterfaceData } from '@/models/jobTypes';
import { ref, defineProps } from 'vue';
interface IBaseCard {
    job: IJobInterfaceData
}

defineProps<IBaseCard>();

const editLink = ref('/');

</script>

<style scoped>
</style>