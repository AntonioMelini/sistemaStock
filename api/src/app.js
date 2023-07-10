const express = require('express');
const routes = require('./routes');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const errorHandler = require('./middlewares/errorHandler');
const asyncErrorHandler = require('./middlewares/asyncErrorHandler');

const app = express();

app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.json())
app.use(
    cors({
        credentials: true,
        origin: "http://localhost:3000"
    })
)





app.use("/api",routes);
app.use(errorHandler);



module.exports= app;