<template>
  <div>
    <h2 v-if="homeless">{{ homeless.date_of_census }}</h2>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'

const homeless = ref({})

async function getData() {
  const response = await fetch('https://data.cityofnewyork.us/resource/k46n-sa2m.json')
  const data = await response.json()
  homeless.value = data[0]
}

onMounted(() => {
  getData()
})
</script>

<style scoped>
</style>