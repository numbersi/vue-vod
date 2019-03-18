<template>
  <div>
    <search-bar v-on:searchByWd="searchByWd"></search-bar>
    <videos :videos='videos'></videos>
  </div>
</template>
<script>
import Videos from '../components/Videos';
import SearchBar from '../components/SearchBar';
// import urlPares from 'url-parse'
export default {
  data() {
    return {
      videos: [],
      source: ''
    }
  },
  components: {
    Videos, SearchBar
  },

  created() {
    this.$store.getters.wd && this.searchByWd({ wd: this.$store.getters.wd })
  },
  methods: {
    searchByWd(data) {
      let wd = this.wd || data.wd
      let source = data.source || this.source ||this.$store.getters.source
      this.$axios.get(source + '?ac=list&t=&pg=1&h=&ids=&wd=' + wd).then(async (result) => {
        let a = await this.xml.searchXML(result.data)
        this.videos = a.video
      })
    }
  },
}
</script>
<style scoped>
</style>