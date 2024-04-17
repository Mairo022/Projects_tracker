<script setup>
import Project from "../components/project/Project";

const route = useRoute()
const id = parseInt(route.params.id)
</script>

<template>
  <div>
    <Project :id="id"/>
  </div>
</template>