<script>
import '@/assets/css/base.css'
import '@/assets/css/main.css'
</script>

<template>
  <main class="flex flex-wrap w-[90%] max-w-[1100px] mx-auto relative top-[33%] border-2 rounded">
    <nav class="basis-[10%] grow bg-card px-6 py-4 flex flex-col">
      <Menu/>
    </nav>
    <section class="grow bg-card px-6 py-6 w-[70%]">
      <slot/>
    </section>
  </main>
</template>