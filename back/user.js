let express = require('express')
let jwt = require('jsonwebtoken');

let router = express.Router();

let users = [
    {
        "id": "1",
        "username": "luka",
        "password": "123"
    },
    {
        "id": "2",
        "username": "nikola",
        "password": "123"
    },
    {
        "id": "3",
        "username": "tamara",
        "password": "123"
    },
]

let admins = [
    {
        "username": "pero",
        "password": "1234"
    },
]


router.get('/', (req, res) => {
    return res.status(200).json(users);
});


router.get('/user', (req, res) => {
    try{

        for(let u of users){
            if(u.id == req.query.id){
                return res.status(200).json(u); 
            }
        }

        return res.json({
            msg: "Ne postoji!"
        })
    }catch{  
        return res.json({
            msg: "Greska!"
        })
    }
});

router.post('/login', (req, res) => {
    let user = req.body;

    for(let u of users){
        if(u.username == user.username){
            if(u.password == user.password){
                return res.json({
                    msg: 'Ulogovan!',
                    token: jwt.sign({ user: user.username }, 'SECRET'),
                    trenutniUser: user,
                });
            }
        }
    }

    return res.json({
        msg: 'Netacan username ili sifra'
    })
});

router.post('/login-admin', (req, res) => {
    let admin = req.body;

    for(let a of admins){
        if(a.username == admin.username){
            if(a.password == admin.password){
                res.json({
                    msg: 'Admin ulogovan!',
                    token: jwt.sign({ user: admin.username }, 'SECRET'),
                    trenutniUser: admin,
                });
            }
        }
    }

    return res.json({ msg: 'Netacan username ili sifra' });
});

router.post('/register', (req, res) => {
    let user = req.body;    

    for(let u of users){
        if(u.username == user.username){
            return res.json({ msg: 'Korisnik sa tim username vec postoji!' });
        }
    }

    try{
        users.push({
            "id": users.length + 1,
            "username": user.username,
            "password": user.password
        })
        return res.json({
            msg: 'Uspesna registracija. Ulogujte se!'
        });
    }catch{
        return res.json({
            msg: 'Greska!'
        });
    }
});


module.exports = router;