const express = require("express");
const router = express.Router();
const middleware = require("./midd");

const { konsul, Kondisi, Jawaban } = require("../models");

// GET all konsul
router.get("/", middleware, async (req, res) => {
  try {
    const kons = await konsul.findAll({ include: Kondisi });
    res.json(kons);
  } catch (error) {
    console.error("Error:", error);
    res
      .status(500)
      .json({ error: "Terjadi kesalahan saat mengambil data konsul" });
  }
});

// GET a konsul by ID
router.get("/:id", middleware, async (req, res) => {
  let id = req.params.id;
  try {
    const kons = await konsul.findOne({ idkonsul: id, include: Kondisi });
    res.json(kons);
  } catch (error) {
    console.error("Error:", error);
    res
      .status(500)
      .json({ error: "Terjadi kesalahan saat mengambil data konsul" });
  }
});

// POST create a new konsul
router.post("", middleware, async (req, res) => {
  var model = req.body;
  model.tanggal = new Date();
  try {
    const kons = await konsul.create(model);
    for (let index = 0; index < model.Jawaban.length; index++) {
      const element = model.Jawaban[index];
      element.konsulId = kons.id;
      const j = await Jawaban.create(element);
    }

    res.json(kons);
  } catch (error) {
    if (error.name === "SequelizeDatabaseError") {
      res
        .status(400)
        .json({ error: "Data dengan kunci unik yang sama sudah ada." });
    } else {
      console.error("Error:", error);
      res
        .status(500)
        .json({ error: "Terjadi kesalahan saat menambah data konsul" });
    }
  }
});

// PUT update a konsul by ID
router.put("/:id", middleware, async (req, res) => {
  let id = req.params.id;
  var updatedModel = req.body;

  try {
    const result = await konsul.update(updatedModel, {
      where: { id: id },
    });

    if (result[0] === 1) {
      // Update successful
      res.json({ message: "Data konsul berhasil diperbarui." });
    } else {
      // No matching cat found
      res.status(404).json({ error: "Data konsul tidak ditemukan." });
    }
  } catch (error) {
    console.error("Error:", error);
    res
      .status(500)
      .json({ error: "Terjadi kesalahan saat memperbarui data konsul" });
  }
});

// DELETE a konsul by ID
router.delete("/:id", middleware, async (req, res) => {
  let id = req.params.id;

  try {
    const result = await konsul.destroy({
      where: { id: id },
    });

    if (result === 1) {
      // Delete successful
      res.json({ message: "Data konsul berhasil dihapus." });
    } else {
      // No matching cat found
      res.status(404).json({ error: "Data konsul tidak ditemukan." });
    }
  } catch (error) {
    console.error("Error:", error);
    res
      .status(500)
      .json({ error: "Terjadi kesalahan saat menghapus data konsul" });
  }
});

module.exports = router;
