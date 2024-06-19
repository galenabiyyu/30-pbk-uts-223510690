import { defineStore } from 'pinia';
import axios from 'axios';

export const useAlbumsStore = defineStore('albums', {
  state: () => ({
    albums: [],
    photos: {},
    loading: false,
  }),
  actions: {
    async fetchAlbums() {
      this.loading = true;
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/albums');
        this.albums = response.data;
      } catch (error) {
        console.error('Error fetching albums:', error);
      } finally {
        this.loading = false;
      }
    },
    async fetchPhotos(albumId) {
      this.loading = true;
      try {
        const response = await axios.get(`https://jsonplaceholder.typicode.com/albums/${albumId}/photos`);
        this.photos = {
          ...this.photos,
          [albumId]: response.data,
        };
      } catch (error) {
        console.error('Error fetching photos:', error);
      } finally {
        this.loading = false;
      }
    },
  },
});
