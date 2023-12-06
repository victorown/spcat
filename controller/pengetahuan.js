const express = require("express");
const router = express.Router();
const middleware = require("./midd");

const { Pengetahuan } = require("../models");

// GET all Pengetahuan
router.get("/", middleware, async (req, res) => {
  try {
    const penge = await Pengetahuan.findAll();
    res.json(penge);
  } catch (error) {
    console.error("Error:", error);
    res
      .status(500)
      .json({ error: "Terjadi kesalahan saat mengambil data Pengetahuan" });
  }
});

// GET a Pengetahuan by ID
router.get("/:id", middleware, async (req, res) => {
  let id = req.params.id;
  try {
    const penge = await Pengetahuan.findOne({ idcat: id });
    res.json(penge);
  } catch (error) {
    console.error("Error:", error);
    res
      .status(500)
      .json({ error: "Terjadi kesalahan saat mengambil data Pengetahuan" });
  }
});

// POST create a new Pengetahuan
router.post("", middleware, async (req, res) => {
  var model = req.body;

  try {
    const penge = await Pengetahuan.create(model);
    res.json(penge);
  } catch (error) {
    if (error.name === "SequelizeDatabaseError") {
      res
        .status(400)
        .json({ error: "Data dengan kunci unik yang sama sudah ada." });
    } else {
      console.error("Error:", error);
      res
        .status(500)
        .json({ error: "Terjadi kesalahan saat menambah data Pengetahuan" });
    }
  }
});

// PUT update a Pengetahuan by ID
router.put("/:id", middleware, async (req, res) => {
  let id = req.params.id;
  var updatedModel = req.body;

  try {
    const result = await Pengetahuan.update(updatedModel, {
      where: { id: id },
    });

    if (result[0] === 1) {
      // Update successful
      res.json({ message: "Data Pengetahuan berhasil diperbarui." });
    } else {
      // No matching Pengetahuan found
      res.status(404).json({ error: "Data Pengetahuan tidak ditemukan." });
    }
  } catch (error) {
    console.error("Error:", error);
    res
      .status(500)
      .json({ error: "Terjadi kesalahan saat memperbarui data Pengetahuan" });
  }
});

// DELETE a Pengetahuan by ID
router.delete("/:id", middleware, async (req, res) => {
  let id = req.params.id;

  try {
    const result = await Pengetahuan.destroy({
      where: { id: id },
    });

    if (result === 1) {
      // Delete successful
      res.json({ message: "Data Pengetahuan berhasil dihapus." });
    } else {
      // No matching cat found
      res.status(404).json({ error: "Data Pengetahuan tidak ditemukan." });
    }
  } catch (error) {
    console.error("Error:", error);
    res
      .status(500)
      .json({ error: "Terjadi kesalahan saat menghapus data Pengetahuan" });
  }
});

module.exports = router;
