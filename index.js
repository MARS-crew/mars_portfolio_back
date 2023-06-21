const express= require('express');
const app = express();
const home = require('./src/routes/home')
const path = require('path');

//view 엔진 설정
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src/views'));

//body-parser 미들웨어
//app.use(express.urlencoded({extended: true}));

//json 데이터 파싱
app.use(express.json());


app.get('/',(req,res) => {  
    res.send('Hello world')
})

//포트폴리오 라우터 
app.use('/' ,home);

module.exports = app;