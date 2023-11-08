const sequelize = require("../connect");
const { Sequelize, DataTypes } = require("sequelize");
//const sequelize = new Sequelize("mysql");

const Konsumen = sequelize.define("konsumen", {
  idkonsumen: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  nama: {
    type: DataTypes.STRING,
  },
  alamat: {
    type: DataTypes.STRING,
  },
  kontak: {
    type: DataTypes.STRING,
  },
  email: {
    type: DataTypes.STRING,
  },
});

console.log(Konsumen === sequelize.models.Konsumen);

module.exports = Konsumen;
