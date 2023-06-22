const app =  require('./src/app');
const {sequelize} = require('./src/database/db');

require('./src/models/Category')
require('./src/models/Purchase')
require('./src/models/Product')
require('./src/models/User')
require('./src/models/Sale')

const {API_PORT} = process.env



 
const main = async ()=>{
    try {
        await sequelize.sync({force:false})
        console.log('Connection has been established successfully.');
        app.listen(API_PORT,()=>{
            console.log('Server running ...');
        })
    } catch (error) {
        console.error(' Unable to connect to the database')
    }
}
main ();