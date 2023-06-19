const {Sequelize }= require('sequelize');

const sequelize = new Sequelize(`sistemastock`,`postgres`,`Casaanto1`,{
    host: `localhost` ,
    dialect: `postgres`
})

module.exports= {sequelize};