const express = require("express");
const app = express();
app.use(express.json());

const konsumenRouter = require("./controller/konsument");
const catRouter = require("./controller/cat");
const kondisiRouter = require("./controller/kondisi");
const konsulRouter = require("./controller/konsul");
const jawabanRouter = require("./controller/jawaban");
const pengetahuanRouter = require("./controller/pengetahuan");
const loginRouter = require("./controller/login");
const hitungRouter = require("./controller/hitung");

app.use("/api/konsumen", konsumenRouter);
app.use("/api/cat", catRouter);
app.use("/api/kondisi", kondisiRouter);
app.use("/api/konsul", konsulRouter);
app.use("/api/jawaban", jawabanRouter);
app.use("/api/pengetahuan", pengetahuanRouter);
app.use("/api/login", loginRouter);
app.use("/api/hitung", hitungRouter);

app.use(express.static("client"));

app.get('/admin/dashboard', (req, res) => {
  res.sendFile(__dirname + '/client/view/dashboard.html');
});

app.get('/admin/cat', (req, res) => {
  res.sendFile(__dirname + '/client/view/cat.html');
});

app.get('/admin/kondisi', (req, res) => {
  res.sendFile(__dirname + '/client/view/kondisi.html');
});

app.get('/admin/pengetahuan', (req, res) => {
  res.sendFile(__dirname + '/client/view/pengetahuan.html');
});

app.get('/admin/riwayat', (req, res) => {
  res.sendFile(__dirname + '/client/view/riwayat.html');
});

app.get('/login', (req, res) => {
  res.sendFile(__dirname + '/client/view/login.html');
});

app.get('/konsul', (req, res) => {
  res.sendFile(__dirname + '/client/view/konsul.html');
});


app.listen(3000, () => {
  console.log(`Server berjalan di http://localhost:3000`);
});
