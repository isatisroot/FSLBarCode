import Vue from 'vue'
import VueRouter from 'vue-router'

import barcode from '../components/barcode.vue'
import barcode2 from '../components/barcode2.vue'


Vue.use(VueRouter)

export default new VueRouter({
	// mode:'history',
	routes:[
    {
      path: '/',
      // redirect: '/barcode2',
    },
    {
      path:'/barcode',
      name:'barcode',
      component:barcode,
    },
		{
			path:'/barcode2',
			name: 'barcode2',
			component:barcode2
		},

	]
})
