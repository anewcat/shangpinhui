import { reqGoodsInfo ,reqAddOrUpdateShopCart} from "@/api";
// 封装游客身份模块uuid-->生成一个随机字符串（不可以变了）
import {getUUID} from '@/utils/uuid_token'
const state={
    goodInfo:{},
    //游客临时身份
    uuid_token:getUUID()
};
const mutations={
    GETGOODINFO(state,goodInfo){
        state.goodInfo=goodInfo
    },
    // ADDORUPDATASHOPCART(state,)
};
const actions={
    //获取产品信息的actions
    async getGoodInfo({commit},skuId){
        let result=await reqGoodsInfo(skuId)
        if(result.code==200){
            commit("GETGOODINFO",result.data)
        }
    },
    //将产品添加到购物车中
    async addOrUpdateShopCart({commit},{skuId,skuNum}){
        //加入购物车返回的结果
        //加入购物车以后（发请求），前台将参数带给服务器
        //服务器写入数据成功，并没有返回其他的数据，只是返回code=200，代表这次操作成功
        //因为服务器没有返回其余数据，因此不需要三连环存储数据
       let result=await reqAddOrUpdateShopCart(skuId,skuNum)
        // console.log(result)
        // 当前函数如果之心返回的是promise
        if(result.code==200){
            //代表服务器加入购物车成功
            return "lalala"//此处返回费控字符串
        }else{
            //代表加入购物车失败
            return Promise.reject(new Error('faile'))
        }
    }
    
    
};
//简化数据而生
const getters={
    //路径导航简化的数据
    categoryView(state){
        //如果state.goodInfo初识状态是空对象，空对象的categoryView属性值undefined
        //当前计算出的 categoryView属性值至少是一个空对象，假的报错不会有了
        return state.goodInfo.categoryView||{};
    },
    // 简化产品信息的数据
    skuInfo(state){
        return state.goodInfo.skuInfo||{};
    },
    // 产品售卖属性的简化
    spuSaleAttrList(state){
        return state.goodInfo.spuSaleAttrList||[]
    }
};
export default {
    state,
    mutations,
    actions,
    getters
}