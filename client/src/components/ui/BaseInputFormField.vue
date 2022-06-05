<template>
    <div class="mb-4 block">
        <label :htmlFor="name" class="block text-lg mb-2 capitalize tracking-wide">
            {{ label }}
        </label>
        <input :type="type" :name="name"
            class="h-9 w-full px-[0.375rem] py-3 rounded-lg bg-gray-50 border-[1px] border-solid border-gray-200 " />
    </div>
</template>

<script setup lang="ts">
import { defineProps, InputHTMLAttributes, } from 'vue';

interface IBaseFormInputField {
    label: string;
    type: InputHTMLAttributes['type'];
    name: string
}

defineProps<IBaseFormInputField>();
</script>