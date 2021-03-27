const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Schema jääkaappituoteelle missä nimi ja runningOut propertyt. runningOut oletuksena false.
const fridgeProductSchema = new Schema({
    name: String,
    runningOut: { type: Boolean, default: false }
});

const FridgeProduct = mongoose.model('fridgeProduct', fridgeProductSchema, 'fridge_Product')

module.exports = FridgeProduct