<script setup>
import isEmptyString from "../../utils/isEmptyString";

const { projectData, isOpen } = defineProps({
  projectData: { type: Object, required: true},
  isOpen: { type: Boolean, required: true }
})
const emits = defineEmits(['update:open'])

const title = ref(projectData.title)
const live = ref(projectData.live)
const source = ref(projectData.source)

function updateOpen() {
  emits('update:open')
}

async function handleSave() {
  if (isEmptyString(title.value))
    return

  try {
    await $fetch("/api/projects", {
      method: "put",
      body: {
        id: projectData.id,
        title: title.value,
        live: live.value,
        source: source.value
      }
    })

    location.reload()
  } catch (e) {
    console.log(e.statusMessage)
  }
}

async function handleDelete() {
  try {
    await $fetch("/api/projects", {
      method: "delete",
      body: {
        id: projectData.id,
      }
    })

    location.assign(location.origin)
  } catch (e) {
    console.log(e.statusMessage)
  }
}

</script>
<template>
  <Dialog :open="isOpen" @update:open="updateOpen">
    <DialogContent class="max-w-base">
      <DialogHeader>
        <DialogTitle>Editing project info</DialogTitle>
        <div class="flex flex-col items-center gap-3 mb-2 mt-4">
          <Input class="rounded" v-model="title" id="name" placeholder="Title"/>
          <Input class="rounded" v-model="live" id="live" placeholder="Live"/>
          <Input class="rounded" v-model="source" id="source" placeholder="GitHub"/>
        </div>
      </DialogHeader>
      <DialogFooter class="gap-2">
        <Button @click="handleDelete" type="submit" class="rounded">Delete</Button>
        <DialogClose>
          <Button class="rounded">Close</Button>
        </DialogClose>
        <Button @click="handleSave" type="submit" class="rounded">Save changes</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>