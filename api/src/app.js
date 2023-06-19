const express = require('express');

const app = express();

app.get('/',(req,res)=>{
    try {
        res.send('holaa')
    } catch (error) {
        res.send({error: error.message})
    }
})

app.listen(3000,()=>{
    console.log("Server running ...");
})