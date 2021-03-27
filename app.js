const express = require('express')
const app = express()
const path = require('path')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const routes = require(path.join(__dirname, '/routes', 'routes.js'))
const PORT = 3000

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

// yhdistetään sovellus tietokantaa
mongoose.connect('mongodb://localhost:27017/MyFridge', { useNewUrlParser: true, useUnifiedTopology: true})

// asetetaan view engine käyttöön ja engineksi pug
app.set('view engine', 'pug')

app.use('/', routes)

console.log('FridgeApp strated on http://localhost:' + PORT)

app.listen(PORT)