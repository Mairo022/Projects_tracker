<script setup>
const { data } = defineProps({
  data: { type: Object, required: true }
})

const isOpen = ref(false)

function updateOpen() {
  isOpen.value = !isOpen.value
}
</script>

<template>
  <header class="flex items-center mt-[-16px]">
    <h2>
      <Button @click="updateOpen" variant="ghost" class="text-base font-bold rounded text-secondary relative left-[-17px]">
        {{data.title}}
      </Button>
    </h2>
  </header>
  <ProjectHeaderEditDialog :projectData="data" :isOpen="isOpen" @update:open="updateOpen"/>
</template>
