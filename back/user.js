let express = require('express')
let jwt = require('jsonwebtoken');

let router = express.Router();

let users = {
    "luka": "123"
};

let admins = {
    "pero": "1234",
};


router.get('/', (req, res) => {
    return res.status(200).json(users);
});

router.post('/login', (req, res) => {
    let user = req.body;
    if (users[user.username] && users[user.username] === user.password) {
        res.json({
            msg: 'Ulogovan!',
            token: jwt.sign({ user: user.username }, 'SECRET'),
            trenutniUser: user,
        });
    } else {
        res.json({ msg: 'Netacan username ili sifra' });
    }
});

router.post('/login-admin', (req, res) => {
    let admin = req.body;
    if (admins[admin.username] && admins[admin.username] === admin.password) {
        res.json({
            msg: 'Admin ulogovan!',
            token: jwt.sign({ user: admin.username }, 'SECRET'),
            trenutniUser: admin,
        });
    } else {
        res.json({ msg: 'Netacan username ili sifra' });
    }
});

router.post('/register', (req, res) => {
    let user = req.body;
    if (users[user.username]) {
        res.json({ msg: 'Korisnik sa tim username vec postoji!' });
    } else {
        users[user.username] = user.password;
        res.json({
            msg: 'Uspesna registracija. Ulogujte se!'
        });
    }
});


module.exports = router;