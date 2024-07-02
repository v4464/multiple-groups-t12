const Group = require('../models/Group');
const GroupMember = require('../models/GroupMember');
const User = require('../models/users');


module.exports = {
    getGroups: async (req, res) => {
        try {
            const groups = await Group.findAll();
            res.status(200).json(groups)
        } catch (err) {
            console.error('Error fetching groups:', err);
            res.status(500).json({ error: 'Internal server error' });
        }
    },

    getUserGroups: async (req, res) => {
        try {
            console.log('User in getUserGroups:', req.user);
            const userId = req.user.userid;
            if (!userId) {
                throw new Error('User ID is undefined');
            }
            const groups = await Group.findAll({
                include: {
                    model: GroupMember,
                    where: { user_id: userId }
                }
            });
            console.log('Groups fetched for user:', groups);
            res.status(200).json(groups); 
        } catch (err) {
            console.error('Error fetching user groups:', err);
            res.status(500).json({ error: 'Internal server error' });
        }
    },

    createGroup: async (req, res) => {
        const { name, userEmails } = req.body
        console.log('Creating group with user:', req.user); 
        try {
            const newGroup = await Group.create({
                name,
                created_by: req.user.userid
            });

            const members = await User.findAll({
                where: { email: userEmails }
            });

            await Promise.all(members.map(member =>
                GroupMember.create({
                    group_id: newGroup.id,
                    user_id: member.id
                })
            ));

            res.status(201).json(newGroup);
        } catch(err) {
            console.error('Error creating group:', err);
            res.status(500).json({ error: 'Internal server error' });
        }
    },
};