const express = require('express')
const app = express()
const bodyparser = require('body-parser')
app.use(bodyparser.urlencoded({ extended: false }))
const mongoose = require('mongoose')
mongoose.set('useFindAndModify', false)
const path = require('path')
const FridgeProduct = require(path.join(__dirname, '../models', 'fridgeProduct.js'))
const ShoppingListProduct = require(path.join(__dirname, '../models', 'shoppingListProduct.js'))

// Index-sivu
exports.index = function (req, res) {
    res.render('index')
}

// Uuden tuotteen lisääminen jääkaappiin
exports.fridgeAddProduct_post = function (req, res) {
    // Luodaan uusi FridgeProduct joka saa tiedot req.bodysta
    var newProduct
    if (req.body.name != '')
        newProduct = new FridgeProduct(req.body)
    else
        res.redirect('/fridge')
    // Tallenetaan uusi FridgeProduct tietokantaan ja logitetaan jos virhe
    newProduct.save().catch(err => console.log(err))
    // Logitetaan tuotteen nimi ja lisätty jääkaappiin.
    console.log(req.body.name + ' added to fridge!')
    // Ohajtaan takaisin fridge -sivulle 
    res.redirect('/fridge')
}

// Jääkaappi -sivu ja kaikki sen tuotteet
exports.fridgeAddProduct_get = function (req, res) {
    FridgeProduct.find((err, fridge_Product) => {
        if (err)
            console.log(err)
        res.render('fridge', { fridge_Product: fridge_Product, path: '/fridge' })
    }).collation({ locale:'fi', strength: 2 }).sort({ name: 1 })
}

// Haetaan jääkaapin tuotteet ja järjestetään nimen mukaan käänteiseen aakkosjärjestykseen
exports.fridgeAddProductNameDesc_get = function (req, res) {
    FridgeProduct.find((err, fridge_Product) => {
        if (err)
            console.log(err)
        res.render('fridge', { fridge_Product: fridge_Product, path: '/fridgenamedesc' })
    }).collation({ locale:'fi', strength: 2 }).sort({ name: -1})
}

// Haetaan jääkaapin tuotteet ja järjestetään statuksen mukaan (running out viimeiseksi)
exports.fridgeAddProductRunAsc_get = function (req, res) {
    FridgeProduct.find((err, fridge_Product) => {
        if (err)
            console.log(err)
        res.render('fridge', { fridge_Product: fridge_Product, path: '/fridgerunasc' })
    }).collation({ locale:'fi', strength: 2 }).sort({ runningOut: 1 })
}

// Haetaan jääkaapin tuotteet ja järjestetään statuksen mukaan (running out ensin)
exports.fridgeAddProductRunDesc_get = function (req, res) {
    FridgeProduct.find((err, fridge_Product) => {
        if (err)
            console.log(err)
        res.render('fridge', { fridge_Product: fridge_Product, path: '/fridgerundesc' })
    }).collation({ locale:'fi', strength: 2 }).sort({ runningOut: -1 })
}

// Päivitetään tuotteen nimi. Etsitään tuote tietokannasta id:n avulla ja tallennetaan uusi nimi
exports.fridgeUpdateProduct = function (req, res) {
    FridgeProduct.findByIdAndUpdate(req.params.id, { name: req.body.name }, (err) => {
        if (err)
            console.log(err)
        else {
            console.log(req.body.name + ' updated!')
            res.redirect('/fridge')
        }
    })
}

// Poistetaan tuote jääkaapista
exports.fridgeProductDelete = function (req, res) {
    // Etsitään tuote route parametrin palauttaman id:n avulla, poistetaan ja logitetaan joko onnistui tai virhe
    FridgeProduct.findByIdAndRemove(req.params.id, (err) => {
        if (err)
            console.log(err)
        else {
            console.log(req.params.name + ' removed succesfully!')
            // Ohjataan takaisin fridge -sivulle
            res.redirect('/fridge')
        }
    })
}

// Merkitään jääkaapin tuote pian loppuvaksi ja lisätään kauppalistaan saman niminen tuote pian loppuvana
exports.fridgeProductRunningOut = function (req, res) {
    // Etsitään tuote route parametrin palauttaman id:n avulla, päivitetään runningOut Trueksi (mikä muuttaa tuotteen värin Fridge-sivulla),
    FridgeProduct.findByIdAndUpdate(req.params.id, { runningOut: true }, (err) => {
        // logitetaan jos virhe,
        if (err)
            console.log(err)
    })
    // Etsitään kauppalistasta saman nimistä tuotetta.
    ShoppingListProduct.findOne({ name: req.params.name }, function (err, shoppingList_Product) {
        if (err)
            console.log(err)
        // Jos EI löydy saman nimistä,
        if (!shoppingList_Product) {
            // luodaan uusi tuote samalla nimella ja runningOut: true,
            const newProduct = new ShoppingListProduct({ name: req.params.name, runningOut: true })
            newProduct.save().catch(err => console.log(err))
            res.redirect('/fridge')
        } else {
            // jos löytyy päivitetään tiedot eli vain runningOut: false -> runningOut: true (mikä muuttaa tuotteen värin kauppalistassa).
            ShoppingListProduct.findOneAndUpdate({ name: req.params.name }, { runningOut: true }, (err) => {
                if (err)
                    console.log(err)
                else
                    res.redirect('/fridge')
            })
        }
    })
    // Logitetaan että tuote on loppumassa.
    console.log(req.params.name + ' running out!')
}

