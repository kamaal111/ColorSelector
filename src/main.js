import { createApp } from 'vue';
import { createStore } from 'vuex';

import App from './App.vue';

const store = createStore({
	state() {
		return {};
	},
	mutations: {},
});

const app = createApp(App);

app.mount('#app');
app.use(store);
