<template>
  <div class="card">
    <h3>Record #{{ id }}</h3>

    <p v-if="homeless.date_of_census">
      <strong>Date:</strong> {{ homeless.date_of_census }}
    </p>

    <p v-if="homeless.total_adults_in_shelter">
      <strong>Adults:</strong> {{ homeless.total_adults_in_shelter }}
    </p>

    <p v-if="homeless.total_individuals_in_shelter">
      <strong>Total Individuals:</strong>
      {{ homeless.total_individuals_in_shelter }}
    </p>
  </div>
</template>

<script setup>
defineProps({
  homeless: Object,
  id: Number
})
</script>

<style scoped>
.card {
  width: 250px;
  padding: 15px;
  border-radius: 10px;
  background: #f5f5f5;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

h3 {
  margin-bottom: 10px;
}

p {
  margin: 5px 0;
}
</style>