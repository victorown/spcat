const express = require("express");
const app = express();
app.use(express.json());

const konsumenRouter = require("./controller/konsument");
const catRouter = require("./controller/cat");
const kondisiRouter = require("./controller/kondisi");
const konsulRouter = require("./controller/konsul");
const jawabanRouter = require("./controller/jawaban");
const pengetahuanRouter = require("./controller/pengetahuan");

app.use("/api/konsumen", konsumenRouter);
app.use("/api/cat", catRouter);
app.use("/api/kondisi", kondisiRouter);
app.use("/api/konsul", konsulRouter);
app.use("/api/jawaban", jawabanRouter);
app.use("/api/pengetahuan", pengetahuanRouter);

app.listen(3000, () => {
  console.log(`Server berjalan di http://localhost:3000`);
});
