<template>
  <div>
    <el-button type="primary" @click="downloadFile" size="medium" style="color:#f8f6f6;margin-left:20px">下载资料检测报告</el-button>
    <el-table :data="projectData" border :show-header="false" :cell-style="columnStyle" style="width: 100%;margin-top:15px">
      <el-table-column width="120" prop="info"></el-table-column>
      <el-table-column width="160" prop="value"></el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data () {
    return {
      projectData: [{
        info: '可行性研究报告',
        value: ''
      }, {
        info: '本期工程接入系统接线图',
        value: ''
      }, {
        info: '站区总体规划图',
        value: ''
      }, {
        info: '电气主接线图',
        value: ''
      }, {
        info: '电气总平面布置图',
        value: ''
      }, {
        info: '土建总平面布置图',
        value: ''
      }, {
        info: '配电装置电气平面布置图',
        value: ''
      }, {
        info: '线路路径方案图',
        value: ''
      }, {
        info: '其他文件',
        value: ''
      }]
    }
  },
  methods: {
    // 自定义列背景色
    columnStyle ({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        return 'background:#7390ac;text-align:center;font-weight:bold;font-size:115%;color:black'
      } else {
        return 'background:#ffffff;'
      }
    },
    downloadFile () {
      this.$ajax.get('/material/report', {responseType: 'blob'}).then(response => (this.downloadBlob(response.data)))
    },
    downloadBlob (data) {
      let url = window.URL.createObjectURL(new Blob([data]))
      let link = document.createElement('a')
      link.style.display = 'none'
      link.href = url
      link.setAttribute('download', '资料检测报告.xlsx')
      document.body.appendChild(link)
      link.click()
    }
  },
  mounted () {
    this.$bus.$on('materialTable', (info) => {
      this.projectData[0].value = info['necessary_materials']['可行性研究报告']
      this.projectData[1].value = info['necessary_materials']['本期工程接入系统接线图']
      this.projectData[2].value = info['necessary_materials']['站区总体规划图']
      this.projectData[3].value = info['necessary_materials']['电气主接线图']
      this.projectData[4].value = info['necessary_materials']['电气总平面布置图']
      this.projectData[5].value = info['necessary_materials']['土建总平面布置图']
      this.projectData[6].value = info['necessary_materials']['配电装置电气平面布置图']
      this.projectData[7].value = info['necessary_materials']['线路路径方案图']
      this.projectData[8].value = info['option_materials']
    })
  }
}
</script>
