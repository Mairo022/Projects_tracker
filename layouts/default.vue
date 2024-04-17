<script>
import '@/assets/css/base.css'
import '@/assets/css/main.css'
</script>

<template>
  <main class="flex flex-wrap gap-6 w-[90%] max-w-[1200px] mx-auto relative top-[33%]">
    <nav class="basis-[20%] bg-card px-6 py-4  border-2 rounded">
      <Menu/>
    </nav>
    <section class="grow bg-card px-6 py-6 border-2 rounded w-[70%]">
      <slot/>
    </section>
  </main>
</template>