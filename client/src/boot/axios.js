import Vue from "vue";
import axios from "axios";
import { LocalStorage, LoadingBar } from "quasar";

/*
사용자 관리 및 feathers API 연결
*/
LoadingBar.setDefaults({
  color: "secondary",
  size: "15px",
  position: "top"
});

const axiosInstance = axios.create({ baseURL: "http://localhost:3030" });

axiosInstance.defaults.withCredentials = true;
/*토큰 추가 */
const token = LocalStorage.getItem("feathers-jwt");
if (token) {
  delete axiosInstance.defaults.headers.common.Authorization;
  axiosInstance.defaults.headers.common['Authorization'] = 'Bearer ' + token
}

axiosInstance.interceptors.request.use(
  function(config) {
    LoadingBar.start();
    return config;
  },
  function(error) {
    LoadingBar.stop();

    return Promise.reject(error);
  }
);

Vue.prototype.$axiosInstance = axiosInstance;


/*
일반 API 연결
*/

Vue.prototype.$axios = axios



export default axiosInstance;
