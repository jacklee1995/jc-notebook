import { createApp } from 'vue';

import App from './App.vue'
import { setupRouter } from '@index/router/index';
import './assets/main.scss'
import { setupStore } from '@index/stores/index';
// import { JCComponents } from '@jcstudio/plugins/index';
import { JCComponents } from './plugins/index';

async function bootstrap() {
    const app = createApp(App)
    setupStore(app);
    setupRouter(app);
    app.use(JCComponents);
    app.mount('#app')
}

bootstrap()

