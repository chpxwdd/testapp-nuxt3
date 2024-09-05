<template>
  <div class="todo-item">
    <div class="flex gap-2 mb-2">
      <!-- <input type="checkbox" :value="todo.uid" />       -->
      <input v-if="todo.isEditing" type="text" :value="todo.todo" />
      <span v-else>{{ todo.todo }}</span>
    </div>
    <div class="flex gap-2 border p-2 rounded todo-actions">
      <button v-if="todo.isEditing" @click=""><Icon name="ph:check-circle" color="green" size="18" /></button>
      <button v-else @click="">Edit <Icon name="ph:pencil-fill" color="orange" size="18" /></button>
      <button @click="">Delete<Icon name="ph:trash" color="red" size="18" /></button>
    </div>
  </div>
</template>

<script setup>

const props = defineProps({
  todo: {
    type: Object,
    requred: true,
  },
});
console.log(todo);
</script>

<style scoped lang="css">
.todo-item {
  @apply p-2 border mb-2 rounded;
}
input {
    @apply px-2 py-1 border rounded;
}

.todo-actions button:hover{ 
    @apply bg-gray-100;
}
.todo-actions button{
    @apply px-2 py-1 border rounded;
    font-weight: bold;

}
</style>
