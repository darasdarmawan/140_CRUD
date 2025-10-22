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


