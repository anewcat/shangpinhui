<template>
   <div class="type-nav">
            <div class="container">
                <!-- 事件委派|事件代理 -->
                <div @mouseleave="leaveShow" @mouseenter="enterShow">
                    <h2 class="all">全部商品分类</h2>
                    <!-- 三级联动 -->
                    <!-- 过渡动画 -->
                    <transition name="sort">
                        <div class="sort" v-show="show"> 
                        <div class="all-sort-list2" @click="goSearch">
                            <div class="item" v-for="(c1,index) in categoryList" :key="c1.categoryId">
                                <h3 @mouseenter="changeIndex(index)" :class="{cur:currentIndex==index}" @mouseleave="leaveIndex">
                                    <a :data-categoryName="c1.categoryName" :data-category1Id="c1.categoryId">{{c1.categoryName}}</a>
                                </h3>
                                <!-- 二级、三级分类 -->
                                <!-- :style="{display:currentIndex==index?'block':'none'}" -->
                                <div class="item-list clearfix" >
                                    <div class="subitem" v-for="(c2) in c1.categoryChild" :key="c2.categoryId">
                                        <dl class="fore">
                                            <dt>
                                                <a :data-categoryName="c2.categoryName" :data-category2Id="c2.categoryId">{{c2.categoryName}}</a>
                                            </dt>
                                            <dd>
                                                <em v-for="(c3) in c2.categoryChild" :key="c3.categoryId">
                                                    <a :data-categoryName="c3.categoryName" :data-category3Id="c3.categoryId">{{c3.categoryName}}</a>
                                                </em>
                                            </dd>
                                        </dl>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    </transition>
                    
                </div>
                <nav class="nav">
                    <a href="###">服装城</a>
                    <a href="###">美妆馆</a>
                    <a href="###">尚品汇超市</a>
                    <a href="###">全球购</a>
                    <a href="###">闪购</a>
                    <a href="###">团购</a>
                    <a href="###">有趣</a>
                    <a href="###">秒杀</a>
                </nav>
            </div>
        </div>
</template>

<script>
// import Recommend from '@/pages/Home/Recommend'
// import ListContainer from '@/pages/Home/ListContainer'
import {mapState} from 'vuex';
import _ from 'lodash'
// import throttle from "lodash/throttle";

export default {
    name:"TypeNav",
    // components:{
    //     Recommend,
    //     ListContainer
    // },
    data(){
        return {
            currentIndex:-1,
            show:true
        }
    },
    //组件挂载完毕：可以向服务器发请求
    mounted(){
        //通知Vuex发请求，获取数据，存储于仓库当中
        // this.$store.dispatch('categoryList')
        if(this.$route.path!='/home'){
            this.show=false
        }
    },
    computed:{
        // 右侧需要的是一个函数，当使用这个计算属性的时候，右侧函数会立即执行一次
        // 注入一个参数state，其实即为大仓库中的数据
        ...mapState({
            categoryList:(state)=>{
                // console.log(state);
                return state.home.categoryList;
            }
        })
    },
    methods:{
        //鼠标进入修改响应式数据currentIndex
        // throttle回调函数别用箭头函数，可能出现上下文this
        changeIndex:_.throttle(function(index){
            //index：鼠标移上某一个一级分类的元素的索引值
            // 正常情况（用户慢慢的操作）：鼠标进入，每一个一级分类h3，都会触发鼠标进入事件
            // 非正常情况（用户操作很快）：本身全部的一级分类都应该触发鼠标进入事件，但是只有部分触发了
            // 就是由于用户行为过快导致浏览器反应不过来，如果当前回调函数中有一些大量业务有可能出现卡顿现象
            this.currentIndex=index;
        },50),
        leaveIndex(){
            // 一级分类鼠标移出的事件回调
            this.currentIndex=-1
        },
        goSearch(event){
            //最好的解决方案：编程式导航+事件委派
            // 存在一些问题：事件委派，是把全部的子节点【h3、dt、dl、em】的事件委派给父节点
            //点击a标签的时候，才会进行路由跳转【如何确定点击的一定是a标签】
            // 存在另一个问题，即使你能确定点击的是a标签，如何区分是一级、二级、三级分类的标签
            //第一个问题：把子节点当中a标签，加上自定义属性data-categoryName，其余的子节点是没有的
            let element=event.target;
            //获取到当前触发这个事件的节点【h3、a、dt、dl】,需要有data-categotyname这样的节点【一定是a标签】
            //节点有一个属性dataset属性。可以获取节点的自定义属性与属性值
            let {categoryname,category1id,category2id,category3id}=element.dataset;
            // console.log(categoryname)
            //如果标签身上拥有categoryName一定是a标签
            
            if(categoryname){
                // alert(123)
                let location={name:"search"};
                let query={categoryName:categoryname}
                if(category1id){
                    query.category1Id=category1id ;  
                }else if(category2id){
                    query.category2Id=category2id;
                }else{
                    query.category3Id=category3id;
                }
                //判断：如果路由跳转的时候带有params参数，要捎带传过去
                if(this.$route.params){
                    location.params=this.$route.params;
                    //动态给location配置对象添加query属性
                    location.query=query
                    //路由跳转
                    this.$router.push(location);
                }
                //整理完参数
                //geilocation动态添加query参数
                location.query=query;
                //路由跳转
                this.$router.push(location)
            }
        },
        enterShow(){
            //鼠标移入时，让商品分类列表进行展示
            if(this.$route.path!='/home'){
                this.show=true
            }
            this.show=true;
        },
        // 当鼠标移除时，让商品分类列表进行隐藏
        leaveShow(){
            // 判断如果是Search路由组件的时候才会执行
            if(this.$route.path!="/home"){
                this.currentIndex=-1;
                this.show=false;
            }
            // this.show=false;
        }

    }
}
</script>

