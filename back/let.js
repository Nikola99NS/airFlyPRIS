let express = require('express')
let router = express.Router();

let rezervacije = []

router.get('/', (req, res) => {
    return res.status(200).json(letovi);
});

router.get('/pretrazi', (req, res) => {

    let resultList = [];
    let resultItem;

    for (let i = 0; i < letovi.length; i++) {
        if ((letovi[i].polazak == req.query.polazak || req.query.polazak == "") && (letovi[i].dolazak == req.query.dolazak || req.query.dolazak == "") && (letovi[i].datum == req.query.datum || req.query.datum == "")) {
            resultItem = letovi[i];
            resultItem.prevoznik_ime = prevoznici[resultItem.prevoznik_id - 1].ime;
            resultList.push(resultItem);
        }
    }

    return res.status(200).json(resultList);
});

router.post('/rezervisi', (req, res) => {

    try {
        if (req.body.username != "" && req.body.let_id != "" && letovi[req.body.let_id].slobodna_mesta > 0) {

            letovi[req.body.let_id].slobodna_mesta -= 1;

            let brRez = 1;
            for (let i = 0; i < rezervacije.length; i++) {
                if (rezervacije[i].username == req.body.username) {
                    brRez++;
                }
            }

            if (brRez != 0 && brRez % 5 == 0) {
                rezervacije.push({
                    "username": req.body.username,
                    "let_id": req.body.let_id,
                    "popust": "da"
                })
                res.json({
                    popust: "da",
                    msg: 'Rezervisano! Ovo je 5. put da ste rezervisali let i zbog toga ostvarujete popust od 10%!'
                });

            } else {
                rezervacije.push({
                    "username": req.body.username,
                    "let_id": req.body.let_id,
                    "popust": "ne"
                })
                res.json({
                    popust: "ne",
                    msg: 'Rezervisano!'
                });
            }


        }
    } catch {
        res.json({
            msg: 'Greska'
        });
    }
})

router.post('/dodaj-let', (req, res) => {
    let noviLet = req.body;
    noviLet.id = letovi.length + ""

    // console.log(letovi)

    if (noviLet) {
        try {
            letovi.push(noviLet);
            // console.log(letovi)
            res.json({
                msg: "Unet let!"
            })
        } catch {
            res.json({
                msg: "Greska!"
            })
        }
    } else {
        res.json({
            msg: "Greska!"
        })
    }

})

router.get('/prevoznici', (req, res) => {
    return res.status(200).json(prevoznici);
});

router.get('/prevoznik', (req, res) => {
    let prevoznik = null;

    for (let i = 0; i < prevoznici.length; i++) {
        if (prevoznici[i].id == req.query.prevoznik) {
            prevoznik = prevoznici[i];
            break;
        }
    }

    if (prevoznik) {
        res.status(200).json(prevoznik);
    }
})


router.post('/ocena', (req, res) => {

    let rate = 0;
    var rates = prevozniciMap.get(req.body.id_prevoznik);

    var kor = prevozniciMap.get(req.body.id_prevoznik);

    var b = true;

    if (req.body.user != "") {
        for (let k of kor.korisnici) {
            if (k === req.body.user) {
                b = false;
            }
        }
        if (b) {
            kor.korisnici.push(req.body.user)
        }
    }


    if (b) {
        if (req.body.id_prevoznik != "" || req.body.ocena != "") {
            rates.ocene.push(req.body.ocena)
            let zbir_ocena = 0;
            let broj_ocena = rates.ocene.length;
            for (let o of rates.ocene) {
                zbir_ocena = zbir_ocena + o;

            }

            rate = zbir_ocena / broj_ocena;

            for (let p of prevoznici) {
                if (req.body.id_prevoznik == p.id) {
                    p.ocena = rate
                }
            }

            return res.status(200).json({
                ocena: rate,
                msg: "Uspesno!"
            });

        } else {
            res.json({
                msg: "Greska!"
            })
        }
    } {
        res.json({
            msg: 'Ne moze isti user glasati opet'
        })
    }


})




router.get('/komentari', (req, res) => {
    try {

        var prevoznici = prevozniciMap.get(req.query.id_prevoznik);
        return res.status(200).json(prevoznici.komentari);

    } catch (e) {
        console.log(e)
        return res.json({
            msg: "Greska!"
        })
    }
});

