const Sequelize = require('sequelize');

const sequelize = new Sequelize('spa', '', '', {
    dialect: 'sqlite',
    storage: 'spa.db'
  })
  const Data = sequelize.define('data', {
    // attributes
    university: {
      type: Sequelize.TEXT,
      allowNull: false,
      
    },
    cipher: {
      type: Sequelize.TEXT,
      allowNull: false
    },
    prof: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      doc: {
        type: Sequelize.TEXT,
        allowNull: false
      }, 
      proc: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      stat: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      akred: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      date: {
        type: Sequelize.TEXT,
        allowNull: false
      },
  }, {
    timestamps : false
  });
  Data.sync();

  module.exports = {Data};