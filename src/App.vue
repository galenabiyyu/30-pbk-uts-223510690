<template>
  <div class="app">
    
    <h1>Aktivitas Hari Ini</h1>
    <div class="container">
    <input v-model="kegiatanBaru" @keyup.enter="tambahKegiatan" placeholder="Kegiatan apa yang akan kamu lakukan harini   (Enter)" style="border: 2px solid black;"/>
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
</template>


<script>
export default {
  data() {
    return {
      kegiatanBaru: '',
      kegiatanList: [
        { nama: 'nugas', selesai: false, tampil: true },
      ],
    };
  },
  methods: {
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
};
</script>
