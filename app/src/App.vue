<template>
  <div id="app">
    <Header></Header>
    <!-- 我是根组件 -->
    <router-view></router-view>
    <Footer v-show="$route.meta.show"></Footer>
  </div>
</template>

<script>
import Header from './components/Header'
import Footer from './components/Footer'

export default {
  name: '',
  components: {
    Header,
    Footer
  },
  mounted(){
    //派发一个action||获取商品分类的三级列表
    this.$store.dispatch("categoryList")
  },

}
</script>

<style>

</style>
