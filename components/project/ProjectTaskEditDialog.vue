<script setup>
import isEmptyString from "../../utils/isEmptyString";
import EditIcon from "../../assets/img/editIcon.svg"

const props = defineProps({
  task: { required: true},
  projectID: { type: Number, required: true },
  isOpen: { type: Boolean, required: true },
})

const emit = defineEmits(['update:task'])
const task = reactive(props.task)

const editingTitle = ref(false)
const editingDescription = ref(false)

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

async function handleSave() {
  try {
    task.title?.trim()
    task.description?.trim()

    await $fetch(`/api/projects/${props.projectID}`, {
      method: "put",
      body: {
        task: task,
      }
    })

    emit('update:task', task)
    emit('update:open')
  } catch (e) {
    console.log(e)
  }
}

function setEditDescription() {
  editingDescription.value = !editingDescription.value
}
function setEditTitle() {
  editingTitle.value = !editingTitle.value
}

watch(props, () => {
  if (!props.isOpen) {
    editingTitle.value = false
    editingDescription.value = false
  }
})

</script>
<template>
  <Dialog :open="isOpen">
    <DialogContent class="max-w-base">
      <DialogHeader class="flex-row gap-2 text-lg font-semibold leading-none">
        <DialogTitle :class="{'hidden': editingTitle}">
          {{task.title}}
        </DialogTitle>
        <Input placeholder="Title"
               v-model="task.title"
               class="rounded text-lg"
               :class="{'hidden': !editingTitle}"
        />
        <button @click="setEditTitle" class="p-0">
          <EditIcon filled class="fill-secondary hover:fill-primary"/>
        </button>
      </DialogHeader>
      <div class="flex flex-col gap-2 my-2 max-h-[200px]">
        <p :class="{'hidden': editingDescription}">
          {{task.description}}
        </p>
        <Textarea placeholder="Description"
                  rows="10"
                  v-model="task.description"
                  class="rounded text-md h-auto"
                  :class="{'hidden': !editingDescription}"
        />
        <button @click="setEditDescription" class="p-0">
          <EditIcon filled class="fill-secondary hover:fill-primary"/>
        </button>
      </div>
      <DialogFooter class="gap-3">
        <Button @click="handleRemove" type="submit" class="rounded">Remove</Button>
        <Button @click="handleCompleted" type="submit" class="rounded">Mark as completed</Button>
        <Button @click="handleSave" type="submit" class="rounded">Save</Button>
        <DialogClose class="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 rounded">
          Close
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>