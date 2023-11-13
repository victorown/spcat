"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Cat extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Kondisi }) {
      this.belongsToMany(Kondisi, {
        through: "Pengetahuan",
        foreignKey: "catId",
        onDelete: "CASCADE",
      });
    }
  }
  Cat.init(
    {
      kode: DataTypes.STRING,
      nama: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Cat",
      timestamps: false,
    }
  );
  return Cat;
};
