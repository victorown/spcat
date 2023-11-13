"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Jawaban extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Jawaban.init(
    {
      pilihan: DataTypes.ENUM(
        "sangat tidak yakin",
        "tidak yakin",
        "sedikit yakin",
        "cukup yakin",
        "yakin",
        "sangat yakin"
      ),
      konsulId: DataTypes.INTEGER,
      KondisiId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Jawaban",
      timestamps: false,
    }
  );
  return Jawaban;
};
