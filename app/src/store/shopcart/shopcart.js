import { reqCarList ,reqDeleteCartById,reqUpdateCheckedByid} from "@/api"
const state={
    cartList:[]
}
const mutations={
    GETCARTLIST(state,cartList){
        state.cartList=cartList
    }
}
const actions={
    //获取购物车列表数据
    async getCartList({commit}){
        let result=await reqCarList()
        //测试是否能获取个人购物车数据
        // console.log(result)
        if(result.code==200){
            commit('GETCARTLIST',result.data)
        }
    },
    //删除购物车的某一个产品
    async deleteCartListBySkuId({commit},skuId){
        let result=await reqDeleteCartById(skuId)
        if(result.code==200){
            return 'OK'
        }else{
            return Promise.reject(new Error('faile'));
        }
    },
    //切换商品选中的状态
    async updateCheckedByid({commit},{skuId,isChecked}){
        let result=await reqUpdateCheckedByid(skuId,isChecked);
        if(result.code==200){
            return 'OK'
        }else{
            return Promise.reject(new Error('faile'))
        }
    },
    //删除全部勾选的商品
    deleteAllCheckedCart({dispatch,getters}){
        // alert(123)
        // context:可以理解为小仓库，其中有commit【提交mutations修改state】 getters【计算属性】  dispatch【派发action】  state【当前仓库数据】
        //获取购物车中全部产品（是一个数组）
        let PromiseAll=[]
        getters.cartList.cartInfoList.forEach(item=>{
          // console.log(123)
         let promise= item.isChecked==1?dispatch('deleteCartListBySkuId',item.skuId):''
         //将每一次返回的promise添加到数组中
         PromiseAll.push(promise)
        })
        // 都成功才返回成功
        return Promise.all(PromiseAll)
      },
      //修改全部产品的状态
      updateAllCartIsChecked({dispatch,state},isChecked){
        // console.log(state);
        let promiseAll=[];
        state.cartList[0].cartInfoList.forEach((item)=>{
           let promise= dispatch('updateCheckedByid',{
               skuId:item.skuId,
               isChecked,
           })
            promiseAll.push(promise)
        })
        return Promise.all(promiseAll)
      }
}
const getters={
    cartList(state){
        return state.cartList[0]||{}
    }
}
export default {
    state,
    mutations,
    actions,
    getters
}
