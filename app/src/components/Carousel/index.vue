<template>
  <div>
       <div class="swiper-container" ref="cur">
            <div class="swiper-wrapper">
                <div class="swiper-slide" v-for="(carousel) in list" :key="carousel.id">
                    <img :src="carousel.imgUrl">
                </div>
            </div>
            <!-- 如果需要分页器 -->
            <div class="swiper-pagination"></div>

            <!-- 如果需要导航按钮 -->
            <div class="swiper-button-prev"></div>
            <div class="swiper-button-next"></div>
        </div>
  </div>
</template>

<script>
import Swiper from 'swiper'
export default {
    name:'Carousel',
    props:['list'],
        watch:{
        list:{
            //立即监听：不管数据有没有变化上来立即监听一次
            //为什么watch监听不到list：因为数据时父组件给的，父亲给的时候就是一个对象，对象中该有的数据都是有的，数据没发生过变化
            immediate:true,//立即监听一次
            handler(){
                this.$nextTick(()=>{
                var mySwiper=new Swiper(
              this.$refs.cur,{
            loop:true,
            pagination:{
              el:".swiper-pagination",
              clickable:true
            },
            navigation:{
              nextEl:".swiper-button-next",
              prevEl:".swiper-button-prev"
            }
          })
                })
        
            }
           
        }
    }
}
</script>

<style>

</style>