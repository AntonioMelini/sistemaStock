const express = require('express');

const app = express();

app.get('/',(req,res)=>{
    try {
        res.send('holaas')
    } catch (error) {
        res.send({error: error.message})
    }
})

module.exports= app;