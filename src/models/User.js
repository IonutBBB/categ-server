/**
 * Created by mariuspotor on 17/10/16.
 */
/**
 * User model
 * */
module.exports = (sequelize, DataTypes) =>
  sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      field: 'id',
      primaryKey: true,
      autoIncrement: true
    },
    googleid: {
      type: DataTypes.INTEGER,
      field: 'googleid'
    },
    firstname: {
      type: DataTypes.STRING,
      field: 'firstname'
    },
    lastname: {
      type: DataTypes.STRING,
      field: 'lastname'
    },
    email: {
      type: DataTypes.STRING,
      field: 'email'
    },
    photo: {
      type: DataTypes.STRING,
      field: 'photo'
    },
    pushNotificationToken: {
      type: DataTypes.TEXT('long'),
      field: 'pushNotificationToken'
    },
    status: {
      type: DataTypes.STRING,
      field: 'status'
    },
    statusMessage: {
      type: DataTypes.STRING,
      field: 'statusMessage'
    }
    
  });

