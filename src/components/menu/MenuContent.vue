<script setup>
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
</script>

<template>
  <div class="border-b pb-3 mb-3">
    <Select>
      <SelectTrigger>
        <SelectValue placeholder="Select a project" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel class="border-b pb-3 mb-1">Projects</SelectLabel>
          <SelectItem value="apple" class="cursor-pointer">
            Apple
          </SelectItem>
          <SelectItem value="banana" class="cursor-pointer">
            Banana
          </SelectItem>
          <SelectItem value="blueberry" class="cursor-pointer">
            Blueberry
          </SelectItem>
          <SelectItem value="grapes" class="cursor-pointer">
            Grapes
          </SelectItem>
          <SelectItem value="pineapple" class="cursor-pointer">
            Pineapple
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  </div>
  <RadioGroup class="px-1" default-value="option-one">
    <div class="flex items-center space-x-2 h-5">
      <RadioGroupItem id="option-one" value="option-one" />
      <Label class="cursor-pointer w-full" for="option-one">To-Do</Label>
    </div>
    <div class="flex items-center space-x-2 h-5">
      <RadioGroupItem id="option-two" value="option-two" />
      <Label class="cursor-pointer w-full" for="option-two">Bugs</Label>
    </div>
    <div class="flex items-center space-x-2 h-5">
      <RadioGroupItem id="option-four" value="option-four" />
      <Label class="cursor-pointer w-full" for="option-four">Ideas</Label>
    </div>
    <div class="flex items-center space-x-2 h-5">
      <RadioGroupItem id="option-five" value="option-five" />
      <Label class="cursor-pointer w-full" for="option-five">History</Label>
    </div>
  </RadioGroup>
</template>