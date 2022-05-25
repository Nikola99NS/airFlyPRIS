const { json } = require('body-parser');
let express = require('express')
let router = express.Router();

let rezervacije = []

let najboljaOcena = 0;


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


router.get('/najpovoljnijiLetovi', (req, res) => {

    let najpovoljniji = letovi;

    najpovoljniji.sort((a, b) => {
        return a.cena_ekonomska - b.cena_ekonomska
    })

    temp = najpovoljniji.slice(0, 5);
    najpovoljniji = [];
    for(let t of temp){
        let n = t;
        n.prevoznik_ime = prevoznici[t.prevoznik_id - 1].ime

        najpovoljniji.push(n)
    }
    
    return res.status(200).json(najpovoljniji);
})


router.get('/najboljiPrevoznici', (req, res) => {
    let najboljiPrevoznik = 1;
    
    for(let [key, p] of prevozniciMap.entries()){
        let zbir = 0;
        let broj = 0;

        for(let o of p.ocene){
            if(o.split('|')[2].split('-')[1] == new Date().getMonth() + 1){
                zbir += parseInt(o.split('|')[1])
                broj++;
            }
        }

        if(key == 1){
            najboljaOcena = zbir / broj;
        }

        if(zbir / broj >= najboljaOcena){
            najboljaOcena = zbir / broj;
            najboljiPrevoznik = key;
        }
    }

    return res.status(200).json(najboljiPrevoznik)
})


