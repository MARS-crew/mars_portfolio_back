const express = require('express')
const router = express.Router()
const path = require('path')
const ctrl = require('./home.ctrl')
const resumeCtrl = require('./resume.ctrl')

const apiUri = '/api/v1'

//조회
router.get('/resume/:member_id', resumeCtrl.output['resume/:member_id']);

//삭제
router.delete('/delete', resumeCtrl.process.delete);
router.get('/delete', resumeCtrl.process.delete);

//등록
router.post('/write', resumeCtrl.process.write)
router.get('/write', resumeCtrl.process.write)

//수정
router.put('/update',resumeCtrl.process.update);
router.get('/update', resumeCtrl.process.update);

module.exports = router