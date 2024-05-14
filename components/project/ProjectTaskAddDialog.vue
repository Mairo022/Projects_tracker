<script setup>
import isEmptyString from "../../utils/isEmptyString";

const { id } = defineProps({
  id: { type: Number, required: true },
  isOpen: { type: Boolean, required: true },
  view: { type: String, required: true}
})

const title = ref("")
const description = ref(null)

async function handleSubmit() {
  if (isEmptyString(title.value))
    return

  try {
    await $fetch(`/api/projects/${id}`, {
      method: "post",
      body: {
        id,
        title: title.value,
        description: description.value,
        type: "todo"
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
        <DialogTitle>Add {{view}}</DialogTitle>
      </DialogHeader>
      <div class="flex flex-col items-center gap-3 my-2">
        <Input class="rounded" v-model="title" placeholder="Title" />
        <Textarea rows="4" v-model="description" class="resize-none rounded" placeholder="Description"/>
      </div>
      <DialogFooter class="gap-4">
        <DialogClose class="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 rounded">
          Close
        </DialogClose>
        <Button @click="handleSubmit" type="submit" class="rounded">Add</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>