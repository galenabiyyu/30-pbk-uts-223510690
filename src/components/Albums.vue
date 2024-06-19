<template>
    <div>
      <h1>Albums</h1>
      <div v-if="loading">Loading albums...</div>
      <div v-else>
        <div v-for="album in albums" :key="album.id">
          <router-link :to="`/albums/${album.id}`">{{ album.title }}</router-link>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { useAlbumsStore } from '../store/albums';
  import { onMounted } from 'vue';
  
  export default {
    setup() {
      const store = useAlbumsStore();
      onMounted(() => {
        store.fetchAlbums();
      });
  
      return {
        albums: store.albums,
        loading: store.loading,
      };
    },
  };
  </script>
  