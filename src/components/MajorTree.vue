<template>
  <div id="tree">
    <el-input placeholder="输入关键字进行过滤" v-model="filterText"></el-input>
    <el-tree
      class="filter-tree"
      :data="data"
      node-key="id"
      :props="defaultProps"
      show-checkbox
      default-expand-all
      :filter-node-method="filterNode"
      :render-content="renderContent"
      ref="tree"
      style="margin-top:40px;width:100%;height:100%">
    </el-tree>
  </div>
</template>

<script>
export default {
  watch: {
    filterText (val) {
      this.$refs.tree.filter(val)
    }
  },
  methods: {
    filterNode (value, data) {
      if (!value) return true
      return data.label.indexOf(value) !== -1
    },
    // 树节点内容区的渲染方法
    renderContent (h, { node, data, store }) {
      if (Number.isInteger(data.id) === true) {
        return (<span style="font-size:110%;color:gray;font-weight:bold">{node.label}</span>)
      } else {
        return (<span style="font-size:90%;color:gray">{node.label}</span>)
      }
    }
  },
  data () {
    return {
      filterText: '',
      data: [{
        id: 1,
        label: '建筑专业',
        children: [{
          id: 1.1,
          label: '《建筑设计防火规范》'}, {
          id: 1.2,
          label: '《住宅设计规范》'
        }]
      }, {
        id: 2,
        label: '结构专业',
        children: [{
          id: 2.1,
          label: '《混凝土结构设计规范》'}, {
          id: 2.2,
          label: '《建筑抗震设计规范》'
        }, {
          id: 2.3,
          label: '《高层建筑混凝土结构技术规程》'
        }, {
          id: 2.4,
          label: '《高层民用建筑钢结构技术规程》'
        }]
      }, {
        id: 3,
        label: '电气专业',
        children: [{
          id: 3.1,
          label: '《35kV～110kV变电站设计规范》'}, {
          id: 3.2,
          label: '《南网110Kv变电站标准设计》'
        }]
      }, {
        id: 4,
        label: '暖通空调',
        children: [{
          id: 4.1,
          label: '《建筑防排烟系统技术标准》'}, {
          id: 4.2,
          label: '《汽车库、停车场设计防火规范》'
        }]
      }, {
        id: 5,
        label: '人防专项',
        children: [{
          id: 5.1,
          label: '《人民防空地下室设计规范》'}]
      }, {
        id: 6,
        label: '节能专项',
        children: [{
          id: 6.1,
          label: '《公共建筑节能设计标准》'}]
      }
      ],
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    }
  }
}
</script>
