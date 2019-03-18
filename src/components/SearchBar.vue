<template>
  <div>
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
  </div>
</template>

<script>

export default {
  data() {
    return {
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
    }
  },
  computed: {
    wd: {
      get() {
        return this.$store.getters.wd
      },
      set(d) {
        this.$store.dispatch('setValue', { title: 'wd', value: d })
      }
    }

  },
  methods: {
    searchByWd(wd = this.wd, source = this.source) {
      this.$emit('searchByWd', { wd, source })
      this.$store.dispatch('setValue', { title: 'source', value: source })
    }
  }, watch: {
    source(n) {
      if (n) {
        this.$store.dispatch('setValue', { title: 'source', value: n })
        this.$store.dispatch('setValue', { title: 'sourc2222e', value: n })
        if (this.wd) {
          this.searchByWd()
        } else {
          this.$router.push('/index')
        }
      }
    }
  }
}
</script>

<style scoped>
</style>