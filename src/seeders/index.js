const sequelize = require("../utils/connection");
const Users = require("../models/Users");
const Role = require("../models/Roles");
const Location = require("../models/Location");
const initModels = require('../models');
const Enlistment = require("../models/Enlistment");

const listed = [{name: "Med-Expert"}, {name: "Visión CC"}]
const role = [{ name: "S.Admin" }, { name: "Administrador" }, { name: "Profesional" }];


const location = [{name: "Batán", enlistmentId: 1}, {name: "Sur", enlistmentId: 1}, {name: "Colón", enlistmentId: 2}]

const users = [
  {
    firstname: "Marco",
    lastname: "Cardenas",
    email: "marco2616@gmail.com",
    roleId: 1,
  },
  {
    firstname: "Administrador del",
    lastname: "Sistema",
    email: "opticavision.info@gmail.com",
    roleId: 2,
  },
  {
    firstname: "Carlos",
    lastname: "Messier",
    email: "messiercarlos1@gmail.com",
    roleId: 1,
  },
];


async function seedCreate() {
  await Role.bulkCreate(role);
  await Enlistment.bulkCreate(listed)
  await Location.bulkCreate(location)
  await Users.bulkCreate(users);
}

// agregar force: true a la configuración de Sequelize
initModels()
sequelize
  .sync({ force: true })
  .then(async () => {
    await seedCreate();
    console.log("Seeding completed successfully.");
  })
  .catch((error) => {
    console.error("Error seeding database:", error);
  });
