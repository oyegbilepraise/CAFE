const { Sequelize } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define("category", {
    id: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    name: { type: DataTypes.STRING, require: false },
  });

  return Category;
};
