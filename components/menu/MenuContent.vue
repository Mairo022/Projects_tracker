<script setup>
const { data : projects } = await useFetch('/api/projects')

const route = useRoute()
const id = ref(parseInt(route.params.id))
const isOpenAddProject = ref(false)

function updateOpenState() {
  isOpenAddProject.value = !isOpenAddProject.value
}

watch(() => route.params.id, () => {
  id.value = parseInt(route.params.id)
})
</script>
<template>
  <ul class="border rounded px-2 mt-[1px] max-h-[250px] overflow-y-auto">
    <li v-for="project in projects" class="w-full py-1 border-b last:border-none first:pt-1 last:pb-1">
      <NuxtLink
          :to="project.id.toString()"
          class="block leading-8 text-sm text-secondary px-2 hover:bg-accent/60 hover:rounded"
          :class="{'bg-accent/60 border-[#00000033] text-secondary font-semibold rounded': id === project.id}"
      >
        {{ project.name }}
      </NuxtLink>
    </li>
  </ul>
  <Button @click="updateOpenState"
          variant="ghost"
          class="rounded mt-3 text-tertiary hover:bg-muted/50"
  >
    Add project
  </Button>
  <MenuProjectAddDialog :isOpen="isOpenAddProject" @update:open="updateOpenState"/>
</template>