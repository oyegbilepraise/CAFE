const dbConfig = require("../config/dbConfig.js");

const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialet,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Connected...");
  })
  .catch((err) => {
    console.log("err" + err);
  });

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require("../models/user.model")(sequelize, DataTypes);
db.category = require("../models/category.model")(sequelize, DataTypes);
db.product = require("../models/product.model")(sequelize, DataTypes);

db.category.hasMany(db.product);
db.product.belongsTo(db.category);

db.sequelize
  .sync({
    force: true,
  })
  .then(() => {
    console.log("yes re-sync done!");
  });

module.exports = db;
