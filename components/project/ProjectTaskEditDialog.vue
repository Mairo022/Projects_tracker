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

async function handleCompleted() {
  try {
    task.completed = true

    await $fetch(`/api/projects/${props.projectID}`, {
      method: "put",
      body: {
        task: task,
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
      </DialogHeader>
      <div class="flex flex-col items-center gap-3 my-2">
        <p>{{task.description}}</p>
      </div>
      <DialogFooter>
        <Button @click="handleRemove" type="submit" class="rounded">Remove</Button>
        <Button @click="handleCompleted" type="submit" class="rounded">Mark as completed</Button>
        <DialogClose class="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 rounded">
          Close
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>