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
          <TableCell class="text-right text-primary">{{item.created}}</TableCell>
          <TableCell class="text-right text-[#6ec075] cursor-pointer transition-colors hover:bg-muted/50">
            ✓
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
</template>
