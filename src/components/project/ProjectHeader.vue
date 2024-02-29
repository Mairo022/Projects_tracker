<template>
  <header>
    <h2>{{name}}</h2>
    <a href="">Live</a>
    <a href="">GitHub</a>
  </header>
</template>

<script>
export default {
  props: ['name'],
  name: "ProjectHeader"
}
</script>
