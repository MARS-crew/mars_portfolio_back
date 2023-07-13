const express= require('express');
const app = express();
const home = require('./src/routes/home')
const bodyParser = require('body-parser');
app.get('/test',(req,res)=>{ res.send('dddd')})
app.use('/', home)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}));
module.exports = app;