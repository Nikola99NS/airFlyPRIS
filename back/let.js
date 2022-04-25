var express = require('express')
var router = express.Router();

const letovi = [{
        "id": "1",
        "polazak": "Beograd",
        "dolazak": "Istanbul",
        "datum": "2022-04-05",
        "vreme_polaska": "9",
        "vreme_dolaska": "10:30",
        "tip": "svakodnevni",
        "klasa": "ekonomska",
        "prevoznik": "Turkish airlines"
    },
    {
        "id": "2",
        "polazak": "Beograd",
        "dolazak": "Sofia",
        "datum": "2022-04-05",
        "vreme_polaska": "10",
        "vreme_dolaska": "11",
        "tip": "jednokratni",
        "klasa": "biznis",
        "prevoznik": "Serbia airlines"
    },
    {
        "id": "3",
        "polazak": "Istanbul",
        "dolazak": "Dubai",
        "datum": "2022-04-05",
        "vreme_polaska": "12",
        "vreme_dolaska": "13:30",
        "tip": "radniDan",
        "klasa": "ekonomska",
        "prevoznik": "Doha air"
    },
    // {
    //     "id": "4",
    //     "polazak": "New York",
    //     "dolazak": "Los Angeles",
    //     "datum": "2022-04-05",
    //     "vreme_polaska": "16",
    //     "vreme_dolaska": "22"
    // },
    // {
    //     "id": "5",
    //     "polazak": "Podgorica",
    //     "dolazak": "Budimpešta",
    //     "datum": "2022-04-05",
    //     "vreme_polaska": "9",
    //     "vreme_dolaska": "10:30"
    // },
    // {
    //     "id": "6",
    //     "polazak": "Zagreb",
    //     "dolazak": "Bukurešt",
    //     "datum": "2022-04-05",
    //     "vreme_polaska": "10",
    //     "vreme_dolaska": "11"
    // },
    // {
    //     "id": "7",
    //     "polazak": "Ljubljana",
    //     "dolazak": "Dubai",
    //     "datum": "2022-04-05",
    //     "vreme_polaska": "12",
    //     "vreme_dolaska": "14"
    // },
    // {
    //     "id": "8",
    //     "polazak": "Baku",
    //     "dolazak": "Tokio",
    //     "datum": "2022-04-06",
    //     "vreme_polaska": "16",
    //     "vreme_dolaska": "21"
    // },
    // {
    //     "id": "9",
    //     "polazak": "London",
    //     "dolazak": "Madrid",
    //     "datum": "2022-04-6",
    //     "vreme_polaska": "9",
    //     "vreme_dolaska": "10"
    // },
    // {
    //     "id": "10",
    //     "polazak": "Pariz",
    //     "dolazak": "Rim",
    //     "datum": "2022-04-06",
    //     "vreme_polaska": "8",
    //     "vreme_dolaska": "10:30"
    // },
    // {
    //     "id": "11",
    //     "polazak": "Beograd",
    //     "dolazak": "Amesterdam",
    //     "datum": "2022-04-06",
    //     "vreme_polaska": "12",
    //     "vreme_dolaska": "13:30"
    // },
    // {
    //     "id": "12",
    //     "polazak": "Niš",
    //     "dolazak": "Atina",
    //     "datum": "2022-04-07",
    //     "vreme_polaska": "16",
    //     "vreme_dolaska": "19"
    // },
    // {
    //     "id": "13",
    //     "polazak": "Kazablanka",
    //     "dolazak": "Istanbul",
    //     "datum": "2022-04-07",
    //     "vreme_polaska": "9",
    //     "vreme_dolaska": "10:30"
    // },
    // {
    //     "id": "14",
    //     "polazak": "Tokio",
    //     "dolazak": "Moskva",
    //     "datum": "2022-04-07",
    //     "vreme_polaska": "15",
    //     "vreme_dolaska": "22"
    // },
    // {
    //     "id": "15",
    //     "polazak": "Kijev",
    //     "dolazak": "Varšava",
    //     "datum": "2022-04-08",
    //     "vreme_polaska": "12",
    //     "vreme_dolaska": "14"
    // },
    // {
    //     "id": "16",
    //     "polazak": "Beograd",
    //     "dolazak": "Moskva",
    //     "datum": "2022-04-08",
    //     "vreme_polaska": "16",
    //     "vreme_dolaska": "21"
    // },
    // {
    //     "id": "17",
    //     "polazak": "Beograd",
    //     "dolazak": "Beč",
    //     "datum": "2022-04-08",
    //     "vreme_polaska": "9",
    //     "vreme_dolaska": "10:30"
    // },
    // {
    //     "id": "18",
    //     "polazak": "Beograd",
    //     "dolazak": "Kopenhagen",
    //     "datum": "2022-04-09",
    //     "vreme_polaska": "10",
    //     "vreme_dolaska": "12"
    // },
    // {
    //     "id": "19",
    //     "polazak": "Sarajevo",
    //     "dolazak": "Dubai",
    //     "datum": "2022-04-09",
    //     "vreme_polaska": "12",
    //     "vreme_dolaska": "15"
    // },
    // {
    //     "id": "20",
    //     "polazak": "Skoplje",
    //     "dolazak": "Atina",
    //     "datum": "2022-04-05",
    //     "vreme_polaska": "20",
    //     "vreme_dolaska": "21"
    // }
];

let rezervacije = []

router.get('/', (req, res) => {
    return res.status(200).json(letovi);
});

router.get('/pretrazi', (req, res) => {

    let resultList = [];

    for (let i = 0; i < letovi.length; i++) {
        if (letovi[i].polazak == req.query.polazak && letovi[i].dolazak == req.query.dolazak && letovi[i].datum == req.query.datum) {
            resultList.push(letovi[i]);
        }
    }

    return res.status(200).json(resultList);
});

router.post('/rezervisi', (req, res) => {

    try {
        if (req.body.username != "" && req.body.let_id != "") {
            rezervacije.push(req.body)
        }
        res.json({
            msg: 'Rezervisano!'
        });
    } catch {
        res.json({
            msg: 'Greska'
        });
    }
})

module.exports = router;