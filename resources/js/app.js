import './bootstrap';
import '../scss/app.scss';
import { createApp } from 'vue';
import { createPinia } from "pinia";
import piniaPersistedState from 'pinia-plugin-persistedstate';
import { initRouter } from './router';
import App from './App.vue';

const app = createApp(App);

const pinia = createPinia();
pinia.use(piniaPersistedState);
app.use(pinia);

const router = initRouter();
app.use(router);

app.mount('#app');
