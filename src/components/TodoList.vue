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
  
  
  <style scoped>
  /* Container styling */
  .list-group {
    padding: 0;
    margin: 0;
    list-style: none;
  }
  
  /* Todo Item styling */
  .list-group-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px;
    margin: 5px 0;
    background-color: #f8f9fa;
    border: 1px solid #ddd;
    border-radius: 4px;
    transition: background-color 0.3s ease;
  }
  
  /* Hover effect for Todo Items */
  .list-group-item:hover {
    background-color: #e9ecef;
  }
  
  /* Completed Todo Item styling */
  .list-group-item.completed {
    text-decoration: line-through;
    color: #6c757d;
  }
  
  /* Button styling */
  button {
    background: none;
    border: none;
    color: #007bff;
    cursor: pointer;
    transition: color 0.3s ease;
  }
  
  button:hover {
    color: #0056b3;
  }
  </style>