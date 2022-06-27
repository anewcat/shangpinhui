import { reqGetCode ,reqUserRegister,reqUserLogin,reqUserInfo, reqLogOut} from "@/api";
import {setToken,removeToken} from '@/utils/token';
//登录与注册的模块
const state={
    code:'',
    token:localStorage.getItem('TOKEN'),
    userInfo:{}
};
const mutations={
    GETCODE(state,code){
        state.code=code
    },
    USERLOGIN(state,token){
        state.token=token;
    },
    GETUSERINFO(state,userInfo){
        state.userInfo=userInfo
    },
    CLEAR(state){
        //把仓库中相关用户信息清空
        state.token='';
        state.userInfo={};
        // 本地存储清空
        removeToken();
    }
};
const actions={
    //获取验证码
    async getCode({commit},phone){
        //获取验证码这个接口，但是正常情况应该是后台把验证码发到用户手机上【省钱】
        let result=await reqGetCode(phone);
        if(result.code==200){
            commit('GETCODE',result.data)
            return 'ok'
        }else{
            return Promise.reject(new Error('faile'))
        }
        console.log(result)
    },
    //用户的注册
    async userRegister({commit},user){
        let result=await reqUserRegister(user)
        if(result.code==200){
            return 'ok'
        }else{
            return Promise.reject(new Error('faile'))
        }
    },
    //登录业务
    async userLogin({commit},data){
        let result=await reqUserLogin(data)
        // console.log(result)
        // 服务器下发token，用户唯一标识符
        // 将来经常通过带token找服务器要用户信息进行展示
        if(result.code==200){
            commit("USERLOGIN",result.data.token)
            //持久化存储token
            // localStorage.setItem('TOKEN',result.data.token)
            setToken(result.data.token)
            return 'ok'
        }else{
            return Promise.reject(new Error('faile'))
        }
    },
    //获取用户信息
    async getUserInfo({commit}){
     let result = await reqUserInfo()  
     if(result.code==200){
         //提交用户信息
         commit("GETUSERINFO",result.data)
         return 'ok'
     }else{
         return Promise.reject(new Error('faile'))
     }
    },
    // 退出登录
    async userLogout({commit}){
        //向服务器发请求通知服务器清除token
        let result=await reqLogOut()
        //action中不能操作state，提交mutations修改state
        if(result.code==200){
            commit("CLEAR");
            return 'ok'
        }else{
            return Promise.reject(new Error('faile'));
        }
    }
    
};
const getters={}
export default {
    state,
    mutations,
    actions,
    getters
}