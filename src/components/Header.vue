<template>
  <div>
    <el-row  class="head">
      <el-col  :span="6">
        <el-button class='el-icon-arrow-left left'></el-button>
        
      </el-col>
      <el-col :span="12">中间</el-col>
      <el-col :span="6">右边</el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    
  }
</script>

<style scoped>
.head{
  height: 46px;
  /* display: flex; */
  line-height: 46px;
}.left{
  width: 100%;
  height: 100%;
}
</style>