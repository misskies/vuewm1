import Vue from 'vue'
import VueRouter from 'vue-router'
import store from "@/store";

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import(/* webpackChunkName: "about" */ '../views/Register.vue')
  },
  {
    path: '/404',
    name: '404',
    component: () => import(/* webpackChunkName: "about" */ '../views/404.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})


export const setRoutes=()=>{
  const storeMenus=localStorage.getItem("menus");
  if(storeMenus){
    const manageRoute={
      path:'/',
      name:'Manage',
      component:()=>import('../views/Manage.vue'),
      redirect:"/home",
      children:[]}

  //  if(storeMenus!='undefined')
    {
      const menus = JSON.parse(storeMenus)


      menus.forEach(item => {
        if (item.path) {
          let itemMenu = {
            path: item.path.replace("/", ""),
            name: item.name,
            component: () => import('../views/' + item.pagePath + '.vue')
          }

          manageRoute.children.push(itemMenu)
        } else if (item.children.length) {
          item.children.forEach(item => {
            if (item.path) {
              let itemMenu = {
                path: item.path.replace("/", ""),
                name: item.name,
                component: () => import('../views/' + item.pagePath + '.vue')
              }
              manageRoute.children.push(itemMenu)
            }


          })
        }
      })
    }

    const currentRouteNames=router.getRoutes().map(v=>v.name)
    if(!currentRouteNames.includes('Manage')){
      router.addRoute(manageRoute)
    }

  }
}


//刷新页面时
setRoutes()

router.beforeEach((to,from,next)=>{
  localStorage.setItem("currentPathName",to.name)//设置当前路由名称
  store.commit("setPatch")


  if(!to.matched.length){
    const storeMenus=localStorage.getItem("menus")
    if(storeMenus){
      next("/404")
    }else{
      next("/login")
    }
  }
  else{
    next()
  }

})
export default router
