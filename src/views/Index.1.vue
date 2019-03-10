<template>
  <div>
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
          @click="searchByWd"
        ></el-button>
      </el-input>
    </div>
    <el-row class="row">
      <el-col
        :span="11"
        v-for="(item, index) in videos"
        :key="index"
        :offset="1"
      >
        <div @click="play(item)">

          <el-card
            shadow="always"
            :body-style="{ padding: '0px' }"
          >

            <img
              id='image'
              :src="item.pic.join('')"
              class="image"
            >

            <div style="padding: 14px;">
              <div>{{item.name.join('')}}</div>
              <div>
                <el-tag size="mini">{{item.type.join('')}}</el-tag>
              </div>
              <div>
                <el-tag
                  size="mini"
                  type="danger"
                >{{item.note.join('')}}</el-tag>
              </div>

            </div>
          </el-card>
        </div>

      </el-col>
    </el-row>
    <player
      :visible.sync="dialogVisible"
      :item="chooseedItem"
    ></player>
  </div>

</template>

<script>
// import Carousel from '../components/Carousel';
import Player from '../components/Player';
export default {
  data() {
    return {
      items: [],
      videos: [],
      dialogVisible: false,
      chooseedItem: {},
      wd: '',
      source: "/zuida",
      sources: [
        {
          label: '资源1',
          value: '/zuida'
        }, {
          label: '资源2',
          value: '/kuyun'
        }
      ]
    }
  },
  components: { Player },
  async created() {
    this.get24h('/zuida')
  },
  methods: {
    play(item) {
      console.log(item);
      this.dialogVisible = true
      this.chooseedItem = item
    },
    async get24h(source = '/zuida') {

      this.$axios.get((this.source || source) + '?ac=videolist&h=24').then(async (result) => {
        // console.log(result)
        // this.items =result.data
        console.log(this.xml);
        let a = await this.xml.searchXML(result.data)
        this.videos = a.video

      }).catch((err) => {
        console.log(err)
      });
    },
    searchByWd() {
      console.log(this.wd)
      console.log(this.source)
      this.$axios.get(this.source + '?ac=videolist&w='+this.wd).then(async (result) => {
        let a = await this.xml.searchXML(result.data)
        this.videos = a.video
      }).catch((err) => {
        console.log(err)
      });
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
    }
  }
}
</script>

<style scoped>
.row {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
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