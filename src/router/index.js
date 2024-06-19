import { createRouter, createWebHistory } from 'vue-router';
import Todos from '../components/Todos.vue';
import Posts from '../components/Posts.vue';
import Albums from '../components/Albums.vue';
import AlbumPhotos from '../components/AlbumPhotos.vue';
import PhotoDetail from '../components/PhotoDetail.vue';

const routes = [
  { path: '/todos', component: Todos },
  { path: '/posts', component: Posts },
  { path: '/albums', component: Albums },
  { path: '/albums/:id', component: AlbumPhotos, props: true },
  { path: '/photos/:id', component: PhotoDetail, props: route => ({ id: Number(route.params.id) }) },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
