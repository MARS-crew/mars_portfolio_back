const express= require('express');
const app = express();
const portfolio = require('./portfolio.ctrl');

var router = require('express').Router();

//포트폴리오 조회 요청
router.get('/portfolio/:member_id', portfolio.output['portfolio/:member_id']);
//포트폴리오 등록 요청
router.post('/portfolio', portfolio.output['portfolio']);
router.get('/test', portfolio.output.test)

module.exports = router;