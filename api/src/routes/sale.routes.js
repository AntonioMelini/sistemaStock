const {Router} = require('express');
const saleRouter = Router();
const saleController = require('../controllers/sale.controller');


saleRouter
.get('/:id',saleController.getAllSales)
.get('/:id/:saleId',saleController.getOneSale)
.post('/:id',saleController.createSale)
.delete('/:id/:saleId',saleController.deleteSale)
.put('/:id/:saleId',saleController.updateSale)

module.exports=saleRouter