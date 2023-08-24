/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Components
import App from "./App.vue";

// Composables
import { createApp } from "vue";

import axios from "./axios";

// Plugins
import { registerPlugins } from "@/plugins";

const app = createApp(App);

app.config.globalProperties.$axios = axios;

registerPlugins(app);

app.mount("#app");
