import { createApp } from 'vue';
import { createHead } from '@vueuse/head';

import App from '@/App.vue';

import './assets/styles/main.scss';
import './registerServiceWorker';

// app
// --------------------------------
const app = createApp(App);

const head = createHead();
app.use(head);

app.mount('#app');
if (!window.prerender) setTimeout(() => window.document.body.classList.remove('no-anim'), 100);
