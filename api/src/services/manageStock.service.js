const saleDatabase = require('../database/sale');
const purchaseDatabase = require('../database/purchase');
const productDatabase = require('../database/products');
const customErrors = require('../utils/error');

const findProductidAmount = async(userId,id,option)=>{
    try {
        console.log("ENTRO A FINDPRODUCTID");
        if(option==='purchase'){
            console.log("ENTRO A FINDPRODUCTIDpurchase");
            let lastPurchase = await purchaseDatabase.getOnePurchase(userId,id);
            lastPurchase = {amount:Number(lastPurchase.dataValues.amount),productId:lastPurchase.dataValues.productId}
            return lastPurchase;
        }else{
            console.log("ENTRO A FINDPRODUCTIDsale ", userId,id);
            let lastSale = await saleDatabase.getOneSale(userId,id);
            lastSale = {amount:Number(lastSale.dataValues.amount),productId:lastSale.dataValues.productId}
            console.log(lastSale);
            return lastSale;
        }
        
    } catch (error) {
        throw(error)
    }
}

const manageStock = async(id,userId,obj,option)=>{
    console.log("entro a manageStock");
    if(option==='purchase'){
        console.log("entro a manageStock PURCHASE");
        if(!obj.amount && !obj.productId ){
            if(obj.price || obj.detail){
                console.log("NO TIENE NI AMOUNT NI PRODUCTID");
                return true;
            }else{
                const err = new customErrors('Missing Params',400);
                throw(err);
            }
            
        }else if(obj.amount && !obj.productId){
            try {
                const lastPurchase= await findProductidAmount(userId,id,'purchase');
                console.log("esntro a tiene amount ", lastPurchase);
                await productDatabase.removeStock(lastPurchase.productId,lastPurchase.amount);
                await productDatabase.increaseStock(lastPurchase.productId,obj.amount);
                return true;
            } catch (error) {
                throw(error)
            }
           
        }else if(obj.productId){
            try {
                const lastPurchase= await findProductidAmount(userId,id,'purchase');
                console.log("esntro a tiene productId ", lastPurchase);
                await productDatabase.removeStock(lastPurchase.productId,lastPurchase.amount);
                //queda sumar el stock del nuevo product id
                await productDatabase.increaseStock(obj.productId,obj.amount || lastPurchase.amount);
                return true;
    
            } catch (error) {
                throw(error)
            }
        }else{
            const err = new customErrors('Missing Params',400);
            throw(err);
        }
    }else{
        console.log("entro a manageStock SALE");
        if(!obj.amount && !obj.productId ){
            if(obj.price || obj.detail){
                console.log("NO TIENE NI AMOUNT NI PRODUCTID");
                return true;
            }else{
                const err = new customErrors('Missing Params',400);
                throw(err);
            }
            
        }else if(obj.amount && !obj.productId){
            try {
                console.log("TIENE AMOUNT PERO NO PRODUCTID");
                const lastSale= await findProductidAmount(userId,id,'sale');
                console.log("esntro a tiene amount ", lastSale);
                await productDatabase.increaseStock(lastSale.productId,lastSale.amount);
                await productDatabase.removeStock(lastSale.productId,obj.amount);
                return true;
            } catch (error) {
                throw(error)
            }
           
        }else if(obj.productId){
            try {
                const lastSale= await findProductidAmount(userId,id,'sale');
                console.log("esntro a tiene productId ", lastSale);
                await productDatabase.increaseStock(lastSale.productId,lastSale.amount);
                //queda sumar el stock del nuevo product id
                await productDatabase.removeStock(obj.productId,obj.amount || lastSale.amount);
                return true;
    
            } catch (error) {
                throw(error)
            }
        }else{
            const err = new customErrors('Missing Params',400);
            throw(err);
        }
    }
    
}
module.exports={
    manageStock
}