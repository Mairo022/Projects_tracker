<script setup>
import { ref } from 'vue'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
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
import {projects} from '@/data/projects'
import {projectsData, projectTemplate} from '@/data/projectsData'

const emits = defineEmits(['update:project', 'update:view'])
const views = ["To-do", "Bugs", "Ideas", "History"]

let isOpen = ref(false)
let inputProjectName = ""

let projectActive = null
let projectView = ref()

let dialogDescriptionData = ref({class: "", text: ""})

function updateProjectView(view) {
  projectView.value = view
  emits('update:view', view)
}

function updateProjectActive(id) {
  projectActive = id
  projectView.value = views[0]
  emits('update:view', views[0])
  emits('update:project', id)
}

function updateOpenState() {
  isOpen.value = !isOpen.value

  if (!isOpen.value) {
    dialogDescriptionData.value = {text: '', class: ''}
  }
}

function handleAddProjectSubmit() {
  if (inputProjectName === "") return

  const projectName = inputProjectName.trim()

  if (projectName === "") return

  const isNameTaken = projects.some(project => project.name === projectName)

  if (isNameTaken) {
    dialogDescriptionData.value = {
      text: 'Name is in use',
      class: 'text-[#E3545B]'
    }
    return
  }

  projects.push({id: projects.length, name: projectName})
  projectsData.set(projectsData.size, projectTemplate)

  dialogDescriptionData.value = {
    text: `Added ${projectName}`,
    class: 'text-[#6ec075]'
  }

  setTimeout(() => {
    isOpen.value = false
  }, 450)
}

</script>

<template>
  <div class="border-b pb-3 mb-3">
    <Select @update:modelValue="updateProjectActive">
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
          <SelectItem v-for="project in projects" :value="project.id.toString()" class="cursor-pointer">
            {{ project.name }}
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  </div>
  <RadioGroup class="px-1" default-value="option-one" :modelValue="projectView" @update:modelValue="updateProjectView">
    <div v-for="view in views" class="flex items-center space-x-2 h-5">
      <RadioGroupItem :id="view" :value="view" />
      <Label class="cursor-pointer w-full" :for="view">{{view}}</Label>
    </div>
  </RadioGroup>
</template>