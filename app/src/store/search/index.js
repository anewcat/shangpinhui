//search模块的小仓库
import { reqGetSearchInfo } from "@/api";
const state={
    searchList:{}
};
const mutations={
    GETSEARCHLIST(state,searchList){
        state.searchList=searchList
    }
};
const actions={
    //获取search模块的数据
    async getSearchList({commit},params={}){
        //当前这个reqGetSearchInfo这个函数在调用获取服务器数据的时候，至少传递一个参数（空对象）
        // params形参：是当用户派发action的时候，第二个参数传递过来的，至少是一个空对象
        let result = await reqGetSearchInfo(params);
        if(result.code==200){
            commit("GETSEARCHLIST",result.data)
        }
    }
};
//项目中getters的主要作用是：简化仓库中的数据
const getters={
    //当前形参state ，当前仓库中的state并非大仓库中的那个state
    goodsList(state){
        //加入没网的时候也要返回空对象
        return state.searchList.goodsList||[];
    },
    attrsList(state){
        return state.searchList.attrsList;
    },
    trademarkList(state){
        return state.searchList.trademarkList;
    },
};

export default {
    state,
    mutations,
    actions,
    getters
}