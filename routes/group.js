const express = require('express');
const router = express.Router();
const groupController = require('../controllers/group');
const { authenticate } = require('../middleware/auth');


router.get('/', authenticate, groupController.getGroups);
router.get('/user', authenticate, groupController.getUserGroups);
router.post('/create', authenticate, groupController.createGroup);

module.exports = router;