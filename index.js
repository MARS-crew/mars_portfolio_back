const express= require('express');
const app = express();
const session = require("express-session");
const cookieParser = require("cookie-parser");
const home = require('./src/routes/home')

app.get('/test2',(req,res) => {
    res.send('Hello wordl')
})

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
    session({
        secret: "my key",
        resave: false,
        saveUninitialized: false,
    })
);

app.use('/', home)
module.exports = app;