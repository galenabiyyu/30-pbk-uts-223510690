<template>
    <li class="list-group-item">
      <div class="row gy-2">
        <div
          class="col-sm-12 col-md-auto me-auto align-self-center fs-5"
          :class="{ 'text-decoration-line-through text-muted': todo.selesai }"
        >
          {{ todo.nama }}
        </div>
        <div class="col-sm-12 col-md-auto">
          <div class="row gx-2">
            <div class="col-auto">
              <button
                class="btn"
                :class="[todo.selesai ? 'btn-outline-secondary' : 'btn-outline-success']"
                @click="handleDone"
              >
                <font-awesome-icon icon="circle-check" />
              </button>
            </div>
            <div class="col-auto">
              <button
                class="btn"
                :class="[todo.selesai ? 'btn-outline-secondary' : 'btn-outline-danger']"
                @click="handleDelete"
              >
                <font-awesome-icon icon="eraser" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </li>
  </template>
  
  <script setup>
  import { defineProps, defineEmits } from 'vue';
  
  const props = defineProps({
    todo: Object,
    index: Number,
  });
  
  const emits = defineEmits(['doneTodo', 'deleteTodo']);
  
  const handleDone = () => {
    emits('doneTodo', props.index);
  };
  
  const handleDelete = () => {
    emits('deleteTodo', props.index);
  };
  </script>
  
  <style scoped>
  .text-decoration-line-through {
    text-decoration: line-through;
  }
  </style>
  