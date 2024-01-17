import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Students from '../views/Student/View.vue'
import CreateStudent from '../views/Student/Create.vue'
import EditStudent from '../views/Student/Edit.vue'
import CreatePost from '../views/Post/Create.vue'
import ViewPost from '../views/Post/View.vue'
import EditPost from '../views/Post/Edit.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/students',
      name: 'students',
      component: Students
    },
    {
      path: '/student/create',
      name: 'studentCreate',
      component: CreateStudent
    },
    {
      path: '/student/:id/edit',
      name: 'studentEdit',
      component: EditStudent
    },
    {
      path: '/post/create',
      name: 'PostCreate',
      component: CreatePost
    },
    {
      path: '/posts',
      name: 'PostView',
      component: ViewPost
    },
    {
      path: '/post/:id/edit',
      name: 'postEdit',
      component: EditPost
    },
  ]
})

export default router
