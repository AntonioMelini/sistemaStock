const {Router} = require('express');
const compraRouter = Router();


compraRouter
    .get('/:id',(req,res)=>{
    try {
        res.send('entraste en compra')
    } catch (error) {
        res.send({error: error.message})
    }
})
    .get('/:id/:purchaseId',(req,res)=>{
    try {
        res.send('entraste en compra')
    } catch (error) {
        res.send({error: error.message})
    }
})
    .post('/',(req,res)=>{
    try {
        res.send('entraste en compra')
    } catch (error) {
        res.send({error: error.message})
    }
})
    .delete('/',(req,res)=>{
    try {
        res.send('entraste en compra')
    } catch (error) {
        res.send({error: error.message})
    }
})
    .update('/',(req,res)=>{
    try {
        res.send('entraste en compra')
    } catch (error) {
        res.send({error: error.message})
    }
})
module.exports=compraRouter