var express = require('express')
var router = express.Router();

const letovi = [
    {
        "id": "1",
        "let": "Beograd - Istanbul",
        "datum": "2022-04-05",
        "vreme polaska": "9",
        "vreme dolaska": "10:30"
    },
    {
        "id": "2",
        "let": "Beograd - Sofia",
        "datum": "2022-04-05",
        "vreme polaska": "10",
        "vreme dolaska": "11"
    },
    {
        "id": "3",
        "let": "Istanbul - Dubai",
        "datum": "2022-04-05",
        "vreme polaska": "12",
        "vreme dolaska": "13:30"
    },
    {
        "id": "4",
        "let": "New York - Los Angeles",
        "datum": "2022-04-05",
        "vreme polaska": "16",
        "vreme dolaska": "22"
    },
    {
        "id": "5",
        "let": "Podgorica - Budimpešta",
        "datum": "2022-04-05",
        "vreme polaska": "9",
        "vreme dolaska": "10:30"
    },
    {
        "id": "6",
        "let": "Zagreb - Bukurešt",
        "datum": "2022-04-05",
        "vreme polaska": "10",
        "vreme dolaska": "11"
    },
    {
        "id": "7",
        "let": "Ljubljana - Dubai",
        "datum": "2022-04-05",
        "vreme polaska": "12",
        "vreme dolaska": "14"
    },
    {
        "id": "8",
        "let": "Baku - Tokio",
        "datum": "2022-04-06",
        "vreme polaska": "16",
        "vreme dolaska": "21"
    },
    {
        "id": "9",
        "let": "London - Madrid",
        "datum": "2022-04-6",
        "vreme polaska": "9",
        "vreme dolaska": "10"
    },
    {
        "id": "10",
        "let": "Pariz - Rim",
        "datum": "2022-04-06",
        "vreme polaska": "8",
        "vreme dolaska": "10:30"
    },
    {
        "id": "11",
        "let": "Bazel - Amesterdam",
        "datum": "2022-04-06",
        "vreme polaska": "12",
        "vreme dolaska": "13:30"
    },
    {
        "id": "12",
        "let": "Niš - Atina",
        "datum": "2022-04-07",
        "vreme polaska": "16",
        "vreme dolaska": "19"
    }, 
    {
        "id": "13",
        "let": "Kazablanka - Istanbul",
        "datum": "2022-04-07",
        "vreme polaska": "9",
        "vreme dolaska": "10:30"
    },
    {
        "id": "14",
        "let": "Tokio - Moskva",
        "datum": "2022-04-07",
        "vreme polaska": "15",
        "vreme dolaska": "22"
    },
    {
        "id": "15",
        "let": "Kijev - Varšava",
        "datum": "2022-04-08",
        "vreme polaska": "12",
        "vreme dolaska": "14"
    },
    {
        "id": "16",
        "let": "Beograd - Moskva",
        "datum": "2022-04-08",
        "vreme polaska": "16",
        "vreme dolaska": "21"
    }, 
    {
        "id": "17",
        "let": "Beograd - Beč",
        "datum": "2022-04-08",
        "vreme polaska": "9",
        "vreme dolaska": "10:30"
    },
    {
        "id": "18",
        "let": "Beograd - Kopenhagen",
        "datum": "2022-04-09",
        "vreme polaska": "10",
        "vreme dolaska": "12"
    },
    {
        "id": "19",
        "let": "Sarajevo - Dubai",
        "datum": "2022-04-09",
        "vreme polaska": "12",
        "vreme dolaska": "15"
    },
    {
        "id": "20",
        "let": "Skoplje - Atina",
        "datum": "2022-04-05",
        "vreme polaska": "20",
        "vreme dolaska": "21"
    }
];

const rezervacije = [{
    "id": "1",
    korisnici: []
}]

router.get('/', (req, res) => {
    return res.status(200).json(letovi);
});

module.exports = router;