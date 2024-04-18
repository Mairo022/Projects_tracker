<script setup>
import isEmptyString from "../../utils/isEmptyString";

const props = defineProps({
  task: { required: true},
  projectID: { type: Number, required: true },
  isOpen: { type: Boolean, required: true },
})

const task = reactive(props.task)

async function handleRemove() {
  if (isEmptyString(task.title))
    return

  try {
    await $fetch(`/api/projects/${props.projectID}`, {
      method: "delete",
      body: {
        taskID: task.id,
      }
    })

    location.reload()
  } catch (e) {
    console.log(e.statusMessage)
  }
}

</script>
<template>
  <Dialog :open="isOpen">
    <DialogContent class="max-w-base">
      <DialogHeader>
        <DialogTitle>{{task.title}}</DialogTitle>
        <div class="flex flex-col items-center gap-4 mb-2">
          <p>{{task.description}}</p>
        </div>
      </DialogHeader>
      <DialogFooter>
        <Button @click="handleRemove" type="submit" class="rounded">Remove</Button>
        <DialogClose>
          <Button class="rounded">Close</Button>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>