// https://umijs.org/config/
import { defineConfig } from 'umi';
import defaultSettings from './defaultSettings';

import pageRoutes from './router';
const { REACT_APP_ENV } = process.env;

export default defineConfig({
  hash: true,
  history: { type: 'hash' },
  antd: {},
  dva: {
    hmr: true,
  },
  layout: {
    name: 'Ant Design Pro',
    locale: true,
  },
  locale: {
    // default zh-CN
    default: 'zh-CN',
    // default true, when it is true, will use `navigator.language` overwrite default
    antd: true,
    baseNavigator: true,
  },
  dynamicImport: {
    loading: '@/components/PageLoading/index',
  },
  targets: {
    ie: 11,
  },
  // umi routes: https://umijs.org/docs/routing
  routes: pageRoutes,
  // Theme for antd: https://ant.design/docs/react/customize-theme-cn
  theme: {
    // ...darkTheme,
    'primary-color': defaultSettings.primaryColor,
  },
  ignoreMomentLocale: true,
  proxy: {
    '/api': {
      target: 'http://localhost:3000',
      changeOrigin: true,
      ...(!REACT_APP_ENV ? { pathRewrite: { '^/api': '' } } : ''),
    },
    '/test': {
      target: 'http://localhost:3000',
      changeOrigin: true,
      ...(!REACT_APP_ENV ? { pathRewrite: { '^/test': '' } } : ''),
    }
  },
  manifest: {
    basePath: '/',
  },
});
