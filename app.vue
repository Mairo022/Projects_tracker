<script setup>
import { projectsData } from '@/data/projectsData'
import '@/assets/css/base.css'
import '@/assets/css/main.css'

let projectView = ref("")
let projectActive = ref()

function updateView(view) {
  projectView.value = view
}

function updateProject(id) {
  projectActive.value = parseInt(id)
}
</script>
<template>
  <main class="flex flex-wrap gap-6 w-[90%] max-w-[1200px] mx-auto relative top-[33%]">
    <nav class="basis-[20%] bg-card px-6 py-4  border-2 rounded">
      <MenuHeader/>
      <MenuContent @update:view="updateView" @update:project="updateProject"/>
    </nav>
    <section class="grow bg-card px-6 py-6 border-2 rounded w-[70%]">
      <div v-if="projectsData.get(projectActive)">
        <ProjectHeader :projectId="projectActive"/>
        <ProjectContent :view="projectView" :projectId="projectActive"/>
      </div>
    </section>
  </main>
</template>
