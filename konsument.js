const express = require("express");
const app = express.Router();

app.get("/", async (req, res) => {
  try {
    const customers = await KonsumenMdl.findAll();
    res.json(customers);
  } catch (error) {
    console.error("Error:", error);
    res
      .status(500)
      .json({ error: "Terjadi kesalahan saat mengambil data konsumen" });
  }
});

app.get("/:id", async (req, res) => {
  let id = req.params.id;
  try {
    const customers = await KonsumenMdl.findOne({ idkonsument: id });
    res.json(customers);
  } catch (error) {
    console.error("Error:", error);
    res
      .status(500)
      .json({ error: "Terjadi kesalahan saat mengambil data konsumen" });
  }
});

app.post("", async (req, res) => {
  var model = req.body;

  try {
    const customers = await KonsumenMdl.create(model)
      .then((response) => {
        res.json(response);
      })
      .catch((err) => {
        console.error("Error:", err);
      });
  } catch (error) {
    console.error("Error:", error);
    res
      .status(500)
      .json({ error: "Terjadi kesalahan saat mengambil data konsumen" });
  }
});
