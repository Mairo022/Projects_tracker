<template>
  <header class="flex items-center mb-3">
    <h2 class="text-xl font-medium">{{name}}</h2>
    <span class="mx-4 pb-[2px]">—</span>
    <a class="hover:text-linkhover" href="">Live,&nbsp;</a>
    <a class="hover:text-linkhover" href="">GitHub</a>
  </header>
</template>

<script>
export default {
  props: ['name'],
  name: "ProjectHeader"
}
</script>
