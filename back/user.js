var express = require('express')
var jwt = require('jsonwebtoken');

var router = express.Router();

const users = {};
const korisnici = []

const admin = ["pero", "6377"];

var trenutniUser;

router.get('/', (req, res) => {
    return res.status(200).json(users);
});

router.post('/login', (req, res) => {
    var user = req.body;
    if (users[user.username] && users[user.username] === user.password) {
        trenutniUser = user;
        // pincode = Math.floor(Math.random() * 1000)
        // console.log(pincode)
        res.json({
            // pin: pincode,
            msg: 'Successfully logged in',
            token: jwt.sign({ user: user.username }, 'SECRET'),
            trenutniUser: trenutniUser,


        });
    } else {
        res.json({ msg: 'Invalide username or password' });
    }
});

router.post('/register', (req, res) => {
    var user = req.body;
    if (users[user.username]) {
        res.json({ msg: 'User already exists, please login.' });
    } else {
        users[user.username] = user.password;
        res.json({
            msg: 'Successfully created user, please login'
        });
    }
    korisnici.push(req.body)
});


module.exports = router;