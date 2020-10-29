import Vue from 'vue'
import VueRouter from 'vue-router'

import barcode from '../components/barcode.vue'


Vue.use(VueRouter)

export default new VueRouter({
	// mode:'history',
	routes:[
    {
      path: '/',
      redirect: '/barcode',
    },
    {
      path:'/barcode',
      name:'barcode',
      component:barcode,
    },

	]
})
