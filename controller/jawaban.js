const express = require("express");
const router = express.Router();

const { Jawaban } = require("../models");

// GET all cat
router.get("/", async (req, res) => {
  try {
    const cats = await Jawaban.findAll();
    res.json(cats);
  } catch (error) {
    console.error("Error:", error);
    res
      .status(500)
      .json({ error: "Terjadi kesalahan saat mengambil data Jawaban" });
  }
});

// GET a cat by ID
router.get("/:id", async (req, res) => {
  let id = req.params.id;
  try {
    const cats = await Jawaban.findOne({ id: id });
    res.json(cats);
  } catch (error) {
    console.error("Error:", error);
    res
      .status(500)
      .json({ error: "Terjadi kesalahan saat mengambil data Jawaban" });
  }
});

// POST create a new cat
router.post("", async (req, res) => {
  var model = req.body;

  try {
    const cats = await Jawaban.create(model);
    res.json(cats);
  } catch (error) {
    if (error.name === "SequelizeDatabaseError") {
      res
        .status(400)
        .json({ error: "Data dengan kunci unik yang sama sudah ada." });
    } else {
      console.error("Error:", error);
      res
        .status(500)
        .json({ error: "Terjadi kesalahan saat menambah data Jawaban" });
    }
  }
});

// PUT update a car by ID
router.put("/:id", async (req, res) => {
  let id = req.params.id;
  var updatedModel = req.body;

  try {
    const result = await Cat.update(updatedModel, {
      where: { id: id },
    });

    if (result[0] === 1) {
      // Update successful
      res.json({ message: "Data car berhasil diperbarui." });
    } else {
      // No matching cat found
      res.status(404).json({ error: "Data cat tidak ditemukan." });
    }
  } catch (error) {
    console.error("Error:", error);
    res
      .status(500)
      .json({ error: "Terjadi kesalahan saat memperbarui data cat" });
  }
});

// DELETE a cat by ID
router.delete("/:id", async (req, res) => {
  let id = req.params.id;

  try {
    const result = await Jawaban.destroy({
      where: { id: id },
    });

    if (result === 1) {
      // Delete successful
      res.json({ message: "Data cat berhasil dihapus." });
    } else {
      // No matching cat found
      res.status(404).json({ error: "Data cat tidak ditemukan." });
    }
  } catch (error) {
    console.error("Error:", error);
    res
      .status(500)
      .json({ error: "Terjadi kesalahan saat menghapus data cat" });
  }
});

module.exports = router;
