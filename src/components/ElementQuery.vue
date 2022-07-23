<template>
  <div id="elementQuery" style="text-align:left">
    <el-input placeholder="输入构件ID或名称" v-model="elementInput" style="width:180px"></el-input>
    <el-button type="primary" @click="elementQuery" size="mini" style="color:#f8f6f6;margin-left:12px">定位</el-button>
    <el-table :data="elementData" border :show-header="false" :cell-style="columnStyle" style="width: 100%;margin-top:30px">
      <el-table-column width="120" prop="info"></el-table-column>
      <el-table-column width="160" prop="value"></el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data () {
    return {
      elementInput: '',
      elementData: [{
        info: '构件ID',
        value: ''
      }, {
        info: '楼层',
        value: ''
      }, {
        info: '类别ID',
        value: ''
      }, {
        info: '类别名称',
        value: ''
      }, {
        info: '族',
        value: ''
      }, {
        info: '族类型',
        value: ''
      }, {
        info: '构件名称',
        value: ''
      }, {
        info: '结构材质',
        value: ''
      }, {
        info: '几何尺寸',
        value: ''
      }, {
        info: '三维坐标',
        value: ''
      }, {
        info: '数量',
        value: ''
      }]
    }
  },
  methods: {
    // 自定义列背景色
    columnStyle ({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        return 'background:#7390ac;text-align:center;font-weight:bold;font-size:120%;color:black'
      } else {
        return 'background:#ffffff;'
      }
    },
    elementQuery () {
      // 自定义get请求体查询参数
      // this.$ajax.get('/element/property', {params: {'query_info': this.elementInput}}).then((response) => { this.$bus.$emit('QueryProperty', response.data) })
      this.$ajax.post('/element/property', {data: {'query_info': this.elementInput}}).then((response) => { this.$bus.$emit('QueryProperty', response.data) })
    }
  },
  mounted () {
    this.$bus.$on('QueryProperty', (info) => {
      this.elementData[0].value = info['element_id']
      this.elementData[1].value = info['floor']
      this.elementData[2].value = info['category_id']
      this.elementData[3].value = info['category_name']
      this.elementData[4].value = info['family']
      this.elementData[5].value = info['family_type']
      this.elementData[6].value = info['element_name']
      this.elementData[7].value = info['material']
      this.elementData[8].value = info['size']
      this.elementData[9].value = info['center_gt']
      this.elementData[10].value = info['element_num']
      this.$bus.$emit('locationElement', info['element_id'])
    })
  }
}
</script>s
