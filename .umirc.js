
// ref: https://umijs.org/config/
export default {
  treeShaking: true,
  chainWebpack(config, { webpack }) {
    // 删除进度条插件
    config.plugins.delete('progress');
  },
  // history: 'hash',
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    ['umi-plugin-react', {
      antd: true,
      dva: true,
      dynamicImport: { webpackChunkName: true },
      title: 'myapp',
      dll: true,

      routes: {
        exclude: [
          /models\//,
          /services\//,
          /model\.(t|j)sx?$/,
          /service\.(t|j)sx?$/,
          /components\//,
        ],
      },
    }],
  ],
  context:{
    wangbing:1
  },
  define: {
    "process.env.TEST": 1,
    "process.env.apiUrl": 2,
  },
  theme: "./theme.js"
}
