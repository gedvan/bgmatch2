import './bootstrap';
import '../scss/app.scss';
import { createApp } from 'vue';
import App from './components/App.vue';

const app = createApp(App);
app.mount('#app');
