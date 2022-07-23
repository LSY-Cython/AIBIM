<template>
  <el-table :data="projectData" border :show-header="false" :cell-style="columnStyle" style="width: 100%;margin-top:15px">
    <el-table-column width="120" prop="info"></el-table-column>
    <el-table-column width="160" prop="value"></el-table-column>
  </el-table>
</template>

<script>
export default {
  data () {
    return {
      projectData: [{
        info: '项目编号',
        value: '090000KK52190109'
      }, {
        info: '工程名称',
        value: '变电工程可研AI辅助审查'
      }, {
        info: '工程地址',
        value: '广东省深圳市福田区'
      }, {
        info: '项目状态',
        value: '在建'
      }, {
        info: '建设单位名称',
        value: '深圳供电局有限公司基建部'
      }, {
        info: '设计单位名称',
        value: '深圳电力设计研究院'
      }, {
        info: '审图单位名称',
        value: '深圳供电局有限公司审图中心'
      }, {
        info: '项目发布日期',
        value: '2019-8-10'
      }, {
        info: '出图时间',
        value: '2020-5-6'
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
    }
  },
  mounted () {
    this.$bus.$on('ProjectTable', (info) => {
      this.projectData[0].value = info['fileId']
      this.projectData[1].value = info['name']
      this.projectData[8].value = info['createTime']
    })
  }
}
</script>
