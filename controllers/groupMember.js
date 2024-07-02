const GroupMember = require('../models/GroupMember');

module.exports = {
  joinGroup: async (req, res) => {
    const { group_id, user_id } = req.body;
    try {
      const newMember = await GroupMember.create({
        group_id,
        user_id
      });
      res.status(201).json(newMember);
    } catch (err) {
      console.error('Error joining group:', err);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  leaveGroup: async (req, res) => {
    const { groupId, userId } = req.params;
    try {
      await GroupMember.destroy({
        where: {
          group_id: groupId,
          user_id: userId
        }
      });
      res.json({ message: 'Left group successfully' });
    } catch (err) {
      console.error('Error leaving group:', err);
      res.status(500).json({ error: 'Internal server error' });
    }
  },
};