// Tuote loppu, poistetaan tuote jääkaapista ja lisätään saman niminen tuote kauppalistaan
exports.fridgeProductRunOut = function (req, res) {
    FridgeProduct.findByIdAndRemove(req.params.id, (err) => {
        if (err)
            console.log(err)
    })
    // Etsitään kauppalistasta saman nimistä tuotetta.
    ShoppingListProduct.findOne({ name: req.params.name }, function (err, shoppingList_Product) {
        if (err)
            console.log(err)
        // Jos EI löydy saman nimistä,
        if (!shoppingList_Product) {
            // luodaan uusi tuote samalla nimella
            const newProduct = new ShoppingListProduct({ name: req.params.name, runningOut: false })
            newProduct.save().catch(err => console.log(err))
            res.redirect('/fridge')
        } else {
            // jos löytyy päivitetään tiedot eli vain runningOut: True -> runningOut: false (minkä jälkeen näkyy kauppalistassa eri värillä).
            ShoppingListProduct.findOneAndUpdate({ name: req.params.name }, { runningOut: false }, (err) => {
                if (err)
                    console.log(err)
                else
                    res.redirect('/fridge')
            })
        }
    })
    // Logitetaan tuotteen nimi ja on loppu.
    console.log(req.params.name + ' run out!')
}

// Uuden tuotteen lisääminen kauppalistaan
exports.shoppingListAddProduct_post = function (req, res) {
    // Luodaan uusi ShoppingListProduct joka saa tiedot req.bodysta
    var newProduct
    if (req.body.name != '')
        newProduct = new ShoppingListProduct(req.body)
    else
        res.redirect('/shoppinglist')
    // Tallenetaan uusi ShoppingListProduct tietokantaan ja logitetaan jos virhe
    newProduct.save().catch(err => console.log(err))
    // Logitetaan tuotten nimi ja lisätty kauppalistaan
    console.log(req.body.name + ' added to shopping list!')
    // Ohjataan takaisin kauppalista sivulle
    res.redirect('/shoppinglist')
}

// Ostoslista -sivu ja kaikki sen tuotteet
exports.shoppingListAddProduct_get = function (req, res) {
    ShoppingListProduct.find((err, shoppingList_Product) => {
        if (err)
            console.log(err)
        res.render('shoppinglist', { shoppingList_Product: shoppingList_Product, path: '/shoppinglist' })
    }).collation({ locale:'fi', strength: 2 }).sort({ name: 1 })
}

// Haetaan kaikki ostoslistan tuoteet ja järjestetään ne käänteiseen aakkosjäjestykseen nimen perusteella
exports.shoppingListAddProductNameDesc_get = function (req, res) {
    ShoppingListProduct.find((err, shoppingList_Product) => {
        if (err)
            console.log(err)
        res.render('shoppinglist', { shoppingList_Product: shoppingList_Product, path: '/shoppinglistnamedesc' })
    }).collation({ locale:'fi', strength: 2 }).sort({ name: -1})
}

// Haetaan kaikki ostoslistan tuoteet ja järjestetään ne statuksen mukaan (run out ensin)
exports.shoppingListAddProductRunAsc_get = function (req, res) {
    ShoppingListProduct.find((err, shoppingList_Product) => {
        if (err)
            console.log(err)
        res.render('shoppinglist', { shoppingList_Product: shoppingList_Product, path: '/shoppinglistrunasc' })
    }).collation({ locale:'fi', strength: 2 }).sort({ runningOut: 1 })
}

// Haetaan kaikki ostoslistan tuoteet ja järjestetään ne statuksen mukaan (running out ensin)
exports.shoppingListAddProductRunDesc_get = function (req, res) {
    ShoppingListProduct.find((err, shoppingList_Product) => {
        if (err)
            console.log(err)
        res.render('shoppinglist', { shoppingList_Product: shoppingList_Product, path: '/shoppinglistrundesc' })
    }).collation({ locale:'fi', strength: 2 }).sort({ runningOut: -1 })
}

// Tuote hankittu, poistetaan kauppalistasta ja lisätään jääkaappiin
exports.shoppingListGotIt = function (req, res) {
    ShoppingListProduct.findByIdAndRemove(req.params.id, (err) => {
        if (err)
            console.log(err)
    })
    // Etsitään jääkaapista saman nimimistä tuotetta
    FridgeProduct.findOne({ name: req.params.name }, function (err, fridge_Product) {
        if (err)
            console.log(err)
        // Jos EI löydy saman nimistä niin luodaan uusi tuote jääkaappiin
        if (!fridge_Product) {
            const newProduct = new FridgeProduct({ name: req.params.name })
            newProduct.save().catch(err => console.log(err))
            res.redirect('/shoppinglist')
        } else {
            // Jos löytyy niin päivitetään runningOut falseksi
            FridgeProduct.findOneAndUpdate({ name: req.params.name }, { runningOut: false }, (err) => {
                if (err)
                    console.log(err)
                else
                    res.redirect('/shoppinglist')
            })
        }
    })
    // Logitetaan että tuote lisätty jääkaappiin
    console.log(req.params.name + ' added to fridge!')
}

// Poistetaan tuote kauppalistasta
exports.shoppingListProductDelete = function (req, res) {
    // Poistetaan tuote route parametri id:n avulla
    ShoppingListProduct.findByIdAndRemove(req.params.id, (err) => {
        if (err)
            console.log(err)
        else {
            console.log(req.params.name + ' removed succesfully!')
            res.redirect('/shoppinglist')
        }
    })
}

// Päivitetään tuoteen nimi. Etsitään tuote tietokannasta id:n avulla ja korvataan nimi uudella
exports.shoppingListUpdateProduct = function (req, res) {
    ShoppingListProduct.findByIdAndUpdate(req.params.id, { name: req.body.name }, (err) => {
        if (err)
            console.log(err)
        else {
            console.log(req.body.name + ' updated!')
            res.redirect('/shoppinglist')
        }
    })
}