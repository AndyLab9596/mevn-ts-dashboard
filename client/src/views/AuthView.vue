<template>
    <section class="grid items-center min-h-screen">
        <form autocomplete="off" @submit.prevent="handleSubmit"
            class="max-w-[400px] w-[90vw] mx-auto my-12 px-8 py-10 bg-white rounded-lg border-t-[5px] border-t-cyan-500 transition duration-300 ease-in shadow-lg hover:shadow-2xl">
            <LogoSVG class="h-[50px] block mx-auto mt-0 mb-5" />
            <h3 class="text-3xl text-center mb-5">
                {{ isRegisterMode ? 'Register' : 'Login' }}
            </h3>
            <BaseAlert />
            <BaseInputFormField label="Name" type="name" name="name" v-model="nameInput" v-show="isRegisterMode" />
            <BaseInputFormField label="Email" type="email" name="email" v-model="emailInput" />
            <BaseInputFormField label="Password" type="password" name="password" v-model="passwordInput" />
            <BaseButton type="submit" class="mt-8">
                {{ isRegisterMode ? 'Register' : 'Login' }}
            </BaseButton>
            <p class="text-center text-lg mt-4 mx-0 font-semibold">
                {{ isRegisterMode ? 'Already a member?' : 'Not a member yet?' }}
                <button type="button" @click="toggleMode" class="text-cyan-500 font-bold ">
                    {{ isRegisterMode ? 'Login' : 'Register' }}
                </button>
            </p>
        </form>
    </section>
</template>

<script setup lang="ts">
import LogoSVG from '@/assets/images/logo.svg'
import BaseInputFormField from '@/components/ui/BaseInputFormField.vue';
import BaseButton from '@/components/ui/BaseButton.vue';
import { ref } from 'vue';
import BaseAlert from '@/components/ui/BaseAlert.vue';
import { useGlobalStore } from '@/stores/globalStore';

const globalStore = useGlobalStore();
const { displayAlert } = globalStore;

const nameInput = ref<string>('');
const emailInput = ref<string>('');
const passwordInput = ref<string>('');

const isRegisterMode = ref<boolean>(false);
const toggleMode = () => {
    isRegisterMode.value = !isRegisterMode.value
}

const handleSubmit = () => {

    let formValue;
    if (isRegisterMode.value) {
        if (nameInput.value === '' || emailInput.value === '' || passwordInput.value === '') {
            displayAlert({ alertText: 'Please provide all value !!!', alertType: 'danger' });
            return;
        }
        formValue = {
            name: nameInput.value,
            email: emailInput.value,
            password: passwordInput.value,
        }
    } else {
        if (emailInput.value === '' || passwordInput.value === '') {
            displayAlert({ alertText: 'Please provide all value !!!', alertType: 'danger' });
            return;
        }
        formValue = {
            email: emailInput.value,
            password: passwordInput.value,
        }
    }
    console.log(formValue);
    displayAlert({ alertText: isRegisterMode.value ? 'Register successfully' : 'Login successfully', alertType: 'success' });

}


</script>
