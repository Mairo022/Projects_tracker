<script setup>
import formatTime from "../../utils/formatTime";
import views from "../../data/views";
import {categoriseTasks, getViewLabel} from "./utils";

const props = defineProps({
  projectId: { type: Number, required: true },
  tasks: { type: Array, required: true }
})

const tasksCategorised = categoriseTasks(props.tasks)

const activeView = ref(views[0])
const viewLabel = ref(getViewLabel(activeView.value))
const renderedTasks = ref(tasksCategorised[activeView.value])

const editTaskProps = reactive({})
const isOpenEditTask = ref(false)
const isOpenAddTask = ref(false)

function onTaskClick(id) {
  const task = tasksCategorised[activeView.value].find(item => item.id === id)

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

function updateActiveView(view) {
  renderedTasks.value = tasksCategorised[view]
  activeView.value = view
  viewLabel.value = getViewLabel(view)
}
</script>
<template>
  <div class="flex gap-3 text-base items-center mt-3 mb-2 flex-wrap">
    <Button
        v-for="view in views"
        @click="updateActiveView(view)"
        variant="outline"
        class="h-[30px] rounded-[16px] text-s"
        :class="{'bg-accent font-semibold': activeView === view}"
    >
      {{view}}
    </Button>
    <Button @click="updateOpenAddTask" class="ml-auto hover:bg-muted/50 px-2 text-tertiary rounded bg-transparent">
      New {{viewLabel}}
    </Button>
  </div>
  <Table class="mx-auto table-fixed">
    <TableHeader>
      <TableRow class="hover:bg-transparent">
        <TableHead class="px-2 text-secondary border-[#36363C] border-b-2">
          Title
        </TableHead>
        <TableHead class="px-3 text-secondary text-right w-[100px] border-[#36363C] border-b-2">Created</TableHead>
        <TableHead class="px-3 text-secondary text-right w-[100px] border-[#36363C] border-b-2">
          Done
        </TableHead>
      </TableRow>
    </TableHeader>
    <TableBody class="text-base">
      <TableRow v-for="item in renderedTasks" :data-id="item.id" class="border-0 leading-[14px]">
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
      :projectID="projectId"
      :isOpen="isOpenEditTask"
      @update:open="updateOpenEditTask"
  />
  <ProjectTaskAddDialog
      :view="viewLabel"
      :id="projectId"
      :isOpen="isOpenAddTask"
      @update:open="updateOpenAddTask"
  />
</template>
