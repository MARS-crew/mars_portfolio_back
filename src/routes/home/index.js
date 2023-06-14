const express = require('express')
const router = express.Router()
const path = require('path')
const ctrl = require('./home.ctrl')
const db = require('../../config/db')

router.get('/resume/:member_id', ctrl.output['resume/:member_id']);
router.get('/test', ctrl.output.test)

module.exports = router