router.post('/rezervisi', (req, res) => {
    try {
        if (req.body.username != "" && req.body.let_id != "" && letovi[req.body.let_id - 1].slobodna_mesta > 0) {
            letovi[req.body.let_id - 1].slobodna_mesta -= 1;
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
    } catch (e) {
        res.json({
            msg: 'Greska'
        });
    }
})


router.post('/dodaj-let', (req, res) => {
    let noviLet = req.body;
    noviLet.id = letovi.length + ""

    if (noviLet) {
        try {
            letovi.push(noviLet);
            return res.json({
                msg: "Unet let!"
            })
        } catch {
            return res.json({
                msg: "Greska!"
            })
        }
    } else {
        return res.json({
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

    if(req.body.id_prevoznik == "" || req.body.username == "" || req.body.ocena == ""){
        return res.status(200).json({
            msg: "Greska!"
        });
    }

    let prevoznik = prevozniciMap.get(req.body.id_prevoznik);

    let ocenio = false;
    for(let o of prevoznik.ocene){
        
        if(o.split('|')[0] == req.body.username.split('"')[1]){
            ocenio = true;
            break;
        }
    }

    if(!ocenio){
        let currentDate = new Date();
        prevoznik.ocene.push(  req.body.username.split('"')[1] + "|" + req.body.ocena + "|" + currentDate.getFullYear() + "-" + (currentDate.getMonth()+1) + "-" + currentDate.getDate())

        let zbir = 0;
        for(let o of prevoznik.ocene){
            zbir += parseInt(o.split('|')[1])
        }

        prevoznik.ocena = (zbir / prevoznik.ocene.length).toFixed(2);     
        for(let p of prevoznici){
            if(p.id == req.body.id_prevoznik){
                p.ocena = prevoznik.ocena;
            }
        }  

        return res.status(200).json({
            msg: "Uspesno!"
        });
    }else{
        return res.status(200).json({
            msg: "Vec ste uneli ocenu!"
        });
    }

})


router.get('/komentari', (req, res) => {
    try {
        let prevoznik = prevozniciMap.get(req.query.id_prevoznik);
        return res.status(200).json(prevoznik.komentari);
    } catch{
        return res.json({
            msg: "Greska!"
        })
    }
});


router.get('/tipAviona', (req, res) => {
    let tip = []
    tip.push(letovi[req.query.id - 1].tipAviona)
    tip.push(tipoviMap.get(letovi[req.query.id - 1].tipAviona).opis)
    tip.push(tipoviMap.get(letovi[req.query.id - 1].tipAviona).slika)

    return res.status(200).json(tip)
});

router.get('/tipoviAviona', (req, res) => {
    let tipovi = [];
    for(let t of tipoviMap.keys()){
        tipovi.push(t);
    }

    return res.status(200).json(tipovi)
})


router.post('/komentar', (req, res) => {

    if (req.body.id_prevoznik == "" || req.body.komentar == "") {
        return res.json({
            msg: "Greska!"
        })
    } 

    let prevoznik = prevozniciMap.get(req.body.id_prevoznik);
    
    try {
        prevoznik.komentari.push(req.body.komentar)

        return res.json({
            msg: "Dodat komentar!"
        })
    } catch {
        return res.json({
            msg: "Greska!"
        })
    }
})


const prevozniciMap = new Map([
    ["1", {
        ime: "Turkish Airlines",
        opis: "To је национална авио-компанија Србије са седиштем у Београду. Чвориште компаније је београдски аеродром Никола Тесла. Већински власник је Влада Србије (82%), а сувласник (са 18%) је Етихад ервејз, национални авио-превозник Уједињених Арапских Емирата.",
        ocena: 3,
        slika: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/Turkish_Airlines_Boeing_777-300ER_TC-JJG.jpg/200px-Turkish_Airlines_Boeing_777-300ER_TC-JJG.jpg?fbclid=IwAR1u4Bx8GnTJD1ANNZrRQrfkRq9LwAtqxOSHEku95ddNj2d4ZeDabHAHbpQ",
        ocene: [ "nikola|4|2022-5-24", "tamara|2|2022-5-24"],
        komentari: ["Pero : Odlicno", "Nikola : Nije lose"]
    }],

    ["2", {
        ime: "Serbia Air",
        opis: "To је национална авио-компанија Србије са седиштем у Београду. Чвориште компаније је београдски аеродром Никола Тесла. Већински власник је Влада Србије (82%), а сувласник (са 18%) је Етихад ервејз, национални авио-превозник Уједињених Арапских Емирата.",
        ocena: 5,
        slika: "https://1.bp.blogspot.com/-J0zHmYQFFdI/YQuPaw4LraI/AAAAAAAA8AE/jlMomA0tyyE3oY9_cOECNMpPmYp7ex7pQCLcBGAsYHQ/s1752/Air%2BSerbia%2Baircraft%2Bimage.jpg",
        ocene: [ "nikola|5|2022-4-24", "tamara|5|2022-4-24"],
        komentari: ["luka : Odlicno", "nikola : Nije lose", "tamara : Onako"]
    }],

    ["3", {
        ime: "Qatar Air",
        opis: "To је национална авио-компанија Србије са седиштем у Београду. Чвориште компаније је београдски аеродром Никола Тесла. Већински власник је Влада Србије (82%), а сувласник (са 18%) је Етихад ервејз, национални авио-превозник Уједињених Арапских Емирата.",
        ocena: 3,
        slika: "https://d3pc1xvrcw35tl.cloudfront.net/ln/images/1103x827/960x0_202203352263.jpg",
        ocene: [ "nikola|2|2022-5-24", "tamara|4|2022-4-24", "luka|3|2022-5-24"],
        komentari: ["luka : Dobra kompanija", "nikola : Nisam zadovoljan", "tamara : Zadovoljna sam"]
    }],
    ["4", {
        ime: "Croatia Air",
        opis: "To је национална авио-компанија Србије са седиштем у Београду. Чвориште компаније је београдски аеродром Никола Тесла. Већински власник је Влада Србије (82%), а сувласник (са 18%) је Етихад ервејз, национални авио-превозник Уједињених Арапских Емирата.",
        ocena: 3,
        slika: "https://www.diesel-plus.com/wp-content/uploads/2019/07/Airplane-Sky-201811-001-720x475.jpg",
        ocene: [ "nikola|4|2022-3-24", "tamara|3|2022-3-24", "luka|2|2022-3-24"],
        komentari: ["Pero : Super utisci", "tamara : Lose"]
    }],

    ["5", {
        ime: "Paris Air",
        opis: "To је национална авио-компанија Србије са седиштем у Београду. Чвориште компаније је београдски аеродром Никола Тесла. Већински власник је Влада Србије (82%), а сувласник (са 18%) је Етихад ервејз, национални авио-превозник Уједињених Арапских Емирата.",
        ocena: 2,
        slika: "https://airlines-airports.com/wp-content/uploads/2018/06/Air-France.jpg",
        ocene: [ "nikola|2|2022-5-24", "tamara|2|2022-5-24", "luka|2|2022-5-24"],
        komentari: ["luka : nije nesto", "tamara : nije nesto"]
    }],

    ["6", {
        ime: "Emirates Air",
        opis: "To је национална авио-компанија Србије са седиштем у Београду. Чвориште компаније је београдски аеродром Никола Тесла. Већински власник је Влада Србије (82%), а сувласник (са 18%) је Етихад ервејз, национални авио-превозник Уједињених Арапских Емирата.",
        ocena: 3.33,
        slika: "https://cdn.jns.org/uploads/2022/03/Emirates-Airline.jpg",
        ocene: [ "nikola|3|2022-4-24", "tamara|4|2022-4-24", "luka|3|2022-4-24"],
        komentari: ["luka : nije nesto", "tamara : nije nista"]
    }],
    
    ["7", {
        ime: "American Air",
        opis: "To је национална авио-компанија Србије са седиштем у Београду. Чвориште компаније је београдски аеродром Никола Тесла. Већински власник је Влада Србије (82%), а сувласник (са 18%) је Етихад ервејз, национални авио-превозник Уједињених Арапских Емирата.",
        ocena: 4,
        slika: "https://d3lcr32v2pp4l1.cloudfront.net/Pictures/2000xAny/6/4/5/70645_b787aa_749191.jpg",
        ocene: [ "nikola|4|2022-5-24", "tamara|4|2022-5-24", "luka|4|2022-5-24"],
        komentari:  ["luka : super", "tamara : dobro"]
    }]
])


let prevoznici = [{
        "id": "1",
        "ime": "Turkish Airlines",
        "opis": "To је национална авио-компанија Србије са седиштем у Београду. Чвориште компаније је београдски аеродром Никола Тесла. Већински власник је Влада Србије (82%), а сувласник (са 18%) је Етихад ервејз, национални авио-превозник Уједињених Арапских Емирата.",
        "ocena": 3,
        "slika": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/Turkish_Airlines_Boeing_777-300ER_TC-JJG.jpg/200px-Turkish_Airlines_Boeing_777-300ER_TC-JJG.jpg?fbclid=IwAR1u4Bx8GnTJD1ANNZrRQrfkRq9LwAtqxOSHEku95ddNj2d4ZeDabHAHbpQ"
    },

    {
        "id": "2",
        "ime": "Serbia Air",
        "opis": "To је национална авио-компанија Србије са седиштем у Београду. Чвориште компаније је београдски аеродром Никола Тесла. Већински власник је Влада Србије (82%), а сувласник (са 18%) је Етихад ервејз, национални авио-превозник Уједињених Арапских Емирата.",
        "ocena": 5,
        "slika": "https://1.bp.blogspot.com/-J0zHmYQFFdI/YQuPaw4LraI/AAAAAAAA8AE/jlMomA0tyyE3oY9_cOECNMpPmYp7ex7pQCLcBGAsYHQ/s1752/Air%2BSerbia%2Baircraft%2Bimage.jpg"
    },
    {
        "id": "3",
        "ime": "Qatar Air",
        "opis": "To је национална авио-компанија Србије са седиштем у Београду. Чвориште компаније је београдски аеродром Никола Тесла. Већински власник је Влада Србије (82%), а сувласник (са 18%) је Етихад ервејз, национални авио-превозник Уједињених Арапских Емирата.",
        "ocena": 3,
        "slika": "https://d3pc1xvrcw35tl.cloudfront.net/ln/images/1103x827/960x0_202203352263.jpg"
    },
    {
        "id": "4",
        "ime": "Croatia Air",
        "opis": "To је национална авио-компанија Србије са седиштем у Београду. Чвориште компаније је београдски аеродром Никола Тесла. Већински власник је Влада Србије (82%), а сувласник (са 18%) је Етихад ервејз, национални авио-превозник Уједињених Арапских Емирата.",
        "ocena": 3,
        "slika": "https://www.diesel-plus.com/wp-content/uploads/2019/07/Airplane-Sky-201811-001-720x475.jpg"
    },
    {
        "id": "5",
        "ime": "Paris Air",
        "opis": "To је национална авио-компанија Србије са седиштем у Београду. Чвориште компаније је београдски аеродром Никола Тесла. Већински власник је Влада Србије (82%), а сувласник (са 18%) је Етихад ервејз, национални авио-превозник Уједињених Арапских Емирата.",
        "ocena": 2,
        "slika": "https://airlines-airports.com/wp-content/uploads/2018/06/Air-France.jpg"
    },
    {
        "id": "6",
        "ime": "Emirates Air",
        "opis": "To је национална авио-компанија Србије са седиштем у Београду. Чвориште компаније је београдски аеродром Никола Тесла. Већински власник је Влада Србије (82%), а сувласник (са 18%) је Етихад ервејз, национални авио-превозник Уједињених Арапских Емирата.",
        "ocena": 3.33,
        "slika": "https://cdn.jns.org/uploads/2022/03/Emirates-Airline.jpg"
    },
    {
        "id": "7",
        "ime": "American Air",
        "opis": "To је национална авио-компанија Србије са седиштем у Београду. Чвориште компаније је београдски аеродром Никола Тесла. Већински власник је Влада Србије (82%), а сувласник (са 18%) је Етихад ервејз, национални авио-превозник Уједињених Арапских Емирата.",
        "ocena": 4,
        "slika": "https://d3lcr32v2pp4l1.cloudfront.net/Pictures/2000xAny/6/4/5/70645_b787aa_749191.jpg"
    }

]


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
        "tipAviona": "Boing 737"
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
        "tipAviona": "Boing 737"
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
        "tipAviona": "Boing 747"
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
        "tipAviona": "Boing 747"
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
        "tipAviona": "Boing 747"
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
        "tipAviona": "Boing 747"
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
        "tipAviona": "Boing 777"
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
        "tipAviona": "Boing 777"
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
        "tipAviona": "Boing 777"
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
        "tipAviona": "Boing 787"
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
        "tipAviona": "Airbus A300"
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
        "tipAviona": "Airbus A320"
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
        "tipAviona": "Airbus A300"
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
        "tipAviona": "Airbus A320"
    },
    {
        "id": "15",
        "polazak": "Kijev",
        "dolazak": "Varšava",
        "datum": "2022-04-08",
        "vreme_polaska": "12:00",
        "vreme_dolaska": "14:00",
        "tip": "radniDan",
        "prevoznik_id": "3",
        "cena_ekonomska": "100",
        "cena_biznis": "150",
        "slobodna_mesta": "50",
        "tipAviona": "Airbus A380"
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
        "tipAviona": "Tu-104"
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
        "tipAviona": "Boing 747"
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
        "tipAviona": "Concorde"
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
        "tipAviona": "IL-114"
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
        "cena_ekonomska": "65",
        "cena_biznis": "100",
        "slobodna_mesta": "50",
        "tipAviona": "ATR 72"
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
        "tipAviona": "ATR 72"
    }
];


const tipoviMap = new Map([
    ["Boing 737", {
        opis: "Dobar",
        slika: "https://media.istockphoto.com/photos/boeing-747-airliner-flying-low-overhead-picture-id102769318?s=612x612"
    }],
    ["Boing 747", {
        opis: "Boing 747 širokotrupni je avion kompanije Boing koji se koristi u putničkom i teretnom saobraćaju. On je prvi širokotrupni avion ikada proizveden i jedan je od najpoznatijih tipova ove vrste aviona na svetu. Često ga nazivaju Kraljicom neba (engl. Queen Of Air) i Džambo džetom (engl. Jumbo Jet)." +
            "Bio je najveći putnički avion sve do 2007. godine kada je u servis ušao Erbas A380.",
        slika: "https://media.istockphoto.com/photos/-picture-id489756564?s=612x612"
    }],
    ["Boing 777", {
        opis: "Dobar",
        slika: "https://media.istockphoto.com/photos/pakistan-airways-boing-777-picture-id515275755?s=612x612"
    }],
    ["Boing 787", {
        opis: "Dobar",
        slika: "https://media.istockphoto.com/photos/boeing-787-dreamliner-during-takeoff-picture-id458086589?s=612x612"
    }],
    ["Airbus A300", {
        opis: "Dobar",
        slika: "https://media.istockphoto.com/photos/jet-airplane-flying-in-blue-sky-picture-id182436155?s=612x612"
    }],
    ["Airbus A320", {
        opis: "Dobar",
        slika: "https://media.istockphoto.com/photos/jet-airplane-landing-at-dusk-picture-id173897349?s=612x612"
    }],
    ["Airbus A300", {
        opis: "Dobar",
        slika: "https://media.istockphoto.com/photos/airbus-a300608st-beluga-2-picture-id685899810?s=612x612"
    }],
    ["Airbus A380", {
        opis: "Dobar",
        slika: "https://media.istockphoto.com/photos/airbus-a380-in-flight-picture-id611289498?s=612x612"
    }],
    ["Tu-104", {
        opis: "Dobar",
        slika: "https://media.istockphoto.com/photos/soviet-aircraft-picture-id92394714?s=612x612"
    }],
    ["Concorde", {
        opis: "Dobar",
        slika: "https://media.istockphoto.com/photos/concord-picture-id532332081?s=612x612"
    }],
    ["IL-114", {
        opis: "Dobar",
        slika: "https://media.istockphoto.com/photos/demonstration-flight-of-ilyushin-il114300-international-aviation-and-picture-id1360172497?s=612x612"
    }],
    ["ATR 72-600", {
        opis: "Dobar",
        slika: "https://media.istockphoto.com/photos/aeromar-atr72600-xauym-to-puerto-vallarta-intl-picture-id1263492739?s=612x612"
    }],
    ["ATR 72", {
        opis: "Dobar",
        slika: "https://media.istockphoto.com/photos/of-thaiairway-picture-id482610072?s=612x612"
    }]
])




module.exports = router;