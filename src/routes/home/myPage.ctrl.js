const express = require('express');
const router = express.Router()
const path = require('path')
const db = require('../../config/db')
const setResponseJson = require('../../utils/setResponseJson');

const output = {
        count : (req,res) => {
        var member_id = 3;
        var sql = 'select count(*) as count From tbl_visit where member_id = ?'
        db.query(sql, [member_id], function(err,rows){
            const count = rows[0].count;
            if (!err) {
                if (count != null) {
                    res.send(setResponseJson(200, '성공', 'total count : ' + count));
                } else {
                    res.send(setResponseJson(405, '실패', rows));
                }
            } else {
                console.log('실패 err : ' + err);
                res.send(setResponseJson(404, '실패', err));
            }
        })
    }
    }

const process = {

}

module.exports = {
    output,
    process
}