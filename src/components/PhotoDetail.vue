<template>
    <div v-if="photo">
      <h1>{{ photo.title }}</h1>
      <img :src="photo.url" :alt="photo.title" />
    </div>
    <div v-else>
      Loading photo...
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue';
  import axios from 'axios';
  
  export default {
    props: {
      id: {
        type: Number,
        required: true,
      },
    },
    setup(props) {
      const photo = ref(null);
  
      onMounted(async () => {
        try {
          const response = await axios.get(`https://jsonplaceholder.typicode.com/photos/${props.id}`);
          photo.value = response.data;
        } catch (error) {
          console.error('Error fetching photo detail:', error);
        }
      });
  
      return { photo };
    },
  };
  </script>
  
  <style scoped>
  img {
    max-width: 100%;
    height: auto;
  }
  </style>
  