const express = require('express')
const router = express.Router()
const path = require('path')
const ctrl = require('./home.ctrl')
const resumeCtrl = require('./resume.ctrl')
const db = require('../../config/db')

router.get('/resume/:member_id', resumeCtrl.output['resume/:member_id']);
router.get('/test', resumeCtrl.output.test)

module.exports = router