import Vue from 'vue';

import VueRouter from 'vue-router';

import store from '@/store'
Vue.use(VueRouter);

import routes from './routes'
// 先把VueRouter原型对象的push，保存一份
let originPush=VueRouter.prototype.push;
console.log(originPush);
//重写push|replace
VueRouter.prototype.push=function(location,resolve,reject){
    if(resolve&&reject){
        originPush.call(this,location,resolve,reject);
    }else{
        originPush.call(this,location,()=>{},()=>{})
    }
}

let router=new VueRouter({
    routes,
    //滚动行为控制滚动条的位置
    scrollBehavior (to, from, savedPosition) {
        //返回的y=0代表滚动条在最上方
        return {y:0}
      }
})

//全局守卫：前置守卫（在路由跳转之间尽心判断）
router.beforeEach(async (to,from,next)=>{
    //to:可以获取到你要跳转到哪个路由信息
    // from:可以获取到你从哪个路由而来的信息
    //next:放行函数  next()放行  next(path)放行到指令路由  next(false)
    //  next();
     //用户登录了才会有token
     let token=store.state.user.token
     let name=store.state.user.userInfo.name
    //  用户已经登陆了
    if(token){
         //用户已经登录了就不可以去login 停留在首页
         if(to.path=='/login'||to.path=='/register'){
            next('/home')
        }else{
            //用户已经登录但是不去login
            //如果有用户名
            if(name){
                next();
              
            }else{
                //如果刷新后没有用户信息了,派发action让仓库存储用户信息再跳转
                try{
                    // 获取用户信息
                    await store.dispatch('getUserInfo')
                    next();
                   
                }catch(error){
                    // token失效了获取不到用户信息需要重新登录
                    // 清除token
                    await store.dispatch('userLogout')
                    next('/login')
                }
                
            }
        }
    }else{
        // 未登录:未登录不能去交易、支付相关的页面【pay|paysuccess】、不能去个人中心
    //    未登录时可以去（home|search|shopCart）---放行
    let toPath=to.path;
    if(toPath.indexOf('/trade')!=-1||toPath.indexOf('/pay')!=-1||toPath.indexOf('/center')!=-1){
        //把未登录时想去但是没有去成的信息，存储于地址栏中
        next('/login?redirect='+toPath)
    }else{
        next();
    }
    }
     console.log()
})

export default router;

