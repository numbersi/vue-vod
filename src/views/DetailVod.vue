<template>
  <div>
    <!-- {{vodData.name}} -->

    <el-card :body-style="{ padding: '0px' }">
      <img
        :src="vodData.pic"
        class="image"
      >

      <!-- <el-tag>标签一</el-tag>
      <el-tag type="success">标签二</el-tag>
      <el-tag type="info">标签三</el-tag>
      <el-tag type="warning">标签四</el-tag>
      <el-tag type="danger">标签五</el-tag>-->
      <el-row
        v-for="(item, index) in vodInfo"
        :key="index"
      >
        <el-col :span="4">
          <el-tag type="warning">{{item}}</el-tag>
        </el-col>
        <el-col
          :span="20"
          class="button"
        >
          <el-tag type="danger">{{vodData[index]}}</el-tag>
        </el-col>
      </el-row>

      <div style="padding: 14px;">

        <span>好吃的汉堡</span>
        <div class="bottom clearfix">
          <time class="time">{{ currentDate }}</time>
          <el-button class="button">操作按钮</el-button>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      vodData: {},
      vodInfo: {
        director: '导演',
        actor: '演员',
        lang: '语言',
        year: '年份',
        area: '地区',
      },
    }
  },
  async created() {
    console.log(this.$route);

    this.$axios.get('/api/vod/' + this.$route.params._id).then(res => {
      this.vodData = res.data
      // console.log(res)
    })
  },
}
</script>

<style scoped>
.vodInfoItem {
  float: left;
}
.time {
  font-size: 13px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.button {
  padding: 0;
  float: right;
}

.image {
  width: 100%;
  display: block;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both;
}
img{
  max-width: 100%;
  height: auto;
}
</style>