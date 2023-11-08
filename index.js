const express = require("express");
const app = express();
app.use(express.json());

const connection = require("./connect");
const KonsumenMdl = require("./models/konsumenModel");
const konsumenRouter = require("./konsument");

app.use("/api/konsumen", konsumenRouter);

app.listen(3000, () => {
  console.log(`Server berjalan di http://localhost:3000`);
});
