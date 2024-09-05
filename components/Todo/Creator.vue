<template>
  <div>
    <div class="flex gap-2" :class="{ err: todoState.invalid }">
      <input type="text" v-model="todoState.todo" />
      <AddButton @click="createTodo"/>
    </div>
    <!-- <p>{{ todoState.todo }}</p> -->
    <p class="err-msg" v-show="todoState.invalid">{{ todoState.errMsg }}</p>
  </div>
</template>

<script setup>
import AddButton from './AddButton.vue';

const todoState = reactive({
  todo: "",
  invalid: null,
  errMsg: "",
});

const emit = defineEmits(["create-todo"]);

const createTodo = () => {
  // console.log(todoList);
  // console.log("add todo");
  todoState.invalid = null;

  if (todoState.todo != "") {
    emit("create-todo", todoState.todo);
    todoState.todo = "";
    return;
  }
  todoState.invalid = true;
  todoState.errMsg = "Todo val can't be empty";
};
</script>

<style scoped>
input {
  @apply px-2;
  background-color: whitesmoke;
  color: #383838;
  border: 1px solid gray;
  border-radius: 3px;
}
/* .err {} */
.err-msg {
  @apply text-red-300 text-xs font-bold;
}
</style>
