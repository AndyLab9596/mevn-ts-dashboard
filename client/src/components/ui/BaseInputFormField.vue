<template>
    <div class="mb-4 block">
        <label :htmlFor="name" class="block text-lg mb-2 capitalize tracking-wide">
            {{ label }}
        </label>
        <input :type="type" :name="name"
            class="h-9 w-full px-[0.375rem] p-3 rounded-lg bg-gray-50 border-[1px] border-solid border-gray-400 "
            ref="inputRef" @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
            :value="modelValue" />
    </div>
</template>

<script setup lang="ts">
import { defineProps, InputHTMLAttributes, ref, defineExpose } from 'vue';

interface IBaseFormInputField {
    label: string;
    type: InputHTMLAttributes['type'];
    name: string;
    modelValue: string;
}

defineProps<IBaseFormInputField>();

const inputRef = ref<HTMLInputElement | null>(null);
const inputFocus = () => {
    inputRef.value?.focus();
};

defineExpose({
    inputFocus,
})

</script>