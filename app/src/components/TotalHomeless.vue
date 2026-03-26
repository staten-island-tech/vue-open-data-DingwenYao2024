<template>
  <div class="container">
    <h1>Total Individuals in the Homeless Shelter (by days)</h1>
    <div class="chart-wrapper">
      <Bar v-if="loaded" :data="chartData" :options="chartOptions" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

const homeless = ref([])
const loaded = ref(false)
const chartData = ref({})

const chartOptions = {
  responsive: true,
  maintainAspectRatio: true,
  plugins: {
    legend: { position: 'top' },
    title: {
      display: true,
      text: 'Total Adults in Shelter per Day'
    }
  },
  scales: {
    y: {
      beginAtZero: true,
      title: { display: true, text: 'Adults in Shelter' }
    },
    x: {
      title: { display: true, text: 'Day' }
    }
  }
}

async function getData() {
  const url = "https://data.cityofnewyork.us/resource/k46n-sa2m.json"
  try {
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`)
    }
    const result = await response.json()
    homeless.value = result.slice(0, 1000)

    chartData.value = {
      labels: result.slice(0, 1000).map((item, i) => `Day ${i + 1}`),
      datasets: [{
        label: 'Homeless Count',
        data: result.slice(0, 1000).map(item => Number(item.total_adults_in_shelter) || 0),
        backgroundColor: '#42b983'
      }]
    }

    loaded.value = true
  } catch (error) {
    console.error(error.message)
  }
}
onMounted(() => {
  getData()
})
</script>

<style scoped>
.chart-wrapper {
  width: 100%;
  max-width: 800px;
  margin: 2rem auto;
}

h1 {
  width: 100%;
  text-align: center;
  font-size: 100px;
}
</style>