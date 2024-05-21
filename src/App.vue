<template>
  <div id="app">
    <!-- Header -->
    <header>
      <nav>
        <ul>
          <li @click="showTodos">Todos</li>
          <li @click="showPosts">Posts</li>
        </ul>
      </nav>
    </header>

    <!-- Main Content -->
    <main>
      <div v-if="activeMenu === 'todos'">
        <!-- Fitur Todos -->
        <h2>Todos</h2>
        <div class="app">
          <h1>Aktivitas Hari Ini</h1>
          <div class="container">
            <input
              v-model="kegiatanBaru"
              @keyup.enter="tambahKegiatan"
              placeholder="Kegiatan apa yang akan kamu lakukan hari ini (Enter)"
              style="border: 2px solid black;"
            />
            <TodoList :todos="kegiatanList" @doneTodo="ubahStatusKegiatan" @deleteTodo="hapusKegiatan" />
            <div class="tampilan">
              <button @click="tampilkanBelumSelesai">Filter Belum Selesai</button>
              <button @click="tampilkanSemua">Tampilkan Semua</button>
            </div>
          </div>
        </div>
      </div>
      <div v-else-if="activeMenu === 'posts'">
        <!-- Fitur Postingan -->
        <h2>Postingan</h2>
        <select v-model="selectedUser">
          <option v-for="user in users" :key="user.id" :value="user.id">{{ user.name }}</option>
        </select>
        <div v-if="selectedUser">
          <div v-for="post in filteredPosts" :key="post.id">
            <h3>{{ post.title }}</h3>
            <p>{{ post.body }}</p>
          </div>
        </div>
        <div v-else>
          <p>Silakan pilih pengguna untuk melihat postingan mereka.</p>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import TodoList from './components/TodoList.vue'
import TodoItem from './components/TodoItem.vue';

const activeMenu = ref('todos');
const users = ref([]);
const posts = ref([]);
const selectedUser = ref(null);
const kegiatanBaru = ref('');
const kegiatanList = ref([{ nama: 'nugas', selesai: false, tampil: true }]);

const showTodos = () => {
  activeMenu.value = 'todos';
};

const showPosts = () => {
  activeMenu.value = 'posts';
};

const tambahKegiatan = () => {
  if (kegiatanBaru.value !== '') {
    kegiatanList.value.push({ nama: kegiatanBaru.value, selesai: false, tampil: true });
    kegiatanBaru.value = '';
  }
};

const hapusKegiatan = (index) => {
  kegiatanList.value.splice(index, 1);
};

const ubahStatusKegiatan = (index) => {
  kegiatanList.value[index].selesai = !kegiatanList.value[index].selesai;
};

const tampilkanBelumSelesai = () => {
  kegiatanList.value.forEach((kegiatan) => {
    kegiatan.tampil = !kegiatan.selesai;
  });
};

const tampilkanSemua = () => {
  kegiatanList.value.forEach((kegiatan) => (kegiatan.tampil = true));
};

onMounted(() => {
  // Ambil data user dari API
  fetch('https://jsonplaceholder.typicode.com/users')
    .then((response) => response.json())
    .then((data) => {
      users.value = data;
    });

  // Ambil data postingan dari API
  fetch('https://jsonplaceholder.typicode.com/posts')
    .then((response) => response.json())
    .then((data) => {
      posts.value = data;
    });
});

const filteredPosts = computed(() => {
  // Filter postingan berdasarkan user yang dipilih
  return posts.value.filter((post) => post.userId === parseInt(selectedUser.value));
});
</script>

<style scoped>
/* Styling for header and navigation */
header {
  background-color: #333;
  padding: 10px 0;
}
nav ul {
  display: flex;
  list-style: none;
  padding: 0;
  margin: 0;
  justify-content: center;
}
nav ul li {
  margin: 0 15px;
  padding: 10px 20px;
  cursor: pointer;
  color: white;
  font-weight: bold;
  border-radius: 5px;
  transition: background-color 0.3s;
}
nav ul li:hover,
nav ul li.active {
  background-color: #555;
}
nav ul li.active {
  background-color: #007bff;
}

/* General Styling */
body {
  font-family: Arial, sans-serif;
}
h1 {
  font-size: 24px;
  text-align: center;
  margin-bottom: 20px;
}
.container {
  width: 80%;
  margin: 0 auto;
}
input {
  width: calc(100% - 22px);
  padding: 10px;
  margin-bottom: 10px;
  border: 2px solid black;
  border-radius: 5px;
}
button {
  margin: 5px;
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
button:hover {
  background-color: #007bff;
  color: white;
}
.selesai {
  text-decoration: line-through;
}
.tampilan {
  margin-top: 20px;
}
</style>
