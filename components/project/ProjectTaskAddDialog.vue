<script setup>
import isEmptyString from "../../utils/isEmptyString";

const { id } = defineProps({
  id: { type: Number, required: true },
  isOpen: { type: Boolean, required: true },
  view: { type: String, required: true}
})
const emits = defineEmits(['update:openAddTask'])

const title = ref("")
const description = ref(null)

function updateOpen() {
  emits('update:openAddTask')
}

async function handleSubmit() {
  if (isEmptyString(title.value))
    return

  try {
    await $fetch(`/api/projects/${id}`, {
      method: "post",
      body: {
        id,
        title: title.value,
        description: description.value,
        type: "todo"
      }
    })

    location.reload()
  } catch (e) {
    console.log(e.statusMessage)
  }
}

</script>
<template>
  <Dialog :open="isOpen" @update:open="updateOpen">
    <DialogContent class="max-w-base">
      <DialogHeader>
        <DialogTitle>Add {{view}}</DialogTitle>
        <div class="flex flex-col items-center gap-4 mb-2">
          <Input class="rounded" v-model="title" placeholder="Title" />
          <Textarea rows="4" v-model="description" class="resize-none rounded" placeholder="Description"/>
        </div>
      </DialogHeader>
      <DialogFooter>
        <DialogClose>
          <Button class="rounded">Close</Button>
        </DialogClose>
        <Button @click="handleSubmit" type="submit" class="rounded">Add</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>