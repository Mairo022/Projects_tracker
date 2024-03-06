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

const props = defineProps({
  view: { type: String, required: true },
  projectId: { type: Number, required: false}
})

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
        <TableRow>
          <TableCell class="font-medium">
            Add endpoint for best sector times
          </TableCell>
          <TableCell class="text-right text-primary">1h</TableCell>
          <TableCell class="text-right text-[#6ec075] cursor-pointer transition-colors hover:bg-muted/50">
            ✓
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
</template>
