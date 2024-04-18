<script setup>
import formatTime from "../../utils/formatTime";

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

const editTaskProps = reactive({})
const isOpenEditTask = ref(false)
const isOpenAddTask = ref(false)

function onTaskClick(id) {
  const task = todos.find(item => item.id === id)

  editTaskProps.title = task.title
  editTaskProps.description = task.description
  editTaskProps.id = task.id

  updateOpenEditTask()
}

function updateOpenEditTask() {
  isOpenEditTask.value = !isOpenEditTask.value
}

function updateOpenAddTask() {
  isOpenAddTask.value = !isOpenAddTask.value
}

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
        <TableCell class="px-3 border-b-2 cursor-pointer text-primary rounded-l-[4px]" @click="onTaskClick(item.id)">
          {{item.title}}
        </TableCell>
        <TableCell class="px-3 border-b-2 text-right text-secondary">{{formatTime(item.created_at)}}</TableCell>
        <TableCell class="px-3 border-b-2 text-right text-[#6ec075] rounded-r-[4px] cursor-pointer transition-colors hover:bg-muted/50">
          ✓
        </TableCell>
      </TableRow>
    </TableBody>
  </Table>
  <ProjectTaskEditDialog
      :task="editTaskProps"
      :projectID="id"
      :isOpen="isOpenEditTask"
      @update:open="updateOpenEditTask"
  />
  <ProjectTaskAddDialog
      view="task"
      :id="id"
      :isOpen="isOpenAddTask"
      @update:open="updateOpenAddTask"
  />
</template>
