<template>
    <div class="mb-4 block">
        <label :htmlFor="name" class="block text-lg mb-2 capitalize tracking-wide">
            {{ label }}
        </label>
        <select :name="name" @input="$emit('update:modelValue', ($event.target as HTMLSelectElement).value)"
            :value="modelValue"
            class="h-9 w-full px-[0.375rem] -p-3 rounded-lg bg-gray-50 border-[1px] border-solid border-gray-400 ">
            <option disabled value="" >Please select one</option>
            <option v-for="(option, index) in options" :key="index" :value="option">
                {{ option }}
            </option>
        </select>
    </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

interface IBaseFormInputField {
    label: string;
    name: string;
    modelValue: string;
    options: string[];
}

defineProps<IBaseFormInputField>();


</script>