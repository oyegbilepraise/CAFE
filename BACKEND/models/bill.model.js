const { Sequelize } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  const Bill = sequelize.define("bill", {
    id: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    name: { type: DataTypes.STRING, require: false },
    uuid: { type: DataTypes.STRING, require: false },
    paymentMethod: { type: DataTypes.STRING, require: false },
    total: { type: DataTypes.INTEGER, require: false },
    productDetails: { type: DataTypes.STRING, require: false },
    createdBy: { type: DataTypes.STRING, require: false },
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
    contactNumber: {
      type: DataTypes.STRING,
      required: true,
      trim: true,
    },
  });
  return Bill;
};