"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Konsumen extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */

    static associate({ konsul }) {
      this.hasMany(konsul, {
        foreignKey: "konsumenId",
        onDelete: "CASCADE",
      });
    }
  }
  Konsumen.init(
    {
      namaKonsumen: DataTypes.STRING,
      alamat: DataTypes.STRING,
      kontak: DataTypes.STRING,
      email: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Konsumen",
      timestamps: false,
    }
  );
  return Konsumen;
};
