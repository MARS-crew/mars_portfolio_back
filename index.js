const express= require('express');
const app = express();
//const app = require('./src/routes/home/portfolio');


app.get('/',(req,res) => {
    res.send('Hello world')
})

//포트폴리오 라우터
app.use('/portfolio' ,require('./src/routes/home/portfolio.js'));

module.exports = app;