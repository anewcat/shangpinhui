import Vue from 'vue'
import App from './App.vue'

// 三级联动组件--全局组件
import TypeNav from '@/components/TypeNav'
//第一个参数：全局组件的名字，第二个参数：哪一个组件
Vue.component(TypeNav.name,TypeNav)
//引入路由
import router from './router'
//引入仓库
import store from '@/store'
Vue.config.productionTip = false
import VueRouter from 'vue-router'
Vue.use(VueRouter)

import {reqCategoryList} from '@/api';
import Carousel from '@/components/Carousel'
reqCategoryList();
// 引入MockServer.js---mock数据
import '@/mock/mockServe';
//引入swiper样式
import "swiper/css/swiper.css"
Vue.component(Carousel.name,Carousel)

import {reqGetSearchInfo} from '@/api'
console.log(reqGetSearchInfo({}))
import Pagination from '@/components/Pagination'
Vue.component(Pagination.name,Pagination)
import {Button,MessageBox} from 'element-ui'
Vue.component(Button.name,Button)
import * as API from '@/api'
//挂载原型上
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
//引入插件
import VueLazyload from 'vue-lazyload'
import atm from '@/assets/atm.gif'
import plugins from '@/plugins/plugins'
//引入表单校验插件
import '@/plugins/validate'
// 注册插件
Vue.use(VueLazyload, {
  //懒加载默认的图片
  loading: atm,
})
new Vue({
  render: h => h(App),
  beforeCreate(){
    Vue.prototype.$bus=this
    Vue.prototype.$API=API
  },
  //注册路由：底下的写法KV一直省略V【router小写的】
  router,
  //注册仓库：组件实例的身上会多一个属性$store属性
  store
}).$mount('#app')

