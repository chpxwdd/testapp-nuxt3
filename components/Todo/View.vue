<template>
  <div>
    <h2 class="text-xl my-2 px-2 border-b">Todo's view</h2>
    <div class="p-2">
      <TodoCreator @create-todo="createTodo" class="mb-2"/>
      <h3>Todo's list</h3>
      <ul class="">
        <li v-for="todoItem in todoList">
          <TodoItem :todo="todoItem"/>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
const todoList = ref([]);
const createTodo = (todo) => {

  todoList.value.push({
    id: Date.now(),
    todo,
    isCompleted: null,
    isEditing: null,
  });
};
</script>

<style scoped></style>
