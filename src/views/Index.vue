<template>
  <div class="page">
    <!-- <carousel :items="items"></carousel> -->
    <div>
      <search-bar v-on:searchByWd="searchByWd"></search-bar>
      <videos
        :videos="videos"
        :source="source"
      />
    </div>

  </div>

</template>

<script>
import Videos from '../components/Videos';
import SearchBar from '../components/SearchBar';
export default {
  data() {
    return {
      items: [],
      videos: [],
      dialogVisible: false,
      chooseedItem: {},
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
      wd: '',
    }

  },
  computed: {
    source() {
      return this.$store.getters.source
    }
  },
  components: { Videos, SearchBar },
  async created() {
    this.wxApi.wxShowMenu();
    this.wxApi.ready({
      title: window.document.title, // 分享标题
      desc: '免费在线观看，速来围观',// 分享描述
      link: window.location.href,// 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
      imgUrl: this.item.pic// 分享图标
    })

    this.get24h()
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
    async get24h(source = this.source) {
      let storageKey = 'get24h' + source
      let storage = window.localStorage.getItem(storageKey)
      let get_at = window.localStorage.get_at
      const nowTime = new Date().getTime()
      if (storage && get_at && nowTime - get_at < 360000) {
        return this.videos = JSON.parse(storage)
      }
      this.$axios.get(source + '?ac=list&h=24').then(async (result) => {
        let a = await this.xml.searchXML(result.data)
        console.log('a :', a);
        this.videos = a.video
        window.localStorage.setItem(storageKey, JSON.stringify(a.video))
        window.localStorage.setItem('get_at', nowTime)

      })
    },
    searchByWd(data) {
      console.log(data.wd)
      // this.$router.push({ name: 'search', params: { wd:'sss' } })
      this.$router.push(`/index/search`)
      // this.$store.dispatch('setValue', { title: 'wd', value: wd })

    }
  },
  watch: {
    source(n) {
      console.log('n :', n);
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