<template>
  <article class="project__content">
    {{title}}
    <table>
      <thead>
        <tr>
          <th>Title</th>
          <th>Created</th>
          <th>V</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Fix pagination of drivers & sessions</td>
          <td>1d</td>
          <td>V</td>
        </tr>
      </tbody>
    </table>
  </article>
</template>

<script>
export default {
  props: ['title'],
  name: "ProjectContent"
}
</script>

<style scoped src="./ProjectContent.css"></style>