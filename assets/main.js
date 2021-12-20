import Vue from 'vue';
import App from './components/App';
import router from "./router/main";
import store from "./store/main";
import {BootstrapVue, IconsPlugin} from 'bootstrap-vue';
import axios from "axios";

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue);

// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)

Vue.config.productionTip = false;

axios.defaults.baseURL = 'https://symfony5-api.test/api';

require('./store/subscriber');

store.dispatch(
    'auth/attempt',
    localStorage.getItem('token')
).then(() => {
    new Vue({
        router,
        store,
        render: h => h(App)
    }).$mount('#root');
});
