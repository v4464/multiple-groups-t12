const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const GroupMember = sequelize.define('GroupMember', {
  group_id: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  user_id: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
}, {
  timestamps: true
});

module.exports = GroupMember;