const express = require('express')
const bodyParser = require('body-parser')

const PORT = 3000
const api = require('./routes/api')

const app = express()

var cors = require('cors')
app.use(cors())

app.use(bodyParser.json())



app.get('/', function(req, res) {
    res.send("hello form server")
})

app.listen(PORT, function() {
    console.log('server running on localhost:' + PORT)
})