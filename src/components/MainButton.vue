<template>
  <div id="aside-button">
    <el-row>
      <el-col :span="12"><el-button type="text" style="font-size:120%;color:#f8f6f6" @click="CheckResult">图审结果详情</el-button></el-col>
      <!--<el-col :span="12"><el-button type="text" style="font-size:120%;color:#f8f6f6" @click="NlpParse">条文词法分析</el-button></el-col>-->
      <el-col :span="12"><el-button type="text" style="font-size:120%;color:#f8f6f6" @click="MaterialParse">可研资料解析</el-button></el-col>
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
    CheckResult () {
      this.$bus.$emit('CheckResult', true)
    },
    // NlpParse () {
    //   this.$bus.$emit('NlpParse', true)
    // }
    MaterialParse () {
      this.$bus.$emit('MaterialParse', true)
    }
  }
}
</script>
