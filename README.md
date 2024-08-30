# Sistem Pakar Pemilihan Jenis Cat Eksterior

Sistem ini adalah aplikasi sistem pakar yang dirancang untuk membantu pengguna dalam memilih jenis cat eksterior yang sesuai menggunakan metode **Certainty Factor**. Sistem ini dibangun menggunakan **Express.js** untuk sisi server dan **Vue.js** untuk sisi client, memberikan antarmuka yang responsif dan mudah digunakan.

## Teknologi yang Digunakan

- **Express.js**: Digunakan untuk membangun backend aplikasi yang menyediakan API dan logika pemrosesan data.
- **Vue.js**: Digunakan untuk membangun frontend aplikasi yang interaktif dan dinamis.
- **Certainty Factor**: Metode yang digunakan untuk menghitung tingkat kepastian dalam pengambilan keputusan berdasarkan nilai kepastian pengguna terhadap kondisi eksterior rumah yang diinput oleh pengguna.

## Fitur Utama

- **Pemilihan Cat Berdasarkan Kondisi Eksterior**: Pengguna dapat memasukkan nilai tingkat keyakinanya terhadap kondisi eksterior rumah, untuk mendapatkan rekomendasi jenis cat yang paling sesuai.
- **Antarmuka Pengguna yang Responsif**: Dibangun dengan Vue.js, aplikasi ini menawarkan pengalaman pengguna yang mulus dan responsif di berbagai perangkat.
- **Pengambilan Keputusan Berbasis Certainty Factor**: Menggunakan metode Certainty Factor untuk memberikan rekomendasi dengan tingkat kepercayaan tertentu berdasarkan input yang diberikan oleh pengguna.

## Cara Menggunakan

1. **Kloning repositori**:

   ```bash
   git clone https://github.com/victorown/spcat.git
   ```
3. **Install dependencies untuk server dan client:** 

   ```bash
   npm install
   ```
4. **Jalankan Aplikasi:**

   ```bash
   bun run index.js
   ```



