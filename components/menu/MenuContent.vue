<script setup>
const { data : projects } = await useFetch('/api/projects')

let isOpen = ref(false)
let inputProjectName = ""

let dialogDescriptionData = ref({class: "", text: ""})

function updateOpenState() {
  isOpen.value = !isOpen.value

  if (!isOpen.value) {
    dialogDescriptionData.value = {
      text: '',
      class: ''
    }
  }
}

async function handleAddProjectSubmit() {
  if (isEmptyString(inputProjectName)) {
    return
  }

  try {
    const res = await $fetch("/api/projects", {
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

    setTimeout(() => {
      isOpen.value = false
    }, 450)
  } catch (e) {
    console.log(e.statusMessage)
  }
}
</script>

<template>
  <div class="border-b pb-3 mb-3">
    <Select>
      <SelectTrigger>
        <SelectValue placeholder="Select a project" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <Dialog :open="isOpen" @update:open="updateOpenState">
            <SelectLabel class="border-b py-0 px-0 mb-1 font-medium">
              <DialogTrigger as-child>
                <button class="pl-8 mb-2 py-1 w-full hover:bg-accent text-left">Add project</button>
              </DialogTrigger>
            </SelectLabel>
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
            <NuxtLink v-for="project in projects" :to="project.id.toString()">
              <SelectItem :value="project.id.toString()" class="cursor-pointer">
                {{ project.name }}
              </SelectItem>
            </NuxtLink>
        </SelectGroup>
      </SelectContent>
    </Select>
  </div>
</template>