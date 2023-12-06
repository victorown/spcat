const express = require("express");
const router = express.Router();

const { Cat, Kondisi } = require("../models");

// GET all cat
router.get("/", middleware, async (req, res) => {
  try {
    const cats = await Cat.findAll({ include: Kondisi });
    res.json(cats);
  } catch (error) {
    console.error("Error:", error);
    res
      .status(500)
      .json({ error: "Terjadi kesalahan saat mengambil data cat" });
  }
});

// GET a cat by ID
router.get("/:id", middleware, async (req, res) => {
  let id = req.params.id;
  try {
    const cats = await Cat.findOne({ idcat: id });
    res.json(cats);
  } catch (error) {
    console.error("Error:", error);
    res
      .status(500)
      .json({ error: "Terjadi kesalahan saat mengambil data cat" });
  }
});

// POST create a new cat
router.post("", middleware, async (req, res) => {
  var model = req.body;

  try {
    const cats = await Cat.create(model);
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
        .json({ error: "Terjadi kesalahan saat menambah data cat" });
    }
  }
});

// PUT update a car by ID
router.put("/:id", middleware, async (req, res) => {
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
router.delete("/:id", middleware, async (req, res) => {
  let id = req.params.id;

  try {
    const result = await Cat.destroy({
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
