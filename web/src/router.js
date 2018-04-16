import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import SinglePostView from './views/SinglePostView.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/post/:postId',
      name: 'single-post',
      component: SinglePostView,
      props: true
    }
  ]
})
