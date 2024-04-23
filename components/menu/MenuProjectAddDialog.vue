<script setup>
const { isOpen } = defineProps({
  isOpen: { type: Boolean, required: true }
})

let inputProjectName = ""
let dialogDescriptionData = ref({class: "", text: ""})

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

    dialogDescriptionData.value = {
      text: `Added ${inputProjectName}`,
      class: 'text-[#6ec075]'
    }

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
        <DialogDescription class="absolute top-11" :class="dialogDescriptionData.class">
          {{dialogDescriptionData.text}}
        </DialogDescription>
        <div class="flex items-center gap-4 mt-6 mb-2">
          <Input v-model="inputProjectName" id="name" class="rounded" placeholder="Project name" />
        </div>
      </DialogHeader>
      <DialogFooter>
        <Button @click="handleAddProjectSubmit" type="submit" class="rounded">Confirm</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>