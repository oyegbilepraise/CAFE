const { Sequelize } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define("product", {
    id: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    name: { type: DataTypes.STRING, require: false },
    description: { type: DataTypes.STRING, require: false },
    price: { type: DataTypes.INTEGER, require: false },
    status: { type: DataTypes.BOOLEAN, defaultValue: false },
  });

  return Product;
};
