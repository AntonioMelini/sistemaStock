const {Router} = require('express');
const purchaseRouter = Router();
const purchaseControllers = require('../controllers/purchase.controller');

purchaseRouter
    .get('/:id',purchaseControllers.getAllPurchases)
    .get('/:id/:purchaseId',purchaseControllers.getOnePurchase)
    .post('/',purchaseControllers.createPurchase)
    .delete('/',purchaseControllers.deletePurchase)
    .update('/',purchaseControllers.updatePurchase)


module.exports=purchaseRouter