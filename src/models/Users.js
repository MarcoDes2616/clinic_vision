const { DataTypes } = require("sequelize");
const sequelize = require("../utils/connection");
const bcrypt = require("bcrypt");

const Users = sequelize.define(
  "users",
  {
    firstname: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    lastname: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "12345678"
    },
    resetCode: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    passwordChangeAt: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    }
  },
  {
    timestamps: true,
    updatedAt: false,
  }
);

Users.prototype.toJSON = function () {
  const values = Object.assign({}, this.get());
  delete values.password;
  delete values.createdAt;
  delete values.resetCode;
  delete values.passwordChangeAt;  
  return values;
};

Users.beforeCreate(async (user) => {
  const hashedPassword = await bcrypt.hash(user.password, 10);
  user.password = hashedPassword;
});

module.exports = Users;
