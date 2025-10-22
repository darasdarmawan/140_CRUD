const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 3000;
const app = express();


app.use(bodyParser.json());

// Koneksi ke database MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  port: '3309',
  password: 'Ayah.280270*',
  database: 'mahasiswa'
});

db.connect((err) => {
  if (err) {
    console.error('❌ Error connecting to MySQL:', err);
    return;
  }
  console.log('✅ Connected to MySQL successfully');
});


// ✅ 1️⃣ GET - Ambil semua data biodata
app.get('/biodata', (req, res) => {
  const sql = 'SELECT * FROM biodata';
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error fetching data:', err);
      res.status(500).send('Terjadi kesalahan saat mengambil data');
      return;
    }
    res.json(results);
  });
});

// ✅ 2️⃣ POST - Tambahkan data baru
app.post('/biodata', (req, res) => {
  const { nama, alamat, agama } = req.body;

  if (!nama || !alamat || !agama) {
    return res.status(400).send('Nama, alamat, dan agama wajib diisi');
  }

  const sql = 'INSERT INTO biodata (nama, alamat, agama) VALUES (?, ?, ?)';
  db.query(sql, [nama, alamat, agama], (err, result) => {
    if (err) {
      console.error('Error inserting data:', err);
      res.status(500).send('Gagal menambahkan data');
      return;
    }
    res.status(201).send(`Data berhasil ditambahkan dengan ID: ${result.insertId}`);
  });
});

// ✅ 3️⃣ PUT - Update data berdasarkan ID
app.put('/biodata/:id', (req, res) => {
  const { id } = req.params;
  const { nama, alamat, agama } = req.body;

  if (!nama || !alamat || !agama) {
    return res.status(400).send('Nama, alamat, dan agama wajib diisi');
  }

  const sql = 'UPDATE biodata SET nama = ?, alamat = ?, agama = ? WHERE id = ?';
  db.query(sql, [nama, alamat, agama, id], (err, result) => {
    if (err) {
      console.error('Error updating data:', err);
      res.status(500).send('Gagal mengupdate data');
      return;
    }

    if (result.affectedRows === 0) {
      return res.status(404).send('Data dengan ID tersebut tidak ditemukan');
    }

    res.send('Data berhasil diupdate');
  });
});

// ✅ 4️⃣ DELETE - Hapus data berdasarkan ID
app.delete('/biodata/:id', (req, res) => {
  const { id } = req.params;

  const sql = 'DELETE FROM biodata WHERE id = ?';
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error('Error deleting data:', err);
      res.status(500).send('Gagal menghapus data');
      return;
    }

    if (result.affectedRows === 0) {
      return res.status(404).send('Data dengan ID tersebut tidak ditemukan');
    }

    res.send('Data berhasil dihapus');
  });
});

// Root route
app.get('/', (req, res) => {
  res.send('Server Express.js dengan MySQL sudah berjalan 🚀');
});

// Jalankan server
app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});


