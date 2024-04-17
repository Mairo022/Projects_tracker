<script setup>

const route = useRoute()
const id = parseInt(route.params.id)

const projectView = "To-do";
</script>

<template>
  <div>
    <ProjectHeader :projectId="id"/>
    <ProjectContent :projectId="id"/>
  </div>
</template>