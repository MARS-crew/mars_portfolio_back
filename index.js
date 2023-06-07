const express= require('express');
const app = express();

app.get('/',(req,res) => {
    res.send('Hello wordl')
})

//포트폴리오 조회

//포트폴리오 등록

//포트폴리오 수정

//포트폴리오 삭제
module.exports = app;