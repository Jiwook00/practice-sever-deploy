'use strict';

const crypto = require('crypto');

module.exports = (sequelize, DataTypes) => {
  const users = sequelize.define(
    'users',
    {
      email: DataTypes.STRING,
      username: DataTypes.STRING,
      password: DataTypes.STRING
    },
    {
      hooks: {
        beforeCreate: (data) => {
          if (data.dataValues.password.length) {
            const secret = '@codestates';
            const hash = crypto.createHmac('sha256', secret)
              .update(data.dataValues.password)
              .digest('hex');
            data.dataValues.password = hash;
            // console.log("after hash:", data);
          }
        }
      }
    }
  );

  users.associate = function (models) {
    // associations can be defined here
  };
  return users;
};
