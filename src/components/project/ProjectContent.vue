<script setup>
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { ref, watch } from 'vue'
import { projectsData } from '@/data/projectsData'
import { projects } from '@/data/projects'

const props = defineProps({
  view: { type: String, required: true },
  projectId: { type: Number, required: false}
})

let projectData = ref(null)
let projectName = projects.find(project => project.id === props.projectId).name

let isTaskOpen = ref(false)
let isAddTaskOpen = ref(false)
let inputTaskTitle = ref("")
let inputTaskDescription = ref("")

let taskId = ref(null)
let taskTitle = ref(undefined)

function updateAddTaskOpenState() {
  isAddTaskOpen.value = !isAddTaskOpen.value
}

function handleAddTaskSubmit() {
  const inputTitle = inputTaskTitle.value
  const inputDescription = inputTaskDescription.value

  if (inputTitle === "") return
  if (inputTitle.trim() === "") return

  projectData.value.unshift(
      {
        id: Math.round(Math.random() * 100 + 50),
        title: inputTitle,
        created: new Date()
      }
  )

  updateAddTaskOpenState()
}

function handleRemoveTask(id) {
  const updatedData = projectData.value.filter(task => task.id !== id)
  projectData.value = updatedData
  projectsData.get(props.projectId)[translateView(props.view)] = updatedData
}

function updateTaskOpenState(id) {
  taskId.value = id
  isTaskOpen.value = !isTaskOpen.value
}

function translateView(view) {
  const viewValues = new Map([
      ["To-do", "todo"],
      ["Bugs", "bugs"],
      ["Ideas", "ideas"],
      ["History", "history"]
  ])

  return viewValues.get(view)
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

watch(props, () => {
  projectData.value = projectsData.get(props.projectId)[translateView(props.view)]
}, { immediate: true })

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
    const task = projectData.value.find(task => task.id === taskId.value)
    inputTaskTitle = task.title
    inputTaskDescription = task.description
  }
  if (!isTaskOpen.value) {
    inputTaskTitle = ""
    inputTaskDescription = ""
  }
})

</script>
<template>
  <div class="text-base border-b-2 border-[#36363C] px-1 pb-2 mt-[-7px] mb-5">
    <h3 class="inline-block font-medium text-lg text-[#DDD] mb-1">{{view}}</h3>
    <Button @click="updateAddTaskOpenState" class="float-right hover:bg-muted/50 px-2 mt-[-0.40rem] text-[#B9B9B9] rounded-t-[2px] bg-transparent">
      + Add item
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
      <TableRow v-for="item in projectData" :data-id="item.id" class="border-0 leading-[14px]">
        <TableCell class="px-3 border-b-2 cursor-pointer text-primary rounded-l-[4px]" @click="updateTaskOpenState(item.id)">
          {{item.title}}
        </TableCell>
        <TableCell class="px-3 border-b-2 text-right text-secondary">{{createdTime(item.created)}}</TableCell>
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
        <Button @click="handleRemoveTask(taskId)" type="submit" class="rounded">Remove</Button>
        <DialogClose>
          <Button class="rounded">Close</Button>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  </Dialog>

  <Dialog :open="isAddTaskOpen" @update:open="updateAddTaskOpenState">
    <DialogContent class="max-w-base">
      <DialogHeader>
        <DialogTitle>{{projectName}}</DialogTitle>
        <DialogDescription class="pb-1">
          Adding task
        </DialogDescription>
        <div class="flex flex-col items-center gap-4 mb-2">
          <Input class="rounded" v-model="inputTaskTitle" placeholder="Title" />
          <Textarea rows="4" v-model="inputTaskDescription" class="resize-none rounded" placeholder="Description"/>
        </div>
      </DialogHeader>
      <DialogFooter>
        <DialogClose>
          <Button class="rounded">Close</Button>
        </DialogClose>
        <Button @click="handleAddTaskSubmit" type="submit" class="rounded">Add</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
