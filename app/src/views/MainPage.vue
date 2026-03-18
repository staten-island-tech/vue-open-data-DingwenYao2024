<template>
  <div class="container">
    <HomelessCard
      v-for="(home, index) in homeless"
      :key="index"
      :homeless="home"
      :id="index + 1"
    />
  </div>
</template>

<script setup>
import HomelessCard from '@/components/HomelessCard.vue'
import { ref, onMounted } from 'vue'

const homeless = ref([])

async function getData() {
  const url = "https://data.cityofnewyork.us/resource/k46n-sa2m.json"

  try {
    const response = await fetch(url)

    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`)
    }

    const result = await response.json()

    // limit results so UI doesn't overload
    homeless.value = result.slice(0, 12)

  } catch (error) {
    console.error(error.message)
  }
}

onMounted(() => {
  getData()
})
</script>

<style scoped>
.container {
  width: 80vw;
  margin: 30px auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  gap: 20px;
}
</style>