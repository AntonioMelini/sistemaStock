const express = require('express');
const routes = require('./routes');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors')

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : true}));
app.use(morgan('dev'));
app.use(cookieParser());

app.use(cors())

app.use("/api",routes);



module.exports= app;