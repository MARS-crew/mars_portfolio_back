const express = require('express')
const router = express.Router()
const path = require('path')
const ctrl = require('./home.ctrl')
const resumeCtrl = require('./resume.ctrl')
const reviewCtrl = require('./review.ctrl')
const db = require('../../config/db')


const apiUrl = '/api/v1';

router.get('/resume/:member_id', resumeCtrl.output['resume/:member_id']);
router.get('/test', resumeCtrl.output.test)

// 리뷰
router.get(apiUrl + '/review/:ref_member_id', reviewCtrl.output['selectRef']);
router.get(apiUrl + '/review/added/:member_id', reviewCtrl.output['selectAdded']);
router.post(apiUrl + '/review', reviewCtrl.process['insert']);
router.put(apiUrl + '/review/:review_id', reviewCtrl.process['update']);
router.delete(apiUrl + '/review/:review_id', reviewCtrl.process['delete']);
router.patch(apiUrl + '/review/hide/:review_id', reviewCtrl.process['hide']);
router.post(apiUrl + '/review/like', reviewCtrl.process['like']);

module.exports = router