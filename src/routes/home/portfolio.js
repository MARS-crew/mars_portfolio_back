const express= require('express');
const app = express();
const portfolio = require('./portfolio.ctrl');

var router = require('express').Router();

//포트폴리오 조회 요청
router.get('/:member_id', portfolio.selectRef);

module.exports = router;