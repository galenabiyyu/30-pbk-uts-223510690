<template>
    <div>
      <h1>Photos in Album {{ albumId }}</h1>
      <div v-if="loading">Loading photos...</div>
      <div v-else-if="photos && photos.length > 0">
        <PhotoCard
          v-for="photo in photos"
          :key="photo.id"
          :photo="photo"
          @photo-clicked="showPhotoDetail"
        />
      </div>
      <div v-else>
        No photos found for this album.
      </div>
    </div>
  </template>
  
  <script>
  import { useAlbumsStore } from '../store/albums';
  import PhotoCard from './PhotoCard.vue';
  import { ref, onMounted, watch } from 'vue';
  import { useRouter } from 'vue-router';
  
  export default {
    components: { PhotoCard },
    props: {
      id: {
        type: Number,
        required: true,
      },
    },
    setup(props) {
      const store = useAlbumsStore();
      const albumId = ref(props.id);
      const photos = ref([]);
      const loading = ref(false);
      const router = useRouter();
  
      const fetchPhotos = async (id) => {
        loading.value = true;
        try {
          await store.fetchPhotos(id);
          photos.value = store.photos[id] || [];
        } catch (error) {
          console.error('Error fetching photos:', error);
        } finally {
          loading.value = false;
        }
      };
  
      const showPhotoDetail = (photoId) => {
        router.push(`/photos/${photoId}`);
      };
  
      onMounted(() => {
        fetchPhotos(albumId.value);
      });
  
      watch(() => props.id, (newId) => {
        albumId.value = newId;
        fetchPhotos(newId);
      });
  
      return {
        albumId,
        photos,
        loading,
        showPhotoDetail,
      };
    },
  };
  </script>
  