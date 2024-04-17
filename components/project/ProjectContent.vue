<script setup>
const props = defineProps({
  projectId: { type: Number, required: true },
  tasks: { type: Array, required: true }
})

const id = props.projectId
const tasks = props.tasks

const todos = tasks?.filter(task => task.type === "todo" && !task.completed)
const bugs = tasks?.filter(task => task.type === "bug" && !task.completed)
const ideas = tasks?.filter(task => task.type === "idea" && !task.completed)
const history = tasks?.filter(task => task.completed === true)

let isTaskOpen = ref(false)
let isAddTaskOpen = ref(false)
let inputTaskTitle = ref("")
let inputTaskDescription = ref("")

let taskId = ref(null)
let taskTitle = ref(undefined)

const isOpenAddTask = ref(false)

function updateOpenAddTask() {
  isOpenAddTask.value = !isOpenAddTask.value
}

function updateTaskOpenState(id) {
  taskId.value = id
  isTaskOpen.value = !isTaskOpen.value
}

function createdTime(inputTime) {
  inputTime = new Date(inputTime)
  const currentTime = new Date()
  const difference = currentTime.getTime() - inputTime.getTime()

  const seconds = difference / 1000
  const minutes = seconds / 60
  const hours = minutes / 60
  const days = hours / 24
  const weeks = days / 7

  if (minutes < 1) return "1m"
  if (minutes < 60) return Math.round(minutes) + "m"
  if (hours < 24) return Math.round(hours) + "h"
  if (days < 7) return Math.round(days) + "d"
  if (weeks > 1) return Math.round(weeks) + "w"

  return "NULL"
}

watch(isAddTaskOpen, () => {
  if (!isAddTaskOpen.value) {
    setTimeout(() => {
      inputTaskTitle.value = ""
      inputTaskDescription.value = ""
    }, 200)
  }
})

watch(isTaskOpen, () => {
  if (isTaskOpen.value && taskId != null) {
    const task = todos.find(task => task.id === taskId.value)
    inputTaskTitle.value = task.title
    inputTaskDescription.value = task.description
  }
  if (!isTaskOpen.value) {
    inputTaskTitle.value = ""
    inputTaskDescription.value = ""
  }
})
</script>
<template>
  <div class="text-base border-b-2 border-[#36363C] px-1 pb-2 mt-[-7px] mb-5">
    <h3 class="inline-block font-medium text-lg text-[#DDD] mb-1">{{}}</h3>
    <Button @click="updateOpenAddTask" class="float-right hover:bg-muted/50 px-2 mt-[-0.40rem] text-[#B9B9B9] rounded-t-[2px] bg-transparent">
      + Add task
    </Button>
  </div>
  <Table class="w-[98%] mx-auto table-fixed" >
    <TableHeader>
      <TableRow class="hover:bg-transparent">
        <TableHead class="px-2 text-[#AAAAAA] border-[#36363C] border-b-2">
          Title
        </TableHead>
        <TableHead class="px-3 text-[#AAAAAA] text-right w-[100px] border-[#36363C] border-b-2">Created</TableHead>
        <TableHead class="px-3 text-[#AAAAAA] text-right w-[100px] border-[#36363C] border-b-2">
          Done
        </TableHead>
      </TableRow>
    </TableHeader>
    <TableBody class="text-base">
      <TableRow v-for="item in todos" :data-id="item.id" class="border-0 leading-[14px]">
        <TableCell class="px-3 border-b-2 cursor-pointer text-primary rounded-l-[4px]" @click="updateTaskOpenState(item.id)">
          {{item.title}}
        </TableCell>
        <TableCell class="px-3 border-b-2 text-right text-secondary">{{createdTime(item.created_at)}}</TableCell>
        <TableCell class="px-3 border-b-2 text-right text-[#6ec075] rounded-r-[4px] cursor-pointer transition-colors hover:bg-muted/50">
          ✓
        </TableCell>
      </TableRow>
    </TableBody>
  </Table>

  <Dialog :open="isTaskOpen" @update:open="updateTaskOpenState">
    <DialogContent class="max-w-base">
      <DialogHeader>
        <DialogTitle>{{inputTaskTitle}}</DialogTitle>
        <div class="flex flex-col items-center gap-4 mb-2">
          <p>{{inputTaskDescription}}</p>
        </div>
      </DialogHeader>
      <DialogFooter>
        <Button @click="" type="submit" class="rounded">Remove</Button>
        <DialogClose>
          <Button class="rounded">Close</Button>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  </Dialog>
  <ProjectTaskAddDialog view="task" :id="id" :isOpen="isOpenAddTask" @update:open="updateOpenAddTask"/>
</template>
