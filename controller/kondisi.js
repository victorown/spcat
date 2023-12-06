const express = require("express");
const router = express.Router();
const middleware = require("./midd");

const { Kondisi } = require("../models");

// GET all kondisi
router.get("/", middleware, async (req, res) => {
  try {
    const kond = await Kondisi.findAll();
    res.json(kond);
  } catch (error) {
    console.error("Error:", error);
    res
      .status(500)
      .json({ error: "Terjadi kesalahan saat mengambil data kondisi" });
  }
});

// GET a kondisi by ID
router.get("/:id", middleware, async (req, res) => {
  let id = req.params.id;
  try {
    const kond = await Kondisi.findOne({ idkondisi: id });
    res.json(kond);
  } catch (error) {
    console.error("Error:", error);
    res
      .status(500)
      .json({ error: "Terjadi kesalahan saat mengambil data kondisi" });
  }
});

// POST create a new kondisi
router.post("", middleware, async (req, res) => {
  var model = req.body;

  try {
    const kond = await Kondisi.create(model);
    res.json(kond);
  } catch (error) {
    if (error.name === "SequelizeDatabaseError") {
      res
        .status(400)
        .json({ error: "Data dengan kunci unik yang sama sudah ada." });
    } else {
      console.error("Error:", error);
      res
        .status(500)
        .json({ error: "Terjadi kesalahan saat menambah data kondisi" });
    }
  }
});

// PUT update a kondisi by ID
router.put("/:id", middleware, async (req, res) => {
  let id = req.params.id;
  var updatedModel = req.body;

  try {
    const result = await Kondisi.update(updatedModel, {
      where: { id: id },
    });

    if (result[0] === 1) {
      // Update successful
      res.json({ message: "Data kondisi berhasil diperbarui." });
    } else {
      // No matching cat found
      res.status(404).json({ error: "Data kondisi tidak ditemukan." });
    }
  } catch (error) {
    console.error("Error:", error);
    res
      .status(500)
      .json({ error: "Terjadi kesalahan saat memperbarui data kondisi" });
  }
});

// DELETE a kondisi by ID
router.delete("/:id", middleware, async (req, res) => {
  let id = req.params.id;

  try {
    const result = await Kondisi.destroy({
      where: { id: id },
    });

    if (result === 1) {
      // Delete successful
      res.json({ message: "Data kondisi berhasil dihapus." });
    } else {
      // No matching cat found
      res.status(404).json({ error: "Data kondisi tidak ditemukan." });
    }
  } catch (error) {
    console.error("Error:", error);
    res
      .status(500)
      .json({ error: "Terjadi kesalahan saat menghapus data kondisi" });
  }
});

module.exports = router;
