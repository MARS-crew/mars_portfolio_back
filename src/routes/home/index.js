const express= require('express');
const app = express();
const portfolio = require('./portfolio.ctrl');
const interview = require('./interview.ctrl');

var router = require('express').Router();

//포트폴리오 조회 요청
router.get('/portfolio/:member_id', portfolio.output['portfolio/:member_id']);
//포트폴리오 등록 요청
router.post('/portfolio', portfolio.process['portfolio']);
//포트폴리오 수정 요청
router.put('/portfolio/:portfolio_id', portfolio.process['portfolio/:portfolio_id'])
//포트폴리오 삭제 요청
router.delete('/portfolio/:portfolio_id', portfolio.process['portfolio/:portfolio_id'])
//인터뷰 조회 요청
//인터뷰 작성 요청
router.post('/interview', interview.process['interview']);
//인터뷰 수정 요청
//인터뷰 삭제 요청
//인터뷰 찜하기

router.get('/test', interview.output.test)

module.exports = router;