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
        <!-- Tambahkan kode todos di sini -->
        <div class="app">
          <h1>Aktivitas Hari Ini</h1>
          <div class="container">
            <input v-model="kegiatanBaru" @keyup.enter="tambahKegiatan" placeholder="Kegiatan apa yang akan kamu lakukan hari ini (Enter)" style="border: 2px solid black;"/>
            <ul>
              <li v-for="(kegiatan, index) in kegiatanList" :key="index" v-show="kegiatan.tampil !== false">
                <input type="checkbox" v-model="kegiatan.selesai" @change="ubahStatusKegiatan(index)">
                <span :class="{ 'selesai': kegiatan.selesai }" :style="{'text-decoration': kegiatan.selesai ? 'line-through' : 'none'}">{{ kegiatan.nama }}</span>
                <button @click="ubahStatusKegiatan(index)">
                  {{ kegiatan.selesai ? 'Belum Selesai' : 'Selesai' }}
                </button>
                <button @click="hapusKegiatan(index)">Batal</button>
              </li>
            </ul>
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

<script>
export default {
  name: 'App',
  data() {
    return {
      activeMenu: 'todos',
      users: [],
      posts: [],
      selectedUser: null,
      kegiatanBaru: '',
      kegiatanList: [
        { nama: 'nugas', selesai: false, tampil: true },
      ],
    };
  },
  methods: {
    showTodos() {
      this.activeMenu = 'todos';
    },
    showPosts() {
      this.activeMenu = 'posts';
    },
    tambahKegiatan() {
      if (this.kegiatanBaru !== '') {
        this.kegiatanList.push({ nama: this.kegiatanBaru, selesai: false, tampil: true });
        this.kegiatanBaru = '';
      }
    },
    hapusKegiatan(index) {
      this.kegiatanList.splice(index, 1);
    },
    ubahStatusKegiatan(index) {
      this.kegiatanList[index].selesai = !this.kegiatanList[index].selesai;
    },
    tampilkanBelumSelesai() {
      this.kegiatanList.forEach((kegiatan) => {
        kegiatan.tampil = !kegiatan.selesai;
      });
    },
    tampilkanSemua() {
      this.kegiatanList.forEach((kegiatan) => (kegiatan.tampil = true));
    },
  },
  mounted() {
    // Ambil data user dari API
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(data => {
        this.users = data;
      });

    // Ambil data postingan dari API
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(response => response.json())
      .then(data => {
        this.posts = data;
      });
  },
  computed: {
    filteredPosts() {
      // Filter postingan berdasarkan user yang dipilih
      return this.posts.filter(post => post.userId === parseInt(this.selectedUser));
    }
  }
};
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
