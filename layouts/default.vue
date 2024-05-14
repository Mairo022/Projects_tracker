<script>
import '@/assets/css/base.css'
import '@/assets/css/main.css'
</script>

<template>
  <main class="flex flex-wrap w-[90%] max-w-[1100px] mx-auto mb-5 relative top-[33%] border-2 rounded bg-card">
    <nav class="basis-[10%] grow px-6 py-4 flex flex-col">
      <Menu/>
    </nav>
    <section class="grow px-6 py-6 w-[70%]">
      <slot/>
    </section>
  </main>
</template>