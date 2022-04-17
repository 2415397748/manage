import Vue from 'vue'
//可以同时注册文件夹下面的注册多个组件，参数为   表示检索的目录，表示是否检索子文件夹，匹配文件的正则表达式,一般是文件名，
// const components = require.context('./', false, /\.vue$/) // require.context获取指定目录下符合条件的文件，这里获取所有base目录下的组件
// components.keys().map(item => {
// 	console.log(item);
//   Vue.components
// })
// export default Vue => {
//   components.keys().map(item => {
// 	console.log(item,'123');
//     Vue.components(item, components(item).default)
//   })
// }
// 获取文件路径函数
const importFn = require.context('./', false, /\.vue$/)
export default {
  install(app) {
  // 遍历文件路径数组
    importFn.keys().forEach((path) => {
      // 导入组件
      const component = importFn(path).default
      // 注册组件
      app.component(component.name, component)
    })
   }
  }
