const sequelize = require('../utils/connection');
// const Category = require('../models/Category');
const Users = require('../models/Users');
const Role = require('../models/Roles');
require("../models")

const categories = [
    {name: "Destacados"}, {name: "Viniles"}, {name: "Cintas"}, 
    {name: "Apliques"}, {name: "Decorables"}, {name: "Herramientas"}, 
    {name: "Creaciones"}
  ]



const users = [
  { firstname: "Marco", lastname: 'Cardenas', email: 'marco2616@gmail.com', 
  password: "12345678", roleId: 1, isVerified: true }]

const role = [
  {name: "s admin"}, {name: "admin"}, {name: "profesional"}
]


async function seedCreate() {
    await Role.bulkCreate(role)
    // await Category.bulkCreate(categories)
    await Users.bulkCreate(users);
}


// agregar force: true a la configuración de Sequelize
sequelize.sync({ force: true }).then(async () => {
  // console.log('Seeding database...');
  await seedCreate();
  console.log('Seeding completed successfully.');
}).catch((error) => {
  console.error('Error seeding database:', error);
});

