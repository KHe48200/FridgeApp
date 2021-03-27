var express = require('express')
var router = express.Router()

var Controller = require('../controllers/controller.js')

router.post('/fridge', Controller.fridgeAddProduct_post)

router.get('/fridge', Controller.fridgeAddProduct_get)

router.get('/fridgenamedesc', Controller.fridgeAddProductNameDesc_get)

router.get('/fridgerunasc', Controller.fridgeAddProductRunAsc_get)

router.get('/fridgerundesc', Controller.fridgeAddProductRunDesc_get)

router.post('/fridgeupdate/:id', Controller.fridgeUpdateProduct)

router.get('/deletefridge/:id/name/:name', Controller.fridgeProductDelete)

router.get('/runningout/:id/name/:name/runningout/:runningout', Controller.fridgeProductRunningOut)

router.get('/runout/:id/name/:name', Controller.fridgeProductRunOut)

router.post('/shoppinglist', Controller.shoppingListAddProduct_post)

router.get('/shoppinglist', Controller.shoppingListAddProduct_get)

router.get('/shoppinglistnamedesc', Controller.shoppingListAddProductNameDesc_get)

router.get('/shoppinglistrunasc', Controller.shoppingListAddProductRunAsc_get)

router.get('/shoppinglistrundesc', Controller.shoppingListAddProductRunDesc_get)

router.post('/shoppinglistupdate/:id', Controller.shoppingListUpdateProduct)

router.get('/gotit/:id/name/:name', Controller.shoppingListGotIt)

router.get('/deleteshoppinglist/:id/name/:name', Controller.shoppingListProductDelete)

router.get('/', Controller.index)

module.exports = router