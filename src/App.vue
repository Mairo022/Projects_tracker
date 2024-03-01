<script setup>
import ProjectHeader from "./components/project/ProjectHeader.vue"
import ProjectContent from "./components/project/ProjectContent.vue";
</script>
<template>
  <main class="flex flex-wrap gap-6 w-[90%] max-w-[1400px] max-h-fit mx-auto pt-[300px]">
    <nav class="basis-[20%] bg-card px-6 py-4 rounded-md">
      <h1>Project Tracker</h1>
    </nav>
    <section class="grow bg-card px-6 py-4 border-2 rounded">
      <ProjectHeader name="Driveclub"/>
      <ProjectContent title="To-do"/>
    </section>
  </main>
</template>

