<template>
  <div id="header-button">
    <el-button type="text" @click="infoShow" style="font-size:80%;color:#f8f6f6;margin-right:25px">项目概况</el-button>
    <el-button type="text" @click="uploadMaterial" style="font-size:80%;color:#f8f6f6;margin-right:25px">资料检测</el-button>
    <!-- 上传文件夹并获取所有内置文件名 -->
    <input type="file" id='directory' style="display: none" ref="directory" accept="/" @change="directoryParse" webkitdirectory>
    <el-button type="text" @click="uploadModel" style="font-size:80%;color:#f8f6f6;margin-right:25px">上传模型</el-button>
    <!-- 设置行内元素为不可见 -->
    <input type="file" style="display: none" ref="file" accept=".rvt">
    <el-button type="text" @click="bimShow" style="font-size:80%;color:#f8f6f6;margin-right:25px">加载模型</el-button>
    <el-button type="text" @click="checkInfo" style="font-size:80%;color:#f8f6f6;margin-right:25px">开启审查</el-button>
    <!-- 指定下载链接 -->
    <el-button type="text" @click="resultShow" style="font-size:80%;color:#f8f6f6;margin-right:25px">查阅结果</el-button>
    <el-button type="text" @click="downloadFile" style="font-size:80%;color:#f8f6f6;margin-right:25px">生成报告</el-button>
  </div>
</template>

<script>
// import io from 'socket.io-client'
export default {
  data () {
    return {
      check_flag: 'check_start'
    }
  },
  methods: {
    resultShow () {
      this.$ajax.get('/check/result', {}).then(response => (this.$bus.$emit('tableResult', response.data)))
      this.$bus.$emit('isresultCollapse', 'ResultTable')
      this.$bus.$emit('CheckResult', true)
    },
    infoShow () {
      this.$bus.$emit('isInfoCollapse', false)
    },
    bimShow () {
      this.$ajax.get('/view/token', {}).then(response => (this.$bus.$emit('isBimShow', response.data)))
    },
    checkInfo () {
      // const socket = io('http://127.0.0.1:5000')
      this.$socket.emit('check_progress', this.check_flag)
      console.log('Socket通讯初始化成功, 开始审查')
      this.$socket.on('temp_progress', data => {
        // console.log(data)
        this.$bus.$emit('CheckProgress', data)
        this.$bus.$emit('showProgress', true)
      })
      this.$socket.on('select_id', data => {
        this.$bus.$emit('locationElement', data)
      })
    },
    uploadModel () {
      this.$refs.file.click()
    },
    uploadMaterial () {
      this.$refs.directory.click()
      this.$bus.$emit('MaterialParse', true)
    },
    directoryParse () {
      var fileList = document.getElementById('directory').files
      var fileDict = {}
      for (var i = 0; i < fileList.length; i++) {
        fileDict[i] = fileList[i].name
      }
      this.$ajax.post('/check/materials', {data: fileDict}).then(response => { this.$bus.$emit('materialTable', response.data) })
    },
    downloadFile () {
      this.$ajax.get('/check/report', {responseType: 'blob'}).then(response => (this.downloadBlob(response.data)))
    },
    downloadBlob (data) {
      let url = window.URL.createObjectURL(new Blob([data]))
      let link = document.createElement('a')
      link.style.display = 'none'
      link.href = url
      link.setAttribute('download', '审图报告.xlsx')
      document.body.appendChild(link)
      link.click()
    }
  }
}
</script>
