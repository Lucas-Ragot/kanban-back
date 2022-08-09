// ici je fais du destructuring, cela consiste à extraires les propriétés d'un objet dans des constantes
const { Model, DataTypes } = require("sequelize");
// ça revient au même que :
// const sequelize = require('sequelize');
// const Model = sequelize.Model;
// const DataTypes = sequelize.DataTypes;
const sequelize = require('../database');

class List extends Model {}

List.init({
  name: DataTypes.TEXT,
  position: DataTypes.SMALLINT,
}, {
  sequelize,
  tableName: 'list',
});

module.exports = List;