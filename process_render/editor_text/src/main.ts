import { createApp } from 'vue'
import App from './App.vue'
// import { JCComponents } from '@jcstudio/plugins/index';
import { JCComponents } from './plugins/index';
import './main.scss';

async function bootstrap() {
  const app = createApp(App);
  app.use(JCComponents);
  app.mount('#app');

}

bootstrap()