router.post('/komentar', (req, res) => {

    var prevoznici = prevozniciMap.get(req.body.id_prevoznik);

    prevoznici.komentari.push(req.body.komentar)

    if (req.body.id_prevoznik != "" || req.body.korisnik != "" || req.body.komentar != "") {
        try {
            prevoznici.komentari.push(req.body.komentar)

            return res.json({
                msg: "Dodat komentar!"
            })
        } catch {
            return res.json({
                msg: "Greska!"
            })
        }

    } else {
        res.json({
            msg: "Greska!"
        })
    }

})

const prevozniciMap = new Map([
    ["1", {
        ocene: [],
        korisnici: [""],
        komentari: ["Pero : Odlicno", "Nikola : Nije lose"]
    }],
    ["2", {
        ocene: [],
        korisnici: [""],
        komentari: [""]
    }],
    ["3", {
        ocene: [],
        korisnici: [""],
        komentari: [""]
    }]
])

let prevoznici = [{
        "id": "1",
        "ime": "Turkish Airlines",
        "opis": "Najveci prevoznik u Evropi",
        "ocena": 0,
        "slika": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/Turkish_Airlines_Boeing_777-300ER_TC-JJG.jpg/200px-Turkish_Airlines_Boeing_777-300ER_TC-JJG.jpg?fbclid=IwAR1u4Bx8GnTJD1ANNZrRQrfkRq9LwAtqxOSHEku95ddNj2d4ZeDabHAHbpQ"
    },

    {
        "id": "2",
        "ime": "Serbia Air",
        "opis": "Najveci prevoznik u Srbiji",
        "ocena": 0,
        "slika": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Air_Serbia_Airbus_A330-202_YU-ARA_at_JFK_Airport.jpg/200px-Air_Serbia_Airbus_A330-202_YU-ARA_at_JFK_Airport.jpg?fbclid=IwAR0A73r-hkyCVvVZMG0u6Y2N2dVqaAQ41oA1o6niu_hB4_m5585GnZSEp6E"
    },



    {
        "id": "3",
        "ime": "Doha Air",
        "opis": "Najveci prevoznik u Africi",
        "ocena": 0,
        "slika": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/A380-861%2C_Korean_Air%2C_F-WWAY%2C_HL7613%2C_%28MSN_59%29.jpg/200px-A380-861%2C_Korean_Air%2C_F-WWAY%2C_HL7613%2C_%28MSN_59%29.jpg?fbclid=IwAR3DvuMb7lc21VpS8uEKPNZ7y_eSvLeWRzophbMY5waAChw5-MQVhzUBhwk"


    }
]

let ocene = [{
        "id_prevoznik": "1",
        ocene: [],
        korisnici: []

    },
    {
        "id_prevoznik": "2",
        ocene: [],
        korisnici: []
    },
    {
        "id_prevoznik": "3",
        ocene: [],
        korisnici: []
    }
]

let komentari = [{
        "korisnik": "1",
        "id_prevoznik": "1",
        "tekst": "Dobra usluga"
    },
    {
        "korisnik": "1",
        "id_prevoznik": "1",
        "tekst": "Losa usluga"
    },
    {
        "korisnik": "1",
        "id_prevoznik": "1",
        "tekst": "Puno kasnio"
    },
    {
        "korisnik": "2",
        "id_prevoznik": "2",
        "tekst": "Jako dobra usluga"
    },
    {
        "korisnik": "2",
        "id_prevoznik": "2",
        "tekst": "Jako losa usluga"
    },
    {
        "korisnik": "2",
        "id_prevoznik": "2",
        "tekst": "Jako puno kasnio"
    },
    {
        "korisnik": "3",
        "id_prevoznik": "3",
        "tekst": "Super usluga"
    },
    {
        "korisnik": "3",
        "id_prevoznik": "3",
        "tekst": "Prijatna voznja"
    },
    {
        "korisnik": "3",
        "id_prevoznik": "3",
        "tekst": "Nista ne valja"
    }
]

const komentariMap = new Map([

])

