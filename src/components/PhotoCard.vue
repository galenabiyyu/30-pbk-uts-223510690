<template>
    <div @click="showDetail" class="photo-card">
      <img :src="photo.thumbnailUrl" :alt="photo.title" />
      <p>{{ photo.title }}</p>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      photo: Object,
    },
    methods: {
      showDetail() {
        this.$emit('photo-clicked', this.photo.id);
      },
    },
  };
  </script>
  
  <style scoped>
  .photo-card {
    cursor: pointer;
    text-align: center;
    margin: 10px;
  }
  .photo-card img {
    width: 150px;
    height: 150px;
  }
  </style>
  