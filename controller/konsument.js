const express = require("express");
const router = express.Router();

const { Konsumen, konsul, Kondisi } = require("../models");

// GET all konsumen
router.get("/", async (req, res) => {
  try {
    const customers = await Konsumen.findAll({ include: [{ model: konsul, include: [Kondisi] }] });
    res.json(customers);
  } catch (error) {
    console.error("Error:", error);
    res
      .status(500)
      .json({ error: "Terjadi kesalahan saat mengambil data konsumen" });
  }
});

// GET a konsumen by ID
router.get("/:id", async (req, res) => {
  let id = req.params.id;
  try {
    const customers = await Konsumen.findOne({ idkonsument: id });
    res.json(customers);
  } catch (error) {
    console.error("Error:", error);
    res
      .status(500)
      .json({ error: "Terjadi kesalahan saat mengambil data konsumen" });
  }
});

// POST create a new konsumen
router.post("", async (req, res) => {
  var model = req.body;

  try {
    const customers = await Konsumen.create(model);
    res.json(customers);
  } catch (error) {
    if (error.name === "SequelizeUniqueConstraintError") {
      res
        .status(400)
        .json({ error: "Data dengan kunci unik yang sama sudah ada." });
    } else {
      console.error("Error:", error);
      res
        .status(500)
        .json({ error: "Terjadi kesalahan saat menambah data konsumen" });
    }
  }
});

// PUT update a konsumen by ID
router.put("/:id", async (req, res) => {
  let id = req.params.id;
  var updatedModel = req.body;

  try {
    const result = await Konsumen.update(updatedModel, {
      where: { id: id },
    });

    if (result[0] === 1) {
      // Update successful
      res.status(200).json({ message: "Data konsumen berhasil diperbarui." });
    } else {
      // No matching konsumen found
      res.status(404).json({ error: "Data konsumen tidak ditemukan." });
    }
  } catch (error) {
    console.error("Error:", error);
    res
      .status(500)
      .json({ error: "Terjadi kesalahan saat memperbarui data konsumen" });
  }
});

// DELETE a konsumen by ID
router.delete("/:id", async (req, res) => {
  let id = req.params.id;

  try {
    const result = await Konsumen.destroy({
      where: { id: id },
    });

    if (result === 1) {
      // Delete successful
      res.json({ message: "Data konsumen berhasil dihapus." });
    } else {
      // No matching konsumen found
      res.status(404).json({ error: "Data konsumen tidak ditemukan." });
    }
  } catch (error) {
    console.error("Error:", error);
    res
      .status(500)
      .json({ error: "Terjadi kesalahan saat menghapus data konsumen" });
  }
});

module.exports = router;
