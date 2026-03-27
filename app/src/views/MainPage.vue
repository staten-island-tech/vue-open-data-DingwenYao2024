<template>
  <div class="container">
    <h1>Homeless Shelter Stats (by days)</h1>
    <RouterLink to = "/total"> Total Individuals in the Homeless Shelter (by days) </RouterLink>
    <RouterLink to = "/total"> Total Individuals in the Homeless Shelter (by days) </RouterLink>
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
    homeless.value = result.slice(0, 1001)

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
  max-width: 1200px;
  margin: 40px auto;
  padding: 20px;

  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
}

h1 {
  font-size: 40px;
  text-align: center;
  margin-bottom: 20px;
  color: #2c3e50;
  grid-column: 1 / -1;
}

a {
  margin: 10px;
  text-decoration: none;
  font-weight: bold;
  font-size: 16px;
  color: #3498db;
  transition: 0.3s ease;
}

a:hover {
  color: #1d6fa5;
  text-decoration: underline;
}

a {
  grid-column: 1 / -1;
  text-align: center;
}


.card {
  background: #ffffff;
  border-radius: 12px;
  padding: 15px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

@media (max-width: 600px) {
  h1 {
    font-size: 28px;
  }

  .container {
    padding: 10px;
  }
}
</style>