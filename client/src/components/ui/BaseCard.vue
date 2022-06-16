<template>
    <article class="bg-white grid-rows-2 shadow-lg p-3 rounded-lg ">
        <header class="row-auto p-1 border-b-slate-300 border-b-2 flex items-center">
            <div
                class="w-14 h-14 rounded-xl uppercase grid place-items-center bg-cyan-500 text-xl font-bold mr-8 text-white">
                M
            </div>
            <div class="">
                <h5 class="mb-2 text-lg">Front End</h5>
                <p class="m-0 capitalize text-gray-400 tracking-wide">MOR</p>
            </div>
        </header>
        <div class="row-span-full">
            <div class="py-4 px-6 grid-cols-1 lg:grid-cols-2 gap-2">
                <div class="mt-2 flex items-center">
                    <vue-feather type="navigation" class="mr-4 flex items-center" stroke-width="2.5" stroke="#9ca3af">
                    </vue-feather>
                    <span class="capitalize tracking-wider">Nha Trang</span>
                </div>
                <div class="mt-2 flex items-center">
                    <vue-feather type="calendar" class="mr-4 flex items-center" stroke-width="2.5" stroke="#9ca3af">
                    </vue-feather>
                    <span class="capitalize tracking-wider">Jun 16th, 2022</span>
                </div>
                <div class="mt-2 flex items-center">
                    <vue-feather type="briefcase" class="mr-4 flex items-center" stroke-width="2.5" stroke="#9ca3af">
                    </vue-feather>
                    <span class="capitalize tracking-wider">Full-Time</span>
                </div>
                <div class="rounded-md capitalize tracking-wider text-center w-24 h-7 bg-yellow-200 text-yellow-600">
                    Pending
                </div>
            </div>
            <footer class="mt-4">
                <div>
                    <RouterLink :to="editLink" class="bg-green-200 text-green-700 mr-2 cursor-pointer h-7 ">
                        Edit
                    </RouterLink>
                    <button class="">
                        Delete
                    </button>
                </div>
            </footer>
        </div>
    </article>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const editLink = ref('/');

</script>

<style scoped>
</style>