import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Manage',
    component:() =>import('../views/Manage.vue'),
    redirect:"/home",
    children:[
      {
        path: 'home',
        name: '主页',
        component:() =>import('../views/Home.vue'),
      },
      {
        path: 'user',
        name: '用户管理',
        component:() =>import('../views/User.vue'),
      },
      {
        path: 'person',
        name: '个人信息',
        component:() =>import('../views/Person.vue'),
      }
    ]
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import(/* webpackChunkName: "about" */ '../views/Register.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
router.beforeResolve((to,from,next)=>{
  localStorage.setItem("currentPathName",to.name)//设置当前路由名称
  next()
})
export default router
