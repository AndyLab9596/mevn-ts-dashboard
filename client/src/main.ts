import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/tailwind.css'
import BaseButtonLink from '@/components/ui/BaseButtonLink.vue';

const app = createApp(App);

app.use(router);
app.component('BaseButtonLink', BaseButtonLink);


app.mount('#app');

