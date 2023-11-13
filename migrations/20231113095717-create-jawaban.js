"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Jawabans", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      pilihan: {
        type: Sequelize.ENUM(
          "sangat tidak yakin",
          "tidak yakin",
          "sedikit yakin",
          "cukup yakin",
          "yakin",
          "sangat yakin"
        ),
      },
      konsulId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        reference: {
          model: "konsuls",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
      kondisiId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        reference: {
          model: "kondisis",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Jawabans");
  },
};
