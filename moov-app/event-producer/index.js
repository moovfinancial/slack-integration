const express = require('express');
const bodyParser = require('body-parser');

const producerRoute = require('./client');
const adminRoute = require('./admin');

const app = express();

app.use(bodyParser.json());
app.use('/producer', producerRoute);
app.use('/admin', adminRoute);


app.listen(4000);