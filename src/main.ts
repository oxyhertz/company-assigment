import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import type { RootState } from "./store";
import type { Store } from "vuex/types/index.js";

import "@/assets/styles/main.scss";
import "@mdi/font/css/materialdesignicons.css";

declare module "@vue/runtime-core" {
  interface ComponentCustomProperties {
    $store: Store<RootState>;
  }
}

const app = createApp(App);

app.use(router);
app.use(store);

app.mount("#app");
