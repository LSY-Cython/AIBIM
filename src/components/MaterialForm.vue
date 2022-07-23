<template>
  <div id="resultForm" style="text-align:left">
    <div style="font-weight:bold;font-size:130%">必备资料</div>
    <div style="margin-top:15px"><el-input type="textarea" v-model="nessaryFiles" :rows="12" style="font-size:120%"></el-input></div>
    <div style="font-weight:bold;margin-top:50px;font-size:130%">可选资料</div>
    <div style="margin-top:15px"><el-input type="textarea" v-model="optionFiles" :rows="12" style="font-size:120%"></el-input></div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      nessaryFiles: '',
      optionFiles: ''
    }
  },
  methods: {
  },
  mounted () {
    this.$bus.$on('materialForm', (info) => {
      this.nessaryFiles = info['necessary_materials']
      this.optionFiles = info['option_materials']
    })
  }
}
</script>
