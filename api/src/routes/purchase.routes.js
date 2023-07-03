const {Router} = require('express');
const purchaseRouter = Router();
const purchaseControllers = require('../controllers/purchase.controller');

purchaseRouter
    .get('/:id',purchaseControllers.getAllPurchases)
    .get('/:id/:purchaseId',purchaseControllers.getOnePurchase)
    .post('/:id',purchaseControllers.createPurchase)
    .delete('/:id/:purchaseId',purchaseControllers.deletePurchase)
    .put('/:id/:purchaseId',purchaseControllers.updatePurchase)


module.exports=purchaseRouter