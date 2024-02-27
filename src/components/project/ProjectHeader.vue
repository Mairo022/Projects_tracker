<template>
  <header class="project__header">
    <h2 class="header__title">{{name}}</h2>
    <a class="header__link" href="">Live</a>
    <a class="header__link" href="">GitHub</a>
  </header>
</template>

<script>
export default {
  props: ['name'],
  name: "ProjectHeader"
}
</script>
