/**
 * SuperAdmin model
 * */
module.exports = (sequelize, DataTypes) =>
  sequelize.define('SuperAdmin', {
    id: {
      type: DataTypes.INTEGER,
      field: 'id',
      primaryKey: true,
      autoIncrement: true
    },
    firstName: {
      type: DataTypes.STRING,
      field: 'firstname'
    },
    lastName: {
      type: DataTypes.STRING,
      field: 'lastname'
    },
    password: {
      type: DataTypes.STRING,
      field: 'password'
    },
    email: {
      type: DataTypes.STRING,
      field: 'email'
    },
    phone: {
      type: DataTypes.INTEGER,
      field: 'phone'
    }
  });

