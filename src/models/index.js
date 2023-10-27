const Users = require("./Users");
const Role = require("./Roles");

const initModels = () => {

  // roles 1 ----- * users
  Role.hasMany(Users, { foreignKey: "roleId" });
  Users.belongsTo(Role, { foreignKey: "roleId" });

  //Users 1 ------ 1 car
  

};

module.exports = initModels;