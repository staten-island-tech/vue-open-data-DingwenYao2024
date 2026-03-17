import { createRouter, createWebHistory } from 'vue-router'
import MainPage from '@/views/MainPage.vue'
import HomelessCard from '@/components/HomelessCard.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: MainPage,
    },
    {
      path: '/date/:id',
      name: 'homeless data',
      component: HomelessCard,
    },
  ],
})

export default router
