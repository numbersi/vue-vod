<template>
  <el-carousel
    :interval="4000"
    height="200px"
    @change="change"
  >
    <el-carousel-item
      v-for="(item,index) in items"
      :key="index"
    >
      <img
        :src="item.pic"
        alt=""
        srcset=""
        @click="goDetail(item._id)"
      >
    </el-carousel-item>
  </el-carousel>
</template>

<script>
export default {
  props: ['items']
  ,
  data() {
    return {
      // items: [
      //   '//ykimg.alicdn.com/develop/image/2019-03-02/01f8133f03e51564d404fc2ca1e09252.jpg',
      //   '//r1.ykimg.com/050E00005C416719ADC311330B03413D?x-oss-process=image/resize,w_290/interlace,1/quality,Q_100/sharpen,100',
      //   'https://images.weserv.nl/?url=https://img3.doubanio.com/view/photo/m/public/p2549238013.webp'
      // ],
      height: document.body.clientWidth / 3 + 'px',
      item_index: ''
    }
  },
  //方法
  methods: {
    change(e) {
      this.item_index = e
      console.log(e);
    }, goDetail(e) {
      console.log(e);
      this.$router.push('/vod/' +e)
    }
  }
}
</script>
<style>
img {
  max-width: 100%;
  height: 100%;
  object-fit: cover;
}
/* .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
  }
  */

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>