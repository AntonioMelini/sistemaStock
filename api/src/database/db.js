const {Sequelize }= require('sequelize');
const dotenv = require('dotenv')
dotenv.config();


const {
    DIALECT,
    API_HOST,
    POSTGRES_USER,
    POSTGRES_PASSWORD,
    POSTGRES_DATABASE_NAME} = process.env

const sequelize = new Sequelize(POSTGRES_DATABASE_NAME,POSTGRES_USER,POSTGRES_PASSWORD,{
    host: API_HOST ,
    dialect: DIALECT
})

module.exports= {sequelize};