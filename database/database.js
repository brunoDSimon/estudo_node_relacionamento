const { Sequelize, Model, DataTypes } = require('sequelize');
const conection = new Sequelize('estudosNode', 'root', '',{
    host: 'localhost',
    dialect: 'mysql',
    timezone: "-03:00"
});

module.exports = conection;