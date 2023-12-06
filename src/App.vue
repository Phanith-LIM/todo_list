<template>
  <div id="app">
    <todo-app></todo-app>
  </div>
  <footer class="fixed bottom-0 w-full p-4 text-center">
    <div class="flex flex-col">
      <a href="https://phanithlim.netlify.app/">
        Created by <strong>Phanith LIM</strong>
      </a>
      <span class="text-green-800 text-xs font-semibold">VueJS</span>
    </div>
  </footer>
</template>

<script setup lang="ts">
import TodoApp from "./components/TodoApp.vue";
</script>

