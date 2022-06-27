//对外暴露函数
export const setToken=(token)=>{
    localStorage.setItem('TOKEN',token)
}
//清除本地存储
export const removeToken=()=>{
    localStorage.removeItem('TOKEN')
}