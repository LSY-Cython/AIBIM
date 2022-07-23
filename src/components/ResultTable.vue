<template>
  <!-- 将表格嵌入主内容显示容器中，保证纵向滚动条只填充在表格区域而非整个页面高度 -->
  <el-main style="height:290px">
    <el-table :data="projectData" border :header-cell-style="headerStyle" :cell-style="tableStyle" @row-click="locationElement" style="width: 100%">
      <el-table-column type="selection" width="30"></el-table-column>
      <el-table-column width="40" prop="id" label="序号"></el-table-column>
      <el-table-column width="230" prop="clause" label="审查条目"></el-table-column>
      <el-table-column width="100" prop="result" label="审查结果"></el-table-column>
      <el-table-column width="600" prop="reason" :render-header="renderHeader"></el-table-column>
    </el-table>
  </el-main>
</template>

<script>
export default {
  data () {
    return {
      projectData: []
    }
  },
  methods: {
    // 自定义表体单元格背景色
    tableStyle ({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 4) {
        return 'background:#ffffff;font-size:100%;color:red'
      } else {
        return 'background:#ffffff;text-align:center'
      }
    },
    // 设置表头单元格样式
    headerStyle ({row, column, rowIndex, columnIndex}) {
      if (rowIndex === 0) {
        return 'background-color:#7390ac;color:black;text-align:center;font-weight:bold;font-size:130%'
      }
    },
    closeResult () {
      this.$bus.$emit('CloseResult', true)
    },
    renderHeader (h) {
      return (<div><span style="margin-left:100px">判断依据</span><el-button onClick={this.closeResult} size="small" style="background:#4294e6;font-size:80%;color:#f8f6f6;margin-left:120px">关闭</el-button></div>)
    },
    locationElement (row, column, event) { // row代表单击行的数据字典
      this.$bus.$emit('locationElement', row['elementid'])
      this.$bus.$emit('resultForm', row)
    }
  },
  mounted () {
    this.$bus.$on('tableResult', (info) => {
      var result = info['result']
      for (var i = 0; i < result.length; i++) {
        this.projectData.push({id: (i + 1).toString(), clause: result[i]['clause'], result: result[i]['state'], reason: result[i]['description'], elementid: result[i]['id'], content: result[i]['content']})
      }
    })
  }
}
</script>
