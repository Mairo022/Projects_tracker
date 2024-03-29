<script setup>
import { projects } from '@/data/projects'
import { ref, watch } from 'vue'
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
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const props = defineProps({
  projectId: { type: Number, required: false}
})

let projectName = ref(null)
let projectLive = ref(null)
let projectGithub = ref(null)

let isOpen = ref(false)
let inputName = ref()
let inputLive = ref()
let inputGithub = ref()

function updateOpenState() {
  isOpen.value = !isOpen.value
}

function handleEditProjectSubmit() {
  const name = inputName.value

  if (name === "") return
  if (name.trim() === "") return

  const projectIndex = projects.findIndex(project => project.id === props.projectId)
  projects[projectIndex].name = name

  assignInputsToDefault()
  updateOpenState()
}

function assignInputsToDefault() {
  projectName.value = inputName.value
  projectLive.value = inputLive.value
  projectGithub.value = inputGithub.value
}

function assignDefaultsToInput() {
  inputName.value = projectName.value
  inputLive.value = projectLive.value
  inputGithub.value = projectGithub.value
}

watch(() => props.projectId, () => {
  projectName.value = projects.find(project => project.id === props.projectId).name
}, { immediate: true })

watch(isOpen, () => {
  if (isOpen.value) {
    assignDefaultsToInput()
  }
})

</script>

<template>
  <header class="flex items-center mt-[-7px] mb-7">
    <h2 class="text-xl text-center font-medium text-primary">{{projectName}}</h2>
    <span class="mx-4 pb-[2px]">—</span>
    <a class="hover:text-linkhover" href="">Live,&nbsp;</a>
    <a class="hover:text-linkhover" href="">GitHub</a>
    <Button @click="updateOpenState" class="h-7 ml-auto bg-transparent hover:bg-muted/50 rounded-[2px]">
      <svg class="fill-[#B9B9B9]" fill="#bdbdc7" xmlns="http://www.w3.org/2000/svg" width="14px" height="14px" viewBox="0 0 45.97 45.97">
        <path d="M43.454,18.443h-2.437c-0.453-1.766-1.16-3.42-2.082-4.933l1.752-1.756c0.473-0.473,0.733-1.104,0.733-1.774 c0-0.669-0.262-1.301-0.733-1.773l-2.92-2.917c-0.947-0.948-2.602-0.947-3.545-0.001l-1.826,1.815 C30.9,6.232,29.296,5.56,27.529,5.128V2.52c0-1.383-1.105-2.52-2.488-2.52h-4.128c-1.383,0-2.471,1.137-2.471,2.52v2.607 c-1.766,0.431-3.38,1.104-4.878,1.977l-1.825-1.815c-0.946-0.948-2.602-0.947-3.551-0.001L5.27,8.205 C4.802,8.672,4.535,9.318,4.535,9.978c0,0.669,0.259,1.299,0.733,1.772l1.752,1.76c-0.921,1.513-1.629,3.167-2.081,4.933H2.501 C1.117,18.443,0,19.555,0,20.935v4.125c0,1.384,1.117,2.471,2.501,2.471h2.438c0.452,1.766,1.159,3.43,2.079,4.943l-1.752,1.763 c-0.474,0.473-0.734,1.106-0.734,1.776s0.261,1.303,0.734,1.776l2.92,2.919c0.474,0.473,1.103,0.733,1.772,0.733 s1.299-0.261,1.773-0.733l1.833-1.816c1.498,0.873,3.112,1.545,4.878,1.978v2.604c0,1.383,1.088,2.498,2.471,2.498h4.128 c1.383,0,2.488-1.115,2.488-2.498v-2.605c1.767-0.432,3.371-1.104,4.869-1.977l1.817,1.812c0.474,0.475,1.104,0.735,1.775,0.735 c0.67,0,1.301-0.261,1.774-0.733l2.92-2.917c0.473-0.472,0.732-1.103,0.734-1.772c0-0.67-0.262-1.299-0.734-1.773l-1.75-1.77 c0.92-1.514,1.627-3.179,2.08-4.943h2.438c1.383,0,2.52-1.087,2.52-2.471v-4.125C45.973,19.555,44.837,18.443,43.454,18.443z M22.976,30.85c-4.378,0-7.928-3.517-7.928-7.852c0-4.338,3.55-7.85,7.928-7.85c4.379,0,7.931,3.512,7.931,7.85 C30.906,27.334,27.355,30.85,22.976,30.85z"/>
      </svg>
    </Button>
  </header>

  <Dialog :open="isOpen" @update:open="updateOpenState">
    <DialogContent class="max-w-base">
      <DialogHeader>
        <DialogTitle>Edit project</DialogTitle>
        <div class="flex flex-col items-center gap-3 mb-2 mt-4">
          <Input class="rounded" v-model="inputName" id="inputProjectName" placeholder="Title"/>
          <Input class="rounded" v-model="inputLive" id="inputProjectLive" placeholder="Live"/>
          <Input class="rounded" v-model="inputGithub" id="inputProjectGithub" placeholder="GitHub"/>
        </div>
      </DialogHeader>
      <DialogFooter>
        <DialogClose>
          <Button class="rounded">Close</Button>
        </DialogClose>
        <Button @click="handleEditProjectSubmit" type="submit" class="rounded">Save changes</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
