<template>
  <div id="aside-button">
    <el-row>
      <el-col :span="6"><el-button type="text" style="font-size:120%;color:#f8f6f6" @click="ProjectInfo">工程信息</el-button></el-col>
      <el-col :span="12"><el-button type="text" style="font-size:120%;color:#f8f6f6" @click="MajorSelect">多专业选择</el-button></el-col>
      <el-col :span="6"><el-button type="text" style="font-size:120%;color:#f8f6f6" @click="ElementQuery">构件查询</el-button></el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  methods: {
    ProjectInfo () {
      this.$ajax.get('/file/info', {}).then(response => { this.$bus.$emit('ProjectTable', response.data) })
      this.$bus.$emit('ProjectInfo', 'ProjectTable')
    },
    MajorSelect () {
      this.$bus.$emit('MajorSelect', 'MajorTree')
    },
    ElementQuery () {
      this.$bus.$emit('ElementQuery', 'ElementQuery')
    }
  }
}
</script>
