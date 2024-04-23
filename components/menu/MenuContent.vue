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
  <ul class="border rounded px-2 max-h-[250px] overflow-y-auto">
    <li v-for="project in projects" class="w-full py-1 border-b last:border-none first:pt-1 last:pb-1">
      <NuxtLink
          :to="project.id.toString()"
          class="block leading-8 text-sm text-secondary px-2 hover:bg-muted/50 hover:rounded"
          :class="{'bg-[#014c69] border-[#00000033] text-secondary rounded': id === project.id}"
      >
        {{ project.name }}
      </NuxtLink>
    </li>
  </ul>
  <Button @click="updateOpenState" variant="outline" class="rounded mt-2 bg-transparent">Add project</Button>
  <MenuProjectAddDialog :isOpen="isOpenAddProject" @update:open="updateOpenState"/>
</template>