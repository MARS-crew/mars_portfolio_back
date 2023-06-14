const express= require('express');
const app = express();
const home = require('./src/routes/home')

app.get('/test2',(req,res) => {
    res.send('Hello wordl')
})
app.use('/', home)
module.exports = app;