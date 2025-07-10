const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const db = {};
const config = require('./config').development;

// Connection to Databsase
const sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  dialect: config.dialect,
  port: config.port,
  logging: config.logging
});

fs
  .readdirSync(__dirname)
  .filter(file => (
    file.indexOf('.') !== 0 &&
    file !== basename &&
    file.slice(-3) === '.js'
  ))
  .forEach(file => {
    const modelPath = path.join(__dirname, file);
    const modelFn = require(modelPath);

    if (typeof modelFn === 'function') {
      const model = modelFn(sequelize, Sequelize.DataTypes);
      db[model.name] = model;
    } else {
      console.warn(`⚠️ Le fichier ${file} n'exporte pas une fonction Sequelize. Ignoré.`);
    }
  });


Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
