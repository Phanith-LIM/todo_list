<template>
  <div class="container max-w-[70%} h-screen mx-auto p-3 md:block">
    <div class="w-full flex flex-col items-center space-y-3 pt-6">
      <h1 class="text-3xl font-bold">Todo List</h1>
      <form class="max-w-lg w-full" @submit.prevent="onTap">
        <div class="flex space-x-1 max-w-lg w-full" >
          <input v-model="taskInput" type="text" placeholder="Type here" class="d-flex input w-full bg-gray-100" required>
          <button type="submit" class="btn btn-warning rounded"> submit</button>
        </div>
      </form>
      <div class="overflow-x-auto w-full max-w-lg">
        <table class="table">
          <thead>
          <tr>
            <th>Task</th>
            <th>Name</th>
            <th>Status</th>
            <th class="text-center">Edit</th>
            <th class="text-center">Delete</th>
          </tr>
          </thead>
          <tbody>
            <tr v-for="(task, index) in sortedTasks" :key="index">
              <th>{{ task.id }}</th>
              <td :class="{
                'line-through': task.status == status.finished
              }">{{ task.name }}</td>
              <td class="w-1/3"><button @click="onChangeStatus(index)" :class="{
                'text-yellow-500': task.status == status.progress,
                'text-green-500': task.status == status.finished,
              }">{{ task.status }}</button></td>
              <td class="text-center">
                <button @click="onUpdate(index)" class="fill-current text-blue-700 transition duration-500 ease-in-out hover:scale-125 ">
                  <font-awesome-icon :icon="['fas', 'pen']"/>
                </button>
              </td>
              <td class="text-center">
                <button @click="onDelete(index)" class="fill-current text-red-600 transition duration-500 ease-in-out hover:scale-125">
                  <font-awesome-icon :icon="['fas', 'trash']"/>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref, computed, onMounted} from 'vue'

onMounted(() => {
  const storedTasks = localStorage.getItem('tasks');
  if (storedTasks) {
    tasks.value = JSON.parse(storedTasks);
  }
});

enum status {
  todo = "Todo",
  progress = "Progress",
  finished = "Finished"
}
const isEdit = ref<boolean>(false);
const editIndex = ref<number | null>();
const taskInput = ref<string>("");

interface TaskModel {
  id: number;
  name: string;
  status: status;
}
const tasks = ref<TaskModel[]>([]);

function onTap(): void {
  if (taskInput.value === "") return;
  if(!isEdit.value) {
    tasks.value.push({
      id: tasks.value.length + 1,
      name: taskInput.value,
      status: status.todo
    });
  }else {
    tasks.value[editIndex.value!].name = taskInput.value;
    isEdit.value = false;
    editIndex.value = null;
  }
  taskInput.value = "";
}

function onChangeStatus(index: number): void {
  const task_status = tasks.value[index].status;
  if(task_status === status.progress) {
    tasks.value[index].status = status.finished;
  }
  if(task_status === status.finished) {
    tasks.value[index].status = status.todo;
  }
  if(task_status === status.todo) {
    tasks.value[index].status = status.progress;
  }
}

function onUpdate(index: number): void {
  isEdit.value = true;
  taskInput.value = tasks.value[index].name;
  editIndex.value = index;
}

function onDelete(index: number): void {
  tasks.value.splice(index, 1);
}

const sortedTasks = computed(() => {
  const clonedTasks = [...tasks.value];

  // Sorting logic: Sort by id in ascending order
  clonedTasks.sort((a, b) => {
    return a.id - b.id;
  });

  return clonedTasks;
});

function saveTasks() {
  const tasksToSave = tasks.value.filter(task => task.status !== status.finished);
  localStorage.setItem('tasks', JSON.stringify(tasksToSave));
}
window.addEventListener('beforeunload', saveTasks);

</script>
