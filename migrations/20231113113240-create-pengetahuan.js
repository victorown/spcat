"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Pengetahuans", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      cf: {
        type: Sequelize.DOUBLE,
      },
      catId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        reference: {
          model: "cats",
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
    await queryInterface.dropTable("Pengetahuans");
  },
};
