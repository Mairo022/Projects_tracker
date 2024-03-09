<script setup>
import { projects } from '@/data/projects'
import { ref, watch } from 'vue'

const props = defineProps({
  projectId: { type: Number, required: false}
})

let projectName = ref(null)

watch(() => props.projectId, () => {
  projectName.value = projects.find(project => project.id === props.projectId).name
}, { immediate: true })

</script>

<template>
  <header class="flex items-center mb-3">
    <h2 class="text-xl font-medium">{{projectName}}</h2>
    <span class="mx-4 pb-[2px]">—</span>
    <a class="hover:text-linkhover" href="">Live,&nbsp;</a>
    <a class="hover:text-linkhover" href="">GitHub</a>
  </header>
</template>
