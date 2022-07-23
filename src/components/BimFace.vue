<template>
  <el-container style="height: 100%">
    <el-header id="page-header">
      <el-row>
        <el-col :span="6"><div style="text-align: left;font-weight: bold">BIM三维数字化审查平台</div></el-col>
        <el-col :span="12"><div style="text-align: left"><HeaderButton></HeaderButton></div></el-col>
        <el-col :span="4"><div style="text-align: center;font-size: 90%">{{ModelTitle}}</div></el-col>
        <el-col :span="2"><div style="text-align: right;font-size: 60%;color: white">{{Signature}}</div></el-col>
      </el-row>
    </el-header>
    <el-container style="height: 100%;background-color: #bfc7d1">
      <!-- 侧边栏可伸缩 -->
      <el-aside :width="isInfoCollapse?'0px':'320px'" id="page-aside">
        <el-container style="height: 100%">
          <el-header height="50px" style="text-align: center;background-color: #4294e6"><AsideButton></AsideButton></el-header>
          <!-- 动态切换显示组件 -->
          <el-main><div><component :is="componentInfo"></component></div></el-main>
          <el-footer><el-button @click="closeInfo" size="small" style="background:#4294e6;font-size:100%;color:#f8f6f6;margin-left:200px">关闭</el-button></el-footer>
        </el-container>
      </el-aside>
      <!-- 不要在主要区域容器el-main中嵌套外层容器el-container -->
      <el-container style="height: 100%">
        <!-- F12 layout测定除顶部标题栏外的最大屏幕高度为743px -->
        <el-aside :width="isInfoCollapse?'1320px':'1000px'" id="bimface-show">
          <el-container style="height: 100%">
            <el-header :height="isResultCollapse?'743px':'450px'" id="bimface"></el-header>
            <div><component :is="componentResult"></component></div>
          </el-container>
        </el-aside>
        <el-container id="clause-result">
          <!--<el-header height="50px" style="text-align: center;background-color: #4294e6"><MainButton></MainButton></el-header>-->
          <el-header height="50px" style="text-align:center;background-color:#4294e6;font-size:140%;color:#f8f6f6">审查结果详情</el-header>
          <!-- 动态切换显示组件 -->
          <el-main><div><component :is="textInfo"></component></div></el-main>
        </el-container>
      </el-container>
    </el-container>
  </el-container>
</template>

<style scoped>
  #page-header
  {
    background-color: #093568;
    color: #f8f6f6;
    line-height: 60px;
    font-size: 150%
  }
  #page-aside
  {
    background-color: #f6f7f8;
    color: #f8f6f6;
    margin-left: 10px;
    margin-right: 15px;
    margin-top: 15px;
    margin-bottom: 15px;
  }
  #bimface-show
  {
    background-color: #e7edf3;
    height:100%;
  }
  #clause-result
  {
    background-color: #f6f7f8;
    margin-left: 15px;
    margin-right: 10px;
    margin-top: 15px;
    margin-bottom: 15px;
  }
</style>

