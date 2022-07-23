<template>
  <div id="resultForm" style="text-align:left">
    <div style="font-weight:bold;font-size:125%">规范条文：</div>
    <div style="margin-top:15px"><el-input type="textarea" v-model="clause" placeholder="请输入您想要分析的条文，不超过150字" :rows="3" style="font-size:150%"></el-input></div>
    <div style="font-weight:bold;margin-top:25px;font-size:125%">词性标注：</div>
    <div style="margin-top:15px"><el-input type="textarea" v-model="participle" placeholder="此处展示词性分析结果" :rows="6" style="font-size:150%"></el-input></div>
    <div style="font-weight:bold;margin-top:25px;font-size:125%">结构化规则公式：</div>
    <div style="margin-top:15px"><el-input type="textarea" v-model="formular" placeholder="此处展示结构化数值逻辑公式, 格式为：[(族类型, 属性值) 逻辑关系 量化数值]" :rows="3" style="font-size:150%"></el-input></div>
    <el-button @click="nlpClause" size="small" style="background:#4294e6;font-size:100%;color:#f8f6f6;margin-left:220px;margin-top:20px">确定</el-button>
  </div>
</template>

<script>
export default {
  data () {
    return {
      clause: '',
      participle: '',
      formular: ''
    }
  },
  methods: {
    nlpClause () {
      this.$ajax.post('/nlp/clause', {data: {'clause_input': this.clause}}).then((response) => { this.$bus.$emit('SegResult', response.data) })
    }
  },
  mounted () {
    this.$bus.$on('SegResult', (info) => {
      this.participle = info['segpos']
      this.formular = info['formular']
    })
  }
}
</script>
