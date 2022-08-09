const { Model, DataTypes } = require("sequelize");
const sequelize = require('../database');

class Label extends Model {}

Label.init({
  title: DataTypes.TEXT,
  color: DataTypes.TEXT,
}, {
  sequelize,
  tableName: 'label',
});

module.exports = Label;