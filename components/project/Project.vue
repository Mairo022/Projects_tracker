<script setup>
defineProps({
  id: { type: Number, required: true}
})
</script>

<template>
  <ProjectHeader/>
  <ProjectContent :projectId="id"/>
</template>