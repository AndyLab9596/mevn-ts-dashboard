<template>
    <nav class="h-20 flex items-center justify-center bg-white shadow-lg">
        <div class="w-[90%] mx-auto flex justify-between items-center">
            <button class="flex justify-center items-center">
                <vue-feather type="align-left" stroke-width="2.5" stroke="#06b6d4" size="28"></vue-feather>
            </button>
            <h3 class="text-2xl font-semibold">Dashboard</h3>
            <div class="relative">
                <button
                    class="flex justify-center items-center shadow-xl hover:bg-cyan-700 bg-cyan-500 text-white border-transparent rounded-md py-1 px-2 space-x-2 transition duration-300 ease-in-out">
                    <vue-feather type="user-check"></vue-feather>
                    <span>Andy</span>
                    <vue-feather type="corner-right-down"></vue-feather>
                </button>
            </div>

        </div>
    </nav>
</template>

<script setup lang="ts">

</script>
