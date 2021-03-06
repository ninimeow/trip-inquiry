import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: () => import('@/views/Index/Index')

    },
    {
      path: '/results',
      name: 'results',
      component: () => import('@/components/Results'),
      props: (route) => ({ date: route.query.date, type: route.query.type })
    }
  ]
})
