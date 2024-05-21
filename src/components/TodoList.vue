<template>
  <ul class="list-group list-group-flush">
    <TodoItem
      v-for="(todo, index) in todos"
      :key="index"
      :todo="todo"
      :index="index"
      @doneTodo="handleDoneTodo"
      @deleteTodo="handleDeleteTodo"
    />
  </ul>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';
import TodoItem from './TodoItem.vue';

const props = defineProps({
  todos: {
    type: Array,
    default: () => [],
  },
});

const emits = defineEmits(['doneTodo', 'deleteTodo']);

const handleDoneTodo = (index) => {
  emits('doneTodo', index);
};

const handleDeleteTodo = (index) => {
  emits('deleteTodo', index);
};
</script>
