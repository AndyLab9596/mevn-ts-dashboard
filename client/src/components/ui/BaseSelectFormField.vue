<template>
    <div class="mb-4 block">
        <label :htmlFor="name" class="block text-lg mb-2 capitalize tracking-wide">
            {{ label }}
        </label>
        <select :name="name" @input="$emit('update:modelValue', ($event.target as HTMLSelectElement).value)"
            :value="modelValue"
            class="h-9 w-full px-[0.375rem] p-3 rounded-lg bg-gray-50 border-[1px] border-solid border-gray-400 ">
            <option v-for="(option, index) in options" :key="index">
                {{ option }}
            </option>
        </select>
        <!-- <input :type="type" :name="name" :disabled="isDisabled"
            class="h-9 w-full px-[0.375rem] p-3 rounded-lg bg-gray-50 border-[1px] border-solid border-gray-400 "
            :class="{ 'cursor-not-allowed': isDisabled }" ref="inputRef"
            @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)" :value="modelValue" /> -->
    </div>
</template>

<script setup lang="ts">
import { defineProps, InputHTMLAttributes } from 'vue';

interface IBaseFormInputField {
    label: string;
    type: InputHTMLAttributes['type'];
    name: string;
    modelValue: string;
    options: string[];
}

defineProps<IBaseFormInputField>();


</script>