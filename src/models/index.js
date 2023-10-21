const Role = require("./Roles");
const Users = require("./Users");

Role.hasMany(Users)
Users.belongsTo(Role)