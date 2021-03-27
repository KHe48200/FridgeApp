const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Schema kauppalistatuotteelle missä nimi ja runningOut propertyt. runningOut oletuksena false.
const shoppingListProductSchema = new Schema({
    name: String,
    runningOut: { type: Boolean, default: false }
})

const ShoppingListProduct = mongoose.model('shoppingListProduct', shoppingListProductSchema, 'shoppingList_Product')

module.exports = ShoppingListProduct