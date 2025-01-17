const sequelize = require("../utils/connection");
const Users = require("../models/Users");
const Role = require("../models/Roles");
const Location = require("../models/Location");
const Sponsorship = require("../models/Sponsorship");
const initModels = require('../models');

const role = [{ name: "S.Admin" }, { name: "Administrador" }, { name: "Profesional" }];

const sponsor = [{sponsor: "Med-Expert"}, {sponsor: "Visión CC"}]

const location = [{name: "Batán", sponsorshipId: 1}, {name: "Sur", sponsorshipId: 1}, {name: "Colón", sponsorshipId: 2}]

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
  await Location.bulkCreate(location)
  await Sponsorship.bulkCreate(sponsor)
  await Users.bulkCreate(users);
}

// agregar force: true a la configuración de Sequelize
initModels()
sequelize
  .sync({ force: true })
  .then(async () => {
    // console.log('Seeding database...');
    await seedCreate();
    console.log("Seeding completed successfully.");
  })
  .catch((error) => {
    console.error("Error seeding database:", error);
  });
