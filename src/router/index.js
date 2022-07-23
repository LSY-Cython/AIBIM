import Vue from 'vue'
import Router from 'vue-router'
import BimFace from '@/components/BimFace'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'BimFace',
      component: BimFace
    }
  ]
})
