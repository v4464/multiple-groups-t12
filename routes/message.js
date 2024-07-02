const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const Message = sequelize.define('Message', {
  group_id: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  user_id: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  content: {
    type: Sequelize.TEXT,
    allowNull: false
  }
}, {
  timestamps: true
});

module.exports = Message;