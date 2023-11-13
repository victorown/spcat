"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class konsul extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Kondisi }) {
      this.belongsToMany(Kondisi, {
        through: "Jawaban",
        foreignKey: "konsulId",
        onDelete: "CASCADE",
      });
    }
  }
  konsul.init(
    {
      tanggal: DataTypes.DATE,
      konsumenId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "konsul",
      timestamps: false,
    }
  );
  return konsul;
};
