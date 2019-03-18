<template>

  <div>
    <!-- <search-bar v-on:searchByWd="searchByWd"></search-bar> -->
    <div>
      <el-button
        class="goBack"
        type="primary"
        icon="el-icon-arrow-left"
        @click="goBack"
      >返回</el-button>
    </div>

    <div width></div>
    <div class="vodTitle">{{item.name }}</div><span>{{playTitle}}</span>
    <video-player
      class="video-player-box"
      ref="videoPlayer"
      :options="playerOptions"
      @play="onPlayerPlay($event)"
      @timeupdate="onPlayerTimeupdate($event)"
    ></video-player>
    <div class="warn"> <i class="el-icon-warning"></i> 资源来自网络，视频会有广告水印，请勿上当，后果严重且自负！！</div>

    <div class='play_list'>
      <div
        class="play_src"
        v-for="(playItem,index) in item.playList"
        :key="index"
      >

        <el-tag
          type="button"
          size="medium"
          @click="chooseNum(playItem)"
        >{{playItem.title}}</el-tag>

      </div>

    </div>
    <div
      class="warn"
      v-if="!isAuthentivated"
    >
      此链接已失效，所有视频只播放10分钟，如需观看 你请关注
      <div>请关注微信公众号,回复 <span class="vodTitle">{{item.name}}</span></div>
      <img
        width="100%"
        src="http://ww1.sinaimg.cn/large/6485c65ely1g0wezfle49j209k09kq2v.jpg"
        alt=""
      >
    </div>

  </div>
</template>

<script>
import 'video.js/dist/video-js.css'
import 'vue-video-player/src/custom-theme.css'
import { videoPlayer } from 'vue-video-player'
// require videojs style
import 'videojs-contrib-hls'

export default {
  // props: ['visible', 'item'],
  data() {
    return {
      playerOptions: {
        playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
        autoplay: false, //如果true,浏览器准备好时开始回放。
        controls: true, //控制条
        preload: 'auto', //视频预加载
        muted: false, //默认情况下将会消除任何音频。
        loop: false, //导致视频一结束就重新开始。
        poster: '',
        sources: [],
        language: 'zh-CN',
        notSupportedMessage: '此视频暂无法播放，请稍后再试', //允许覆盖Video.js无法播放媒体源时显示的默认信息。
        width: document.body.clientWidth
      },
      visibleValue: false, playTitle: '',
      innerVisible: false,
      item: {}
    }
  },
  watch: {
    item(n) {
      let playList = []
      console.log(n)
      if (n.dl) {
        n.dl.dd.split('#').forEach(element => {
          const elementArr = element.split('$')
          // playList[elementArr[0]] = elementArr[1]
          playList.push({ title: elementArr[0], src: elementArr[1] })
        });
        n.playList = playList.reverse()
      }
      this.playerOptions.sources = [{
        type: 'application/x-mpegURL',
        src: n.playList[0].src
      }]
      this.playerOptions.poster = n.pic
      this.playTitle = n.playList[0].title
      window.document.title = n.name + n.playList[0].title
      this.wxApi.ready({
        title: window.document.title, // 分享标题
        desc: '免费在线观看，速来围观',// 分享描述
        link: window.location.href,// 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
        imgUrl: this.item.pic// 分享图标
      })
    },
    visible(n) {
      this.visibleValue = n
    }
  },
  created() {
    const { id, source } = this.$route.query
    let storageKey = id + '-' + source
    let storage = window.localStorage.getItem(storageKey)
    if (storage) {
      this.dialogVisible = true
      this.item = JSON.parse(storage)
    } else {
      this.$axios.get(source + '?ac=videolist&t=&pg=&h=&wd=&ids=' + id).then(async (result) => {
        let a = await this.xml.searchXML(result.data)
        let videoDatay = a.video[0]
        console.log('videsoDatey :', videoDatay);
        if (videoDatay.note.indexOf('全') != -1) {
          window.localStorage.setItem(storageKey, JSON.stringify(videoDatay))
        }
        this.dialogVisible = true
        this.item = videoDatay
      })
    }
    this.wxApi.ready({
      title: window.document.title, // 分享标题
      desc: '免费在线观看，速来围观',// 分享描述
      link: window.location.href,// 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
      imgUrl: this.item.pic// 分享图标
    })


  },
  components: { videoPlayer },
  computed: {
    player() {
      return this.$refs.videoPlayer.player
    },
    isAuthentivated() {
      return this.$store.getters.isAuthentivated
    }
  },
  methods: {
    goBack() {
      if (this.$router.history.current.path !== this.$router.path) {
        return this.$router.go(-1)
      }
      this.$router.push('/index')
    },
    onPlayerPlay(e) {
      e
    },
    onPlayerTimeupdate(player) {
      // console.log('player Timeupdate!', player.currentTime())
      if (player.currentTime() > 600 && !this.isAuthentivated) {
        player.pause()
        this.innerVisible = true
      }
    },
    close() {
      this.$emit('update:visible', false)
      this.player.pause()
    },
    chooseNum(playItem) {
      this.playerOptions.sources = [{
        type: 'application/x-mpegURL',
        src: playItem.src
      }]
      this.playTitle = playItem.title
      this.wxApi.ready({
        title: window.document.title,
        desc: '免费在线观看，速来围观',
        link: window.location.href,
        imgUrl: this.item.pic
      })
    }
  }
}

</script>

<style >
.video-js {
  width: 100%;
}
.video-js .vjs-big-play-button {
  left: 50% !important;
  top: 50% !important;
  margin-left: -2em;
  margin-top: -1.3em;
}
.play_list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
.play_src {
  margin: 4px;
}
.vodTitle {
  color: crimson;
  font-size: xx-large;
}
.warn {
  font-size: x-small;
  color: brown;
  margin: 10px auto;
  width: 100%;
}
.goBack {
  width: 100%;
  background: seagreen;
}
</style>