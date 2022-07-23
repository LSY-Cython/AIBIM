<template>
  <div id="Progress">
    <!-- <el-dialog title="当前图纸审查进度" :visible.sync="dialogFormVisible" style="font-weight:bold"> -->
    <div style="font-weight:bold;font-size:130%">当前图纸审查进度</div>
    <div style="margin-top:30px"><el-progress type="circle" :percentage="progress" :stroke-width="16"></el-progress></div>
     <div style="margin-top:30px">
       <el-button @click="checkPause" style="background:#4294e6;font-size:120%;color:#f8f6f6">暂停</el-button>
       <el-button @click="checkResume" style="background:#4294e6;font-size:120%;margin-left:50px;color:#f8f6f6">恢复</el-button>
     </div>
    <!-- </el-dialog> -->
  </div>
</template>

<script>
export default {
  data () {
    return {
      dialogFormVisible: false,
      progress: '0'
    }
  },
  methods: {
    checkPause () {
      this.$ajax.post('/check/status', {data: {'check_status': 'check_pause'}}).then((response) => { console.log(response) })
    },
    checkResume () {
      this.$ajax.post('/check/status', {data: {'check_status': 'check_resume'}}).then((response) => { console.log(response) })
    }
  },
  mounted () {
    this.$bus.$on('CheckProgress', (info) => {
      // this.dialogFormVisible = true
      this.progress = info
    })
  }
}
</script>
