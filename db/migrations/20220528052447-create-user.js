'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      noKtp: {
        type: Sequelize.STRING,
        allowNull: false,
        constraint: 16
      },
      username: {
        type: Sequelize.STRING,
        allowNull: false,
        constraint: '15'
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      gender: {
        type: Sequelize.STRING,
        allowNull: false,
        constraint: "'pria','wanita'"
      },
      dateOfBirth: {
        type: Sequelize.DATE,
        allowNull: false
      },
      address: {
        type: Sequelize.STRING,
        allowNull: false
      },
      photoProfile: {
        type: Sequelize.STRING,
        allowNull: true
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false
      },
      encryptedPassword: {
        type: Sequelize.STRING,
        allowNull: false
      },
      roleId: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: "Roles",
          },
          key: "id",
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  }
};
