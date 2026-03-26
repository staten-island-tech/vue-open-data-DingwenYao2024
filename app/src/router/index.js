import { createRouter, createWebHistory } from 'vue-router'
import MainPage from '@/views/MainPage.vue'
import HomelessCard from '@/components/HomelessCard.vue'
import TotalHomeless from '@/components/TotalHomeless.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: MainPage,
    },
    {
      path: '/data',
      name: 'homeless data',
      component: HomelessCard,
    },

    {
      path: '/total',
      name: 'total homeless data',
      component: TotalHomeless,
    },
  ],
})

export default router
