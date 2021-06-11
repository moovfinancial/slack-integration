require('dotenv').config()
const express = require('express');
const session = require('express-session')
const bodyParser = require('body-parser');
const path = require('path')
const MySQLStore = require('express-mysql-session')(session);

const app = express();
const auth = require('./routes/auth');
const options = {
	host: process.env.DB_HOST,
	port: process.env.DB_PORT,
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_DATABASE
};

const sessionStore = new MySQLStore(options);

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

app.use(
    session({
        name: 'auth-session',
        secret: process.env.SECRET,
        store: sessionStore,
        resave: false,
        saveUninitialized: true,
        cookie: {
            httpOnly: true,
            maxAge: 120000
        }
    })
)

app.use(bodyParser.urlencoded({
    extended: true
}))

app.use('/', auth)

app.listen(process.env.port || 8000)

console.log('Running at Port 8080')
