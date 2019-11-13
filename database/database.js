const { Sequelize, Model, DataTypes } = require('sequelize');
const conection = new Sequelize('estudosNode', 'root', '',{
    host: 'localhost',
    dialect: 'mariadb'
});

module.exports = conection;