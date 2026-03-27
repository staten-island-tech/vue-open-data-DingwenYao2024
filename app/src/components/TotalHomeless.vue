<template>
  <div class="container">
    <h1>Total Individuals in the Homeless Shelter (by days)</h1>
    <RouterLink to = "/" class="return"> Back</RouterLink>
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
.container {
  max-width: 1100px;
  margin: 0 auto;
  padding: 32px 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

h1 {
  text-align: center;
  font-size: 40px;
  font-weight: 700;
  margin-bottom: 16px;
  color: #2c3e50;
}

.return {
  display: inline-block;
  margin-bottom: 24px;
  text-decoration: none;
  color: white;
  background-color: #42b983;
  padding: 8px 20px;
  border-radius: 6px;
  transition: all 0.3s ease;
  font-size: 16px;
}

.return:hover {
  background-color: #369f6b;
  transform: translateY(5px);
}

.chart-wrapper {
  width: 100%;
  max-width: 900px;
  background: #ffffff;
  padding: 24px;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

@media (max-width: 768px) {
  h1 {
    font-size: 28px;
  }

  .chart-wrapper {
    padding: 16px;
  }
}
</style>