const express = require('express');
const routes = require('./routes');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const cors = require('cors')

const app = express();

app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.json())
app.use(cors())

app.use("/api",routes);



module.exports= app;