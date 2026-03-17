<template>
    <div>
        <h2>{{homeless.date_of_census}}</h2>
    </div>
</template>

<script setup>
import {onMounted, ref, watch} from 'vue'
const homeless = ref({})
async function getData(){
    const reponse = await fetch('https://data.cityofnewyork.us/resource/k46n-sa2m.json')
    const data = reponse.json()
    homeless.value = data
}

onMounted(function(){
    getData(route.params.id)
})
</script>

<style  scoped>

</style>