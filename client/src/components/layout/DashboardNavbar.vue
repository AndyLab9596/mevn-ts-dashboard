<template>
    <nav class="h-20 flex items-center justify-center bg-white shadow-lg sticky top-0">
        <div class="w-[90%] mx-auto flex justify-between items-center">
            <button class="flex justify-center items-center" @click="globalStore.toggleSideBar">
                <vue-feather type="align-left" stroke-width="2.5" stroke="#06b6d4" size="28"></vue-feather>
            </button>
            <h3 class="text-2xl font-semibold">Dashboard</h3>
            <div class="relative">
                <button @click="toggleLogout"
                    class="flex justify-center items-center shadow-xl hover:bg-cyan-700 bg-cyan-500 text-white border-transparent rounded-md py-1 px-4 space-x-2 transition duration-300 ease-in-out">
                    <vue-feather size="18" type="user-check"></vue-feather>
                    <span>Andy</span>
                    <vue-feather size="18" type="corner-right-down"></vue-feather>
                </button>
                <button v-if="isShowLogout" @click="logout"
                    class="absolute -top-100 left-0 w-full translate-y-3 bg-cyan-200 p-1 rounded-lg text-sm text-cyan-700">
                    Logout
                </button>
            </div>

        </div>
    </nav>
</template>

<script setup lang="ts">
import { useGlobalStore } from '@/stores/globalStore';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const globalStore = useGlobalStore();
const isShowLogout = ref<boolean>(false);
const toggleLogout = () => isShowLogout.value = !isShowLogout.value;
const logout = () => {
    globalStore.logout();
    router.push('/landing');
};

</script>
