<script setup>
import ProjectHeader from "./components/project/ProjectHeader.vue"
import ProjectContent from "./components/project/ProjectContent.vue";
</script>
<template>
  <main>
    <nav id="menu">
      <h1 id="title">Project Tracker</h1>
    </nav>
    <section id="project">
      <ProjectHeader name="Driveclub"/>
      <ProjectContent title="To-do"/>
    </section>
  </main>
</template>

