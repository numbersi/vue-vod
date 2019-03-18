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
    <player
      :visible.sync="dialogVisible"
      :item="chooseedItem"
    ></player>
  </div>

</template>

<script>
import Player from '../components/Player';

export default {

  props: ['videos', 'source'],
  components: { Player },
  data() {
    return {
      dialogVisible: false,
      chooseedItem: {}
    }
  },
  methods: {
    play(video) {
      this.$router.push(`/index/detail?id=${video.id}&source=${this.source||this.$store.getters.source}`)
      // let storageKey = id + '-' + this.source
      // let storage = window.localStorage.getItem(storageKey)
      // if (storage) {
      //   this.dialogVisible = true
      //   this.chooseedItem = JSON.parse(storage)
      // } else {
      //   this.$axios.get(this.source + '?ac=videolist&t=&pg=&h=&wd=&ids=' + id).then(async (result) => {
      //     let a = await this.xml.searchXML(result.data)
      //     let videoDatay = a.video[0]
      //     console.log('videsoDatey :', videoDatay);
      //     if (videoDatay.note.indexOf('全') != -1) {
      //       window.localStorage.setItem(storageKey, JSON.stringify(videoDatay))
      //     }
      //     this.dialogVisible = true
      //     this.chooseedItem = videoDatay
      //   })
      // }
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
  min-height: 164px;
  max-height: 164px;
}
</style>