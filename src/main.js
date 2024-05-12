import { createApp } from 'vue';
import App from './App.vue';

import router from './router/router';

//Font Awesome
createApp(App).use(router).mount('#app');
