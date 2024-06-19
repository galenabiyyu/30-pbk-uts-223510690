<template>
    <div>
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
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import TodoList from '../components/TodoList.vue';
  
  const kegiatanBaru = ref('');
  const kegiatanList = ref([{ nama: 'nugas', selesai: false, tampil: true }]);
  
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
  </script>
  
  <style scoped>
  /* Add your styling here */
  </style>
  