const Sequelize = require('sequelize');
const sequelize = require('../util/database');
const GroupMember = require('./GroupMember');

const Group = sequelize.define('Group', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  created_by: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
}, {
  timestamps: true
});

Group.hasMany(GroupMember, { foreignKey: 'group_id', sourceKey: 'id' });

module.exports = Group;