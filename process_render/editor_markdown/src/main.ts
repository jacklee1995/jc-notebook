import { createApp } from 'vue'
import App from './App.vue'
// import { JCComponents } from '@jcstudio/plugins/index';
import { JCComponents } from './plugins/index';
import './main.scss';
import { setupStore } from './stores/index';

async function bootstrap() {
  const app = createApp(App);
  setupStore(app);
  app.use(JCComponents);
  app.mount('#app');

}

bootstrap()