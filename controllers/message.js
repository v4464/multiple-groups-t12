const Message = require('../models/Message');
const GroupMember = require('../models/GroupMember');

module.exports = {
    getMessagesByGroup: async (req, res) => {
        const { groupId } = req.params;
        const userId = req.user.userid;

        try {
            const isMember = await GroupMember.findOne({
                where: { group_id: groupId, user_id: userId }
            });

            if (!isMember) {
                return res.status(403).json({ error: 'Access denied' });
            }

            const messages = await Message.findAll({
                where: { group_id: groupId },
                order: [['createdAt', 'ASC']]
            });
            res.status(200).json(messages);
        } catch (err) {
            console.error(`Error fetching messages for group ${groupId}:`, err);
            res.status(500).json({ error: 'Internal server error' });
        }
    },

    createMessage: async (req, res) => {
        const { group_id, content } = req.body;
        const user_id = req.user.userid;

        try {
            const isMember = await GroupMember.findOne({
                where: { group_id, user_id }
            });

            if (!isMember) {
                return res.status(403).json({ error: 'Access denied' });
            }

            const newMessage = await Message.create({
                group_id,
                user_id,
                content
            });
            res.status(201).json(newMessage);
        } catch (err) {
            console.error('Error creating message:', err);
            res.status(500).json({ error: 'Internal server error' });
        }
    },
};