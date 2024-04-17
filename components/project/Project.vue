<script setup>
const { id } = defineProps({
  id: { type: Number, required: true }
})

const { data : projectData, error, pending } = await useFetch(`/api/projects/${id}`)
const title = projectData.value?.name
const tasks = projectData.value?.tasks

const headerProps = {
  id: id,
  title: projectData.value?.name,
  live: projectData.value?.live,
  source: projectData.value?.source
}

</script>

<template>
  <ProjectHeader :data="headerProps"/>
  <ProjectContent :tasks="tasks" :projectId="id"/>
</template>