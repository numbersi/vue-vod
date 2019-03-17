<template>
  <div class="page">
    <!-- <carousel :items="items"></carousel> -->
    <div style="margin-top: 15px;">
      <el-input
        placeholder="请输入内容"
        v-model="wd"
        class="input-with-select"
      >
        <i
          slot="prefix"
          class="el-input__icon el-icon-search"
        ></i>
        <el-select
          v-model="source"
          slot="prepend"
          placeholder="请选择"
        >
          <el-option
            v-for="(item,index)  in sources"
            :key="index"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <el-button
          slot="append"
          icon="el-icon-search"
          @click="searchByWd()"
        ></el-button>
      </el-input>
      <videos
        :videos="videos"
        v-on:play="play"
      />
    </div>

    <player
      :visible.sync="dialogVisible"
      :item="chooseedItem"
    ></player>
  </div>

</template>

<script>
import Player from '../components/Player';
import Videos from '../components/Videos';
import urlPares from 'url-parse'
import decodeJWT from 'jwt-decode';
export default {
  data() {
    return {
      items: [],
      videos: [],
      dialogVisible: false,
      chooseedItem: {},
      source: "/zuida",
      sources: [
        {
          label: '资源1',
          value: '/zuida'
        }, {
          label: '资源2',
          value: '/kuyun'
        }
      ],
      isAuthentivated: this.$store.getters.isAuthentivated,
      wd: ''
    }
  },
  components: { Player, Videos },
  async created() {
    console.log('windos :', window.location.href);
    // 解析token
    const token = window.localStorage.Token
    let decoded = ''
    if (token) {
      decoded = decodeJWT(token)
      console.log(decoded);
    }
    //获取 wd token 或者 转发中的wd
    let wd = urlPares(window.location.href, true).query.wd || decoded.wd
    console.log('wd :', wd);
    if (wd) {
      this.wd = wd
      this.searchByWd(wd)
    } else {
      this.get24h()
    }
    this.wd = wd
    this.$store.dispatch('setLogin', decoded)
    window.onscroll = function () {
      //变量scrollTop是滚动条滚动时，距离顶部的距离
      var scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop; //变量windowHeight是可视区的高度
      var windowHeight =
        document.documentElement.clientHeight || document.body.clientHeight; //变量scrollHeight是滚动条的总高度
      var scrollHeight =
        document.documentElement.scrollHeight || document.body.scrollHeight; //滚动条到底部的条件
      if (scrollTop + windowHeight == scrollHeight) {
        //写后台加载数据的函数
        console.log(
          "距顶部" +
          scrollTop +
          "可视区高度" +
          windowHeight +
          "滚动条总高度" +
          scrollHeight
        );
        // 記載数据

      }
    };
  },

  methods: {
    play(video) {
      const id = video.id
      let storageKey = id + '-' + this.source
      let storage = window.localStorage.getItem(storageKey)
      if (storage) {
        this.dialogVisible = true
        this.chooseedItem = JSON.parse(storage)
      } else {
        this.$axios.get(this.source + '?ac=videolist&t=&pg=&h=&wd=&ids=' + id).then(async (result) => {
          let a = await this.xml.searchXML(result.data)
          let videoDatay = a.video[0]
          console.log('videsoDatey :', videoDatay);
          if (videoDatay.note.indexOf('全') != -1) {
            window.localStorage.setItem(storageKey, JSON.stringify(videoDatay))
          }
          this.dialogVisible = true
          this.chooseedItem = videoDatay
        })
      }
    },
    async get24h() {
      let storageKey = 'get24h' + this.source
      let storage = window.localStorage.getItem(storageKey)

      let get_at = window.localStorage.get_at
      const nowTime = new Date().getTime()
      console.log('nowTime-get_at', nowTime - get_at);
      if (storage && get_at && nowTime - get_at < 360000) {
        return this.videos = JSON.parse(storage)
      }
      this.$axios.get(this.source + '?ac=list&h=24').then(async (result) => {
        let a = await this.xml.searchXML(result.data)
        console.log('a :', a);
        this.videos = a.video
        window.localStorage.setItem(storageKey, JSON.stringify(a.video))
        window.localStorage.setItem('get_at', nowTime)

      })
    },
    searchByWd(wd = this.wd) {
      console.log(wd)
      this.$axios.get(this.source + '?ac=list&t=&pg=1&h=&ids=&wd=' + wd).then(async (result) => {
        let a = await this.xml.searchXML(result.data)
        console.log('a :', a);
        this.videos = a.video
      })
    }
  },
  watch: {
    source(n) {
      if (n) {
        if (this.wd) {
          this.searchByWd()
        } else {
          this.get24h(n)
        }
      }
    },
    dialogVisible(n) {
      if (!n) { window.document.title = '飛鳥' }
    }
  }
}
</script>
<style scoped>
.page {
  background: rgb(211, 255, 202);
}
.video {
  margin-top: 4%;
  display: flex;
  height: 46px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  flex-wrap: wrap;
  align-content: center;
  align-items: flex-end;
}
.type {
}
.row {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
}
.box-card {
  margin: 10px 5px;
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
  margin-top: 5%;
  width: 100%;
  object-fit: fill;
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
</style>