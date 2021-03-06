import Vue from "vue";
import Vuex from "vuex";
import { FeathersVuex } from "../boot/feathersClient";
import authvuex from "./store.auth";

import account from "./account";
import admin from "./admin";
import theme from './store-theme'
/** 채팅 */
import messages from '../services/messages/messages'
/** 블로그 */
import blog from '../services/blog/blog'
/** 파일 업로드 */
import uploads from '../services/uploads/uploads'

/** 저장된 메시지 */
// import notification from '../services/notifications/notifications'
/** 푸시 메시지 */
import notifications from './notifications'


// 일괄 서비스 등록 .. 추후에
const requireModule = require.context(
  // The path where the service modules live
  "../services/feathers-client",
  // Whether to look in subfolders
  false,
  // Only include .js files (prevents duplicate imports`)
  /.js$/
);

const servicePlugins = requireModule
  .keys()
  .map(modulePath => requireModule(modulePath).default);

Vue.use(Vuex);
Vue.use(FeathersVuex);

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

export default function(/* { ssrContext } */) {
  const Store = new Vuex.Store({
    plugins: [...servicePlugins, authvuex, messages, blog, uploads ],
    modules: {
      account,
      admin,
      theme,
      notifications
    },

    // enable strict mode (adds overhead!)
    // for dev mode only
    // process.env.DEV >> true
    strict: false
  });
  // console.log('process.env.DEV' , process.env.DEV)
  return Store;
}
