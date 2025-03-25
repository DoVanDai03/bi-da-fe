import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Default from './layout/wrapper/index.vue'
import Client from './layout/wrapper/client.vue'
import Login from './layout/wrapper/login.vue'

const app = createApp(App)

app.use(router)
app.component("default-layout", Default);
app.component("client-layout", Client);
app.component("login-layout", Login);

app.mount("#app")