<script>
import HeaderButton from '@/components/HeaderButton'
import AsideButton from '@/components/AsideButton'
import ProjectTable from '@/components/ProjectTable'
import MajorTree from '@/components/MajorTree'
import ElementQuery from '@/components/ElementQuery'
import ResultTable from '@/components/ResultTable'
import ResultForm from '@/components/ResultForm'
import MainButton from '@/components/MainButton'
// import MaterialForm from '@/components/MaterialForm'
import MaterialTable from '@/components/MaterialTable'
// import NlpForm from '@/components/NlpForm'
import ProgressDialog from '@/components/ProgressDialog'
export default {
  components: {HeaderButton, AsideButton, ProjectTable, MajorTree, ElementQuery, ResultTable, ResultForm, MainButton, MaterialTable, ProgressDialog},
  data () {
    return {
      ModelTitle: '深圳局110kV变电站项目',
      Signature: 'Poweredby Kingwa',
      isInfoCollapse: true, // 侧边栏默认折叠收回
      isResultCollapse: true,
      componentInfo: '',
      componentResult: '',
      textInfo: '',
      app: null,
      token: '',
      viewer3D: null
    }
  },
  methods: {
    closeInfo () {
      this.isInfoCollapse = true
      this.componentInfo = ''
    },
    // 加载模型
    bimShow () {
      // this.token = '53ced89494d74837b98b14b06c8feeb3' // viewToken有效期为12h
      var BimfaceLoaderConfig = new window.BimfaceSDKLoaderConfig()
      BimfaceLoaderConfig.viewToken = this.token
      window.BimfaceSDKLoader.load(
        BimfaceLoaderConfig,
        this.successCallback,
        this.failureCallback
      )
    },
    successCallback (viewMetaData) {
      // 获取DOM元素
      var domShow = document.getElementById('bimface')
      // 创建WebApplication3DConfig
      var webAppConfig = new window.Glodon.Bimface.Application.WebApplication3DConfig()
      // 设置创建WebApplication3DConfig的dom元素值
      webAppConfig.domElement = domShow
      // 创建WebApplication3D
      this.app = new window.Glodon.Bimface.Application.WebApplication3D(webAppConfig)
      // 添加待显示的模型
      this.app.addView(this.token)
      // 获取viewer3D对象
      this.viewer3D = this.app.getViewer()
      // window.onresize = function () {
      //   this.viewer3D.resize(800, 800)
      // }
    },
    failureCallback (error) {
      console.log(error)
    },
    // 定位并渲染指定构件
    zoomToSelectedComponents (id) {
      // 清除构件着色
      this.viewer3D.clearOverrideColorComponents()
      // 清除构件选中状态
      this.viewer3D.clearSelectedComponents()
      this.viewer3D.render()
      // 选中id为"271431"的构件
      this.viewer3D.addSelectedComponentsById([id])
      // 定位到选中的构件
      this.viewer3D.zoomToSelectedComponents()
      // 新建color对象，指定关注构件被染色的数值
      var color = new window.Glodon.Web.Graphics.Color('#B22222', 0.8)
      // 对关注构件进行着色
      this.viewer3D.overrideComponentsColorById([id], color)
      this.viewer3D.render()
      // this.createSnapshot()
    },
    // 创建模型快照(data: image/png;base64)——html2canvas
    createSnapshot () {
      var color = new window.Glodon.Web.Graphics.Color('#11DAB7', 0.5)
      this.viewer3D.createSnapshotAsync(color, (imageData) => { // 箭头函数中this指向当前使用组件, 普通函数中this指向局部作用域
        this.$ajax.post('/image/snapshot', {data: {'base64_image': imageData}}).then(response => (console.log(response)))
      })
    }
  },
  mounted () {
    this.$bus.$on('ProjectInfo', (info) => {
      this.componentInfo = info
    })
    this.$bus.$on('MajorSelect', (info) => {
      this.componentInfo = info
    })
    this.$bus.$on('ElementQuery', (info) => {
      this.componentInfo = info
    })
    this.$bus.$on('isresultCollapse', (info) => {
      this.componentResult = info
      this.isResultCollapse = false
    })
    this.$bus.$on('CloseResult', (info) => {
      this.isResultCollapse = true
      this.componentResult = ''
    })
    this.$bus.$on('isInfoCollapse', (info) => {
      this.isInfoCollapse = info
    })
    this.$bus.$on('isBimShow', (info) => {
      if (this.token.length === 0) { // 防止一个节点同时渲染多个BIMFACE
        // 箭头函数里的this指向当前作用域
        // this.$ajax.get('/view/token', {}).then(response => (this.token = response.data))
        this.token = info // viewToken有效期为12h
        // setTimeout(function () { this.bimShow() }, 1000)  // 延时1s执行
        this.bimShow()
      } else {
        return null
      }
    })
    this.$bus.$on('CheckResult', (info) => {
      this.textInfo = 'ResultForm'
    })
    // this.$bus.$on('NlpParse', (info) => {
    //   this.textInfo = 'NlpForm'
    // })
    this.$bus.$on('MaterialParse', (info) => {
      this.textInfo = 'MaterialTable'
    })
    this.$bus.$on('locationElement', (info) => {
      this.zoomToSelectedComponents(info)
    })
    this.$bus.$on('isSnapshot', (info) => {
      this.createSnapshot()
    })
    this.$bus.$on('showProgress', (info) => {
      this.textInfo = 'ProgressDialog'
    })
  }
}
</script>
