import axios from "axios";
import store from "@/store";

import getToken from "@/permission/getToken";
import router from "@/router";
import {
  h
} from 'vue';
import {
  message,
} from 'ant-design-vue';

console.log(store)
export function fetch(options) {
  options.isMenu === true ? store.commit('common/SETMENUSPIN', true) : store.commit('common/SETCONTENTSPIN', true)

  let header = {
    token: getToken(),
  };
  return new Promise((resolve, reject) => {
    // store.state.main.loading = options.status === false ? false : true; //修改加载中状态
    const instance = axios.create({
      headers: {
        SYSTEMCODE: "PCMNS",
        ...header
      }, //请求头
      timeout: 45 * 1000 //超时时间
    });
    instance.interceptors.request.use(
      config => {
        // store.state.main.loading = options.status === false ? false : true;
        // config.data.userId = store.state.userInfo.id //统一传入userId
        return config;
      },
      error => {
        return Promise.reject(error);
      }
    );
    instance(options)
      .then(response => {
        store.commit('common/SETMENUSPIN', false)
        store.commit('common/SETCONTENTSPIN', false)
        // store.state.main.loading = false;
        if (response.data.code == 300) {
          // store.state.main.loading = false;
          message.error('登录失效，请重新登录')

          // location.href = "#/login";
          return;
        }
        if (
          response.data.code !== null &&
          parseInt(response.data.code) !== 0 &&
          response.data.code !== 200
        ) {
          // store.state.main.loading = false;
          message.error(response.data.message);
          return;
        }
        resolve(response);
      })
      .catch(error => {
        store.commit('common/SETMENUSPIN', false)
        store.commit('common/SETCONTENTSPIN', false)
        message.error("网络异常，请稍后再试");
        reject(error);
      });
  });
}