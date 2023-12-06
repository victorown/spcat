"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Pengetahuan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Pengetahuan.init(
    {
      cf: DataTypes.DOUBLE,
      catId: DataTypes.INTEGER,
      KondisiId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Pengetahuan",
      timestamps: false,
    }
  );
  return Pengetahuan;
};
