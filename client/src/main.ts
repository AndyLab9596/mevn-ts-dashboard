import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/tailwind.css'
import BaseButton from '@/components/ui/BaseButton.vue';
import BaseButtonLink from '@/components/ui/BaseButtonLink.vue';
import BaseInputFormField from '@/components/ui/BaseInputFormField.vue';

const app = createApp(App);

app.use(router);
app.component('BaseButtonLink', BaseButtonLink);
app.component('BaseButton', BaseButton);
app.component('BaseInputFormField', BaseInputFormField);

app.mount('#app');

