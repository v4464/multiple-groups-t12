const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const sequelize = require('./util/database');
const userRoutes = require('./routes/user');
const groupRoutes = require('./routes/group');
const groupMemberRoutes = require('./routes/groupMember');
const messageRoutes = require('./routes/message');
const cors = require('cors');

const app = express();

dotenv.config();

app.use(cors({
    origin: "*",
    credentials: true,
})
);

app.use(bodyParser.json());

app.use('/user', userRoutes);
app.use('/group', groupRoutes);
app.use('/group-member', groupMemberRoutes);
app.use('/chat/message', messageRoutes);

app.use(express.static(path.join(__dirname, 'public')));

app.get('/signup.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'signup', 'signup.html'));
});

app.get('/login.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'login', 'login.html'));
});

app.get('/ChatApp/index.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'ChatApp', 'index.html'));
});

sequelize
.sync({force: false})
.then(() => {
app.listen(5000);
})
.catch(err => {
console.log(err);
});