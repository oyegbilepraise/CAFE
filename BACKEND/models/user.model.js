const { Sequelize } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("users", {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      required: false,
      unique: true,
      lowercase: true,
      validate: (value) => {
        if (!validator.isEmail(value)) {
          throw new Error({ error: "Invalid Email address" });
        }
      },
    },
    name: {
      type: DataTypes.STRING,
      required: true,
      trim: true,
    },
    contactNumber: {
      type: DataTypes.STRING,
      required: true,
      trim: true,
    },
    password: { type: DataTypes.STRING, required: false },
    status: { type: DataTypes.BOOLEAN, defaultValue: false, },
    role: { type: DataTypes.STRING, required: false },
  });

  return User;
};
