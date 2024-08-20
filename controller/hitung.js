const express = require("express");
const router = express.Router();
const helper = require("./helper");
const { Cat, Kondisi } = require("../models");

router.post("", async (req, res) => {

  var model = req.body;

  try {
    const hasil = await perhitungan(model);
    res.json(hasil);
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

let perhitungan = async (jawaban) => {
  let odds = [];
  let hasils = [];

  if (!Array.isArray(jawaban)) {
    throw new Error("Input 'jawaban' harus berupa array");
  }

  try {
    var cats = await Cat.findAll({ include: Kondisi });

    cats.forEach((cat) => {
      let odd = 0;
      let lastIndex = 0;
      // let gIndexes = [];

      for (let index = 0; index < cat.Kondisis.length; index++) {
        let g = cat.Kondisis[index];
        let bobot = 0;

        let jawab = jawaban.find(x => x.code === g.kode);
        if (jawab) {
          bobot = helper.getValueOfPilihan(jawab.pilihan);
        }

        // let gIndex = g.Pengetahuan.cf * bobot;
        // gIndexes.push(gIndex);

        if (index === 0) {
          lastIndex = bobot;
        } else if (index === 1) {
          odd = lastIndex + bobot * (1 - lastIndex);
        } else {
          odd = odd + bobot * (1 - odd);
        }

      }

      odds.push(odd);
      hasils.push({ cat, odd });
    });
  } catch (err) {
    console.error("Error in perhitungan: ", err);
    throw err;
  }

  return hasils;
};

module.exports = router;
