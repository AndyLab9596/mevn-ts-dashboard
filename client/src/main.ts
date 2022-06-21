import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/tailwind.css'
import BaseButton from '@/components/ui/BaseButton.vue';
import BaseButtonLink from '@/components/ui/BaseButtonLink.vue';
import BaseInputFormField from '@/components/ui/BaseInputFormField.vue';
import BaseSelectFormField from '@/components/ui/BaseSelectFormField.vue';
import BaseAlert from '@/components/ui/BaseAlert.vue';
import BaseSpinner from '@/components/ui/BaseSpinner.vue';
import BaseDialog from '@/components/ui/BaseDialog.vue';
import DashboardContent from '@/components/layout/DashboardContent.vue';
import BasePagination from '@/components/ui/BasePagination.vue';
import { createPinia } from 'pinia';
import VueFeather from 'vue-feather';

const app = createApp(App);
app.use(createPinia());
app.use(router);
app.component('BaseButtonLink', BaseButtonLink);
app.component('BaseButton', BaseButton);
app.component('BaseInputFormField', BaseInputFormField);
app.component('BaseAlert', BaseAlert);
app.component('BaseSpinner', BaseSpinner);
app.component('DashboardContent', DashboardContent);
app.component('BaseSelectFormField', BaseSelectFormField);
app.component('BaseDialog', BaseDialog);
app.component('BasePagination', BasePagination);
app.component(VueFeather.name, VueFeather);

app.mount('#app');

