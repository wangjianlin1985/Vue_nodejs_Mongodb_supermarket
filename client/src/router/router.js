import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '../components/Login.vue'
import Home from '../components/Home.vue'
import Welcome from '../components/Welcome.vue'
import User from '../components/user/User.vue'
import Right from '../components/right/Right.vue'
import Power from '../components/right/Power.vue'
import Good from '../components/good/Good.vue'
import Cate from '../components/good/Cate.vue'
import Order from '../components/order/Order.vue'
import Report from '../components/report/Report.vue'

import Error from '../components/Error.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: Login },
  { 
    path: '/home',
    component: Home,
    children: [
      { path: '/home', redirect: '/welcome' },
      { path: '/welcome', component: Welcome },
      { path: '/user', component: User },
      { path: '/right', component: Right },
      { path: '/power', component: Power },
      { path: '/good', component: Good },
      { path: '/cate', component: Cate },
      { path: '/order', component: Order },
      { path: '/report', component: Report }
    ]
  },
  { path: '*', component: Error }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  if (to.path === '/login') return next()
  const login = window.sessionStorage.getItem('login')  
  if (!login) return next('/login')
  next()
})

export default router
