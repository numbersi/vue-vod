<template>
  <div>
    <el-row class="row">
      <el-col
        :span="12"
        v-for="(video, index) in videos"
        :key="index"
      >
        <el-card class="box-card">
          <div>
            <p class="name">{{video.name}}</p>
          </div>
          <el-tag
            type="danger"
            size="small"
          >{{ video.type }}</el-tag>
          <el-tag
            type="danger"
            size="mini"
          >{{video.note }}</el-tag>
          <div>
            <el-button
              solt="footer"
              type="primary"
              icon="el-icon-caret-right"
              @click="play(video)"
            >播放</el-button>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {

  props: ['videos'],
  methods: {
    play(video) {
      this.$emit('play', video);
    }
  }
}

</script>

<style scoped>
.name {
  color: brown;
  font-size: smaller;
}

.box-card {
  margin: 10px 5px;
  min-height:164px; 
  max-height:164px; 
}
</style>