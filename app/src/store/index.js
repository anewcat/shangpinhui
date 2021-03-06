import Vue from 'vue'
import Vuex from 'vuex'
//需要使用插件一次
Vue.use(Vuex)
import home from './home';
import search from './search'
import detail from './detail/detail'
import shopcart from './shopcart/shopcart';
import user from './user/user'
import trade from './trade/trade';
//对外暴露Store类的一个实例
export default new Vuex.Store({
    //实现vuex仓库模块开发存储数据
    modules:{
        home,
        search,
        detail,
        shopcart,
        user,
        trade
    }
})