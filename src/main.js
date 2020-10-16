import {
  createApp
} from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';

var _ = require('lodash');

const app = createApp(App);
const echarts = require('echarts');
app.config.globalProperties.$echarts = echarts;

app.use(Antd)
app.use(store).use(router).use(echarts).mount('#app');