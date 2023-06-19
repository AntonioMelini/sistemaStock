const app =  require('./src/app');
const {sequelize} = require('./src/database/db');
const dotenv = require('dotenv');
dotenv.config();
require('./src/models/Categoria')
require('./src/models/Compra')
require('./src/models/Producto')
require('./src/models/Usuario')
require('./src/models/Venta')

const {API_PORT} = process.env




const main = async ()=>{
    try {
        await sequelize.sync({force:true})
        console.log('Connection has been established successfully.');
        app.listen(API_PORT,()=>{
            console.log('Server running ...');
        })
    } catch (error) {
        console.error(' Unable to connect to the database')
    }
}
main ();