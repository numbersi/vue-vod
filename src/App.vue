<template>
  <div id="app">

    <keep-alive exclude="vodDetail">
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
export default {

  name: 'app',
  data() {
    return {
      wd: '',
      select: '',
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
  components: {
  },

}
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
body {
  margin: 0;
}
.el-select .el-input {
  width: 130px;
}
.input-with-select .el-input-group__prepend {
  background-color: #fff;
}
</style>
