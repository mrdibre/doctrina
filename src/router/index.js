import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const getRouterView = () => ({
  render: h => h('router-view')
})

const getComponent = (path, component) => import(`../views/${path}/${component}.vue`)

const getAuthComponent = component => getComponent('Auth', component)
const getAppComponent = component => getComponent('App', component)

const routes = [
  {
    path: '/',
    component: () => getAppComponent('App'),
    children: [
      {
        path: '',
        name: 'home',
        component: () => getAppComponent('Dashboard/Dashboard')
      },
      {
        path: '/professor',
        name: 'professor',
        component: () => getAppComponent('Professor/Professor')
      },
      {
        path: '/student',
        name: 'student',
        component: () => getAppComponent('Student/Student')
      },
      {
        path: '/subject',
        name: 'subject',
        component: () => getAppComponent('Subject/Subject')
      },
      {
        path: '/module',
        name: 'module',
        component: () => getAppComponent('Module/Module')
      },
      {
        path: '/questions',
        name: 'questions',
        component: () => getAppComponent('Question/Question')
      },
      {
        path: '/lessons',
        name: 'lessons',
        component: () => getAppComponent('Lesson/Lesson')
      },
    ],
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/auth',
    name: 'auth',
    component: getRouterView(),
    children: [
      {
        path: 'login',
        name: 'login',
        component: () => getAuthComponent('Login/Login'),
      },
      {
        path: 'register',
        name: 'register',
        component: () => getAuthComponent('Register/Register'),
      }
    ],
  },
  {
    path: '*',
    redirect: '/',
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
