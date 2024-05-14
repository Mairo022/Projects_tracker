<script setup>
const { isOpen } = defineProps({
  isOpen: { type: Boolean, required: true }
})

let inputProjectName = ""

async function handleAddProjectSubmit() {
  if (isEmptyString(inputProjectName)) {
    return
  }

  try {
    await $fetch("/api/projects", {
      method: "post",
      body: {
        name: inputProjectName,
        live: null,
        source: null
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
    <DialogContent class="max-w-sm">
      <DialogHeader>
        <DialogTitle>Add project</DialogTitle>
      </DialogHeader>
      <div class="flex items-center my-2">
        <Input v-model="inputProjectName" id="name" class="rounded" placeholder="Project name" />
      </div>
      <DialogFooter>
        <DialogClose class="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 rounded">
          Cancel
        </DialogClose>
        <Button @click="handleAddProjectSubmit" type="submit" class="rounded">Add</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>