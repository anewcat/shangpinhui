//路由配置的信息
// import Home from '../pages/Home'
import Search from '../pages/Search'
import Login from '../pages/Login'
import Register from '../pages/Register'
import Detail from '../pages/Detail'
import AddCartSuccess from '../pages/AddCartSuccess'
import ShopCart from '../pages/ShopCart'
import Trade from '../pages/Trade'
import Pay from '../pages/Pay'
import PaySuccess from '../pages/PaySuccess'
import Center from '../pages/Center'
//引入二级路由组件
import MyOrder from '@/pages/Center/myOrder'
import groupOrder from '@/pages/Center/groupOrder'
// 当打包构建应用时，JavaScript包会变得非常大，影响页面加载
// 如果我们能把不同路由对应的组件分割成不同的代码块，
// 然后当路由被访问的时候才加载对应组件，这样就更加高效了

export default[
    
    {
        path:'/center',
        name:'Center',
        component:Center,
        meta:{show:true},
        children:[
            {
                //子组件路径开头不要加斜杠
                path:'myorder',
                component:MyOrder,
                meta:{show:true},
            },
            {
                path:'grouporder',
                component:groupOrder,
                // meta:{show:true},
            },
            {
                path:'/center',
                redirect:'/center/myorder'
            }
        ]
    },
    {
        path:'/paysuccess',
        name:'PaySuccess',
        component:PaySuccess,
        meta:{show:true}
    },
    {
        path:'/pay',
        name:'Pay',
        component:Pay,
        meta:{show:true},
        beforeEnter:(to,from,next)=>{
            if(from.path=="/trade"){
                next();
            }else{
                next(false)
            }
        }
    },
    {
        path:'/Trade',
        name:'Trade',
        component:Trade,
        meta:{show:true},
        beforeEnter:(to,from,next)=>{
            if(from.path=="/shopcart"){
                next();
            }else{
                //如果不是从购物车来的从哪来回哪去（也就是不跳转）
                next(false)
            }
        }
    },
    {
        path:'/shopCart',
        name:'shopCart',
        component:ShopCart,
        meta:{show:true}
    },
    {
        path:'/addcartsuccess',
        name:'addcartsuccess',
        component:AddCartSuccess,
        meta:{show:true}
    },
    {
        path:'/home',
        component:()=>import("@/pages/Home"),
        // 路由懒加载
        meta:{show:true}
    },
    {
        path:'/search/:keyword?',
        component:Search,
        meta:{show:true},
        name:'search'
    },
    {
        path:'/login',
        component:Login,
        meta:{show:false}
    },
    {
        path:'/register',
        component:Register,
        meta:{show:false}
    },
    {
        path:'/detail/:id?',
        component:Detail,
        meta:{show:true}
    },
    //重定向，在项目跑起来的时候，访问/立马让他定向到首页
    {
        path:'*',
        redirect:"/home"
    }
]
