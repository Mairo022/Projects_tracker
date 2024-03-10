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
import { ref, watch } from 'vue'
import { projectsData } from '@/data/projectsData'

const props = defineProps({
  view: { type: String, required: true },
  projectId: { type: Number, required: false}
})

let projectData = ref(null)

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

</script>
<template>
  <h3 class="text-base border-b py-3 mb-5">{{view}}</h3>
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>
            Title
          </TableHead>
          <TableHead class="text-right w-[100px]">Created</TableHead>
          <TableHead class="text-right w-[100px]">
            Done
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody class="text-base">
        <TableRow v-for="item in projectData" :data-id="item.id">
          <TableCell class="font-medium">
            {{item.title}}
          </TableCell>
          <TableCell class="text-right text-primary">{{createdTime(item.created)}}</TableCell>
          <TableCell class="text-right text-[#6ec075] cursor-pointer transition-colors hover:bg-muted/50">
            ✓
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
</template>
