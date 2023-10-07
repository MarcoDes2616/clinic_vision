const Role = require("./Role");
const Users = require("./Users");

Role.hasMany(Users)
Users.belongsTo(Role)