import {
  createSSRApp
} from 'vue'
import App from './App.vue'
import * as Pinia from 'pinia';
import pinia from '@/store/index'
import uViewPro from "@/uni_modules/uview-pro";

export function createApp() {
  const app = createSSRApp(App)
  app.use(pinia);
  app.use(uViewPro);
  return {
    app,
   Pinia: { pinia } // 根据 uni-app 要求返回
  }
}