let letovi = [{
        "id": "1",
        "polazak": "Beograd",
        "dolazak": "Istanbul",
        "datum": "2022-04-05",
        "vreme_polaska": "9:00",
        "vreme_dolaska": "10:30",
        "tip": "svakodnevni",
        "prevoznik_id": "1",
        "cena_ekonomska": "80",
        "cena_biznis": "100",
        "slobodna_mesta": "50",
    },
    {
        "id": "2",
        "polazak": "Beograd",
        "dolazak": "Sofia",
        "datum": "2022-04-05",
        "vreme_polaska": "10:00",
        "vreme_dolaska": "11:00",
        "tip": "jednokratni",
        "prevoznik_id": "2",
        "cena_ekonomska": "50",
        "cena_biznis": "80",
        "slobodna_mesta": "50",
    },
    {
        "id": "3",
        "polazak": "Istanbul",
        "dolazak": "Dubai",
        "datum": "2022-04-05",
        "vreme_polaska": "12:00",
        "vreme_dolaska": "13:30",
        "tip": "radniDan",
        "prevoznik_id": "1",
        "cena_ekonomska": "60",
        "cena_biznis": "100",
        "slobodna_mesta": "50",
    },
    {
        "id": "4",
        "polazak": "New York",
        "dolazak": "Los Angeles",
        "datum": "2022-04-05",
        "vreme_polaska": "16:00",
        "vreme_dolaska": "22:00",
        "tip": "jednokratni",
        "prevoznik_id": "3",
        "cena_ekonomska": "200",
        "cena_biznis": "400",
        "slobodna_mesta": "50",
    },
    {
        "id": "5",
        "polazak": "Podgorica",
        "dolazak": "Budimpešta",
        "datum": "2022-04-05",
        "vreme_polaska": "9:00",
        "vreme_dolaska": "10:30",
        "tip": "jednokratni",
        "prevoznik_id": "2",
        "cena_ekonomska": "100",
        "cena_biznis": "120",
        "slobodna_mesta": "50",
    },
    {
        "id": "6",
        "polazak": "Zagreb",
        "dolazak": "Bukurešt",
        "datum": "2022-04-05",
        "vreme_polaska": "10:00",
        "vreme_dolaska": "11:00",
        "tip": "svakodnevni",
        "prevoznik_id": "2",
        "cena_ekonomska": "80",
        "cena_biznis": "100",
        "slobodna_mesta": "50",
    },
    {
        "id": "7",
        "polazak": "Ljubljana",
        "dolazak": "Dubai",
        "datum": "2022-04-05",
        "vreme_polaska": "12:00",
        "vreme_dolaska": "14:00",
        "tip": "jednokratni",
        "prevoznik_id": "1",
        "cena_ekonomska": "100",
        "cena_biznis": "200",
        "slobodna_mesta": "50",
    },
    {
        "id": "8",
        "polazak": "Baku",
        "dolazak": "Tokio",
        "datum": "2022-04-06",
        "vreme_polaska": "16:00",
        "vreme_dolaska": "21:00",
        "tip": "radniDan",
        "prevoznik_id": "3",
        "cena_ekonomska": "300",
        "cena_biznis": "500",
        "slobodna_mesta": "50",
    },
    {
        "id": "9",
        "polazak": "London",
        "dolazak": "Madrid",
        "datum": "2022-04-6",
        "vreme_polaska": "9:00",
        "vreme_dolaska": "10:00",
        "tip": "svakodnevni",
        "prevoznik_id": "3",
        "cena_ekonomska": "300",
        "cena_biznis": "400",
        "slobodna_mesta": "50",
    },
    {
        "id": "10",
        "polazak": "Pariz",
        "dolazak": "Rim",
        "datum": "2022-04-06",
        "vreme_polaska": "8:00",
        "vreme_dolaska": "10:30",
        "tip": "radniDan",
        "prevoznik_id": "1",
        "cena_ekonomska": "100",
        "cena_biznis": "200",
        "slobodna_mesta": "50",
    },
    {
        "id": "11",
        "polazak": "Beograd",
        "dolazak": "Amesterdam",
        "datum": "2022-04-06",
        "vreme_polaska": "12:00",
        "vreme_dolaska": "13:30",
        "tip": "radniDan",
        "prevoznik_id": "2",
        "cena_ekonomska": "80",
        "cena_biznis": "120",
        "slobodna_mesta": "50",
    },
    {
        "id": "12",
        "polazak": "Niš",
        "dolazak": "Atina",
        "datum": "2022-04-07",
        "vreme_polaska": "16:00",
        "vreme_dolaska": "19:00",
        "tip": "jednokratni",
        "prevoznik_id": "2",
        "cena_ekonomska": "100",
        "cena_biznis": "120",
        "slobodna_mesta": "50",
    },
    {
        "id": "13",
        "polazak": "Kazablanka",
        "dolazak": "Istanbul",
        "datum": "2022-04-07",
        "vreme_polaska": "9:00",
        "vreme_dolaska": "10:30",
        "tip": "radniDan",
        "prevoznik_id": "1",
        "cena_ekonomska": "100",
        "cena_biznis": "200",
        "slobodna_mesta": "50",
    },
    {
        "id": "14",
        "polazak": "Tokio",
        "dolazak": "Moskva",
        "datum": "2022-04-07",
        "vreme_polaska": "15:00",
        "vreme_dolaska": "22:00",
        "tip": "svakodnevni",
        "prevoznik_id": "3",
        "cena_ekonomska": "100",
        "cena_biznis": "150",
        "slobodna_mesta": "50",
    },
    {
        "id": "15",
        "polazak": "Kijev",
        "dolazak": "letšava",
        "datum": "2022-04-08",
        "vreme_polaska": "12:00",
        "vreme_dolaska": "14:00",
        "tip": "radniDan",
        "prevoznik_id": "3",
        "cena_ekonomska": "100",
        "cena_biznis": "150",
        "slobodna_mesta": "50",
    },
    {
        "id": "16",
        "polazak": "Beograd",
        "dolazak": "Moskva",
        "datum": "2022-04-08",
        "vreme_polaska": "16:00",
        "vreme_dolaska": "21:00",
        "tip": "svakodnevni",
        "prevoznik_id": "2",
        "cena_ekonomska": "100",
        "cena_biznis": "150",
        "slobodna_mesta": "50",
    },
    {
        "id": "17",
        "polazak": "Beograd",
        "dolazak": "Beč",
        "datum": "2022-04-08",
        "vreme_polaska": "9:00",
        "vreme_dolaska": "10:30",
        "tip": "jednokratni",
        "prevoznik_id": "2",
        "cena_ekonomska": "80",
        "cena_biznis": "100",
        "slobodna_mesta": "50",
    },
    {
        "id": "18",
        "polazak": "Beograd",
        "dolazak": "Kopenhagen",
        "datum": "2022-04-09",
        "vreme_polaska": "10:00",
        "vreme_dolaska": "12:00",
        "tip": "radniDan",
        "prevoznik_id": "2",
        "cena_ekonomska": "100",
        "cena_biznis": "120",
        "slobodna_mesta": "50",
    },
    {
        "id": "19",
        "polazak": "Sarajevo",
        "dolazak": "Dubai",
        "datum": "2022-04-09",
        "vreme_polaska": "12:00",
        "vreme_dolaska": "15:00",
        "tip": "jednokratni",
        "prevoznik_id": "2",
        "cena_ekonomska": "100",
        "cena_biznis": "160",
        "slobodna_mesta": "50",
    },
    {
        "id": "20",
        "polazak": "Skoplje",
        "dolazak": "Atina",
        "datum": "2022-04-05",
        "vreme_polaska": "20:00",
        "vreme_dolaska": "21:00",
        "tip": "svakodnevni",
        "prevoznik_id": "1",
        "cena_ekonomska": "60",
        "cena_biznis": "100",
        "slobodna_mesta": "50",
    },
    {
        "id": "21",
        "polazak": "Beograd",
        "dolazak": "Istanbul",
        "datum": "2022-04-05",
        "vreme_polaska": "13:00",
        "vreme_dolaska": "15:00",
        "tip": "radniDan",
        "prevoznik_id": "1",
        "cena_ekonomska": "100",
        "cena_biznis": "120",
        "slobodna_mesta": "50",
    }
];


module.exports = router;