<style scoped lang="less">
.type-nav {
        border-bottom: 2px solid #e1251b;

        .container {
            width: 1200px;
            margin: 0 auto;
            display: flex;
            position: relative;

            .all {
                width: 210px;
                height: 45px;
                background-color: #e1251b;
                line-height: 45px;
                text-align: center;
                color: #fff;
                font-size: 14px;
                font-weight: bold;
            }

            .nav {
                a {
                    height: 45px;
                    margin: 0 22px;
                    line-height: 45px;
                    font-size: 16px;
                    color: #333;
                }
            }

            .sort {
                position: absolute;
                left: 0;
                top: 45px;
                width: 210px;
                height: 461px;
                position: absolute;
                background: #fafafa;
                z-index: 999;
                overflow:hidden;

                .all-sort-list2 {
                    .item {
                        h3 {
                            line-height: 30px;
                            font-size: 14px;
                            font-weight: 400;
                            overflow: hidden;
                            padding: 0 20px;
                            margin: 0;

                            a {
                                color: #333;
                            }
                        }

                        .item-list {
                            display: none;
                            position: absolute;
                            width: 734px;
                            min-height: 460px;
                            background: #f7f7f7;
                            left: 210px;
                            border: 1px solid #ddd;
                            top: 0;
                            z-index: 9999 !important;

                            .subitem {
                                float: left;
                                width: 650px;
                                padding: 0 4px 0 8px;

                                dl {
                                    border-top: 1px solid #eee;
                                    padding: 6px 0;
                                    overflow: hidden;
                                    zoom: 1;

                                    &.fore {
                                        border-top: 0;
                                    }

                                    dt {
                                        float: left;
                                        width: 54px;
                                        line-height: 22px;
                                        text-align: right;
                                        padding: 3px 6px 0 0;
                                        font-weight: 700;
                                    }

                                    dd {
                                        float: left;
                                        width: 415px;
                                        padding: 3px 0 0;
                                        overflow: hidden;

                                        em {
                                            float: left;
                                            height: 14px;
                                            line-height: 14px;
                                            padding: 0 8px;
                                            margin-top: 5px;
                                            border-left: 1px solid #ccc;
                                        }
                                    }
                                }
                            }
                        }

                        &:hover {
                            .item-list {
                                display: block;
                            }
                        }
                    }
                }
            }
            //过渡动画的样式
            //过渡动画开始状态（进入）
            .sort-enter{
                height:0px;
            }
            .sort-enter-to{
                height:458px;
            }
            .sort-enter-active{
                transition:all .5s linear;  
            }
            .all-sort-list2{
                .cur{
                    background-color: skyblue;
                }
            }
        }
    }
</style>