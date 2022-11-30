'use strict';

const { Op } = require("sequelize");
const bcrypt = require("bcryptjs");
const { Role } = require("../../app/models");

const noKtp = [
  "1218022302040069",
  "1218022302040070",
  "1218022302040071",
  "1218022302040072",
  "1218022302040073",
  "1218022302040074"
]

const username = [
  "fndys",
  "syah_",
  "anugrah_Tuhan",
  "middTopi",
  "jiTheNun",
  "Dng_DAacademy"
]

const name = [
  "Fendy",
  "Aisya",
  "Anugerah",
  "Midhat",
  "Jinan",
  "Danang"
]

const dateOfBirth = [
  "23-02-2002",
  "14-09-2002",
  "29-01-2002",
  "31-12-2002",
  "01-01-2002",
  "04-04-2002"
]

const gender = [
  "pria",
  "wanita",
  "pria",
  "pria",
  "pria",
  "pria"
]

const address = [
  "Jl. Kapten Tsubasa, Medan",
  "Jl. Merbabu, Surabaya",
  "Jl. Bebek, NTB",
  "Jl. Itik, Padang",
  "Jl. Kudanil, Jakarta",
  "Jl. Kucing, Yogjakarta"
]

module.exports = {
  async up (queryInterface, Sequelize) {
    const password = "c10bisa";
    const encryptedPassword = bcrypt.hashSync(password, 10);
    const timestamp = new Date();

    const role = await Role.findOne({
      where: {
        name: "Customer",
      }
    })

    await queryInterface.bulkInsert('Users', [{
      noKtp: noKtp[0],
      username: username[0],
      name: name[0],
      gender: gender[0],
      dateOfBirth: dateOfBirth[0],
      address: address[0],
      email: `${name[0].toLowerCase()}@binar.co.id`,
      encryptedPassword,
      roleId: role.id,
      createdAt: timestamp,
      updatedAt: timestamp
    },
    {
      noKtp: noKtp[1],
      username: username[1],
      name: name[1],
      gender: gender[1],
      dateOfBirth: dateOfBirth[1],
      address: address[1],
      email: `${name[1].toLowerCase()}@binar.co.id`,
      encryptedPassword,
      roleId: role.id,
      createdAt: timestamp,
      updatedAt: timestamp
    },
    {
      noKtp: noKtp[2],
      username: username[2],
      name: name[2],
      gender: gender[2],
      dateOfBirth: dateOfBirth[2],
      address: address[2],
      email: `${name[2].toLowerCase()}@binar.co.id`,
      encryptedPassword,
      roleId: role.id,
      createdAt: timestamp,
      updatedAt: timestamp
    },
    {
      noKtp: noKtp[3],
      username: username[3],
      name: name[3],
      gender: gender[3],
      dateOfBirth: dateOfBirth[3],
      address: address[3],
      email: `${name[3].toLowerCase()}@binar.co.id`,
      encryptedPassword,
      roleId: role.id,
      createdAt: timestamp,
      updatedAt: timestamp
    },
    {
      noKtp: noKtp[4],
      username: username[4],
      name: name[4],
      gender: gender[4],
      dateOfBirth: dateOfBirth[4],
      address: address[4],
      email: `${name[4].toLowerCase()}@binar.co.id`,
      encryptedPassword,
      roleId: role.id,
      createdAt: timestamp,
      updatedAt: timestamp
    },
    {
      noKtp: noKtp[5],
      username: username[5],
      name: name[5],
      gender: gender[5],
      dateOfBirth: dateOfBirth[5],
      address: address[5],
      email: `${name[5].toLowerCase()}@binar.co.id`,
      encryptedPassword,
      roleId: role.id,
      createdAt: timestamp,
      updatedAt: timestamp
    },
  ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
