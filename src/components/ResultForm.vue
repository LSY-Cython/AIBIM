<template>
  <div id="resultForm" style="text-align:left">
    <div style="font-weight:bold;font-size:130%">审查依据</div>
    <div style="margin-top:15px;font-size:120%;color:blue;height:100px">{{clause}}</div>
    <div style="font-weight:bold;margin-top:25px;font-size:130%">审查结果</div>
    <div style="margin-top:15px;font-size:120%;color:red;height:90px">{{result}}</div>
    <div style="font-weight:bold;margin-top:25px;font-size:130%">复核意见</div>
    <div style="margin-top:15px"><el-input type="textarea" v-model="advice" placeholder="请输入您的建议，不超过200字" :rows="7"></el-input></div>
    <div style="margin-top:14px"><el-button size="mini" round style="background:#4294e6;font-size:100%;color:#f8f6f6;margin-left:220px">提交</el-button></div>
    <!--<div style="margin-top:4px;height:30px;margin-top:8px">
      <el-button type="text" size="small" icon="el-icon-arrow-left" style="font-size:105%;font-weight:bold;width:130px;text-align:left">上一条</el-button>
      <el-button type="text" size="small" style="font-size:105%;font-weight:bold;width:132px;text-align:right">下一条<i class="el-icon-arrow-right el-icon--right"></i></el-button>
    </div>-->
  </div>
</template>

<script>
export default {
  data () {
    return {
      clause: '',
      result: '',
      advice: ''
    }
  },
  methods: {
  },
  mounted () {
    this.$bus.$on('resultForm', (info) => {
      this.clause = info['clause'] + '  ' + info['content']
      this.result = info['reason']
    })
  }
}
</script>
