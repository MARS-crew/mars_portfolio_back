const express = require('express');
const router = express.Router()
const path = require('path')
const db = require('../../config/db')
const setResponseJson = require('../../utils/setResponseJson');

const output = {
        count : (req,res) => {
        var member_id = 3;
        var sql = 'select count(*) as count From tbl_visit where member_id = ?'
        var sql2 = 'select B.name, A.reg_date from tbl_visit A LEFT JOIN tbl_member B ON A.ref_member_id = B.member_id where A.member_id = ?'
        db.query(sql, member_id, function(err,rows1){
            db.query(sql2, member_id, (err,rows)=>{
                const count = rows1[0].count;
                if (!err) {
                    if ( count != null && rows.length > 0 ) {
                        res.send(setResponseJson(200, '성공', 'total count : ' + count + JSON.stringify(rows)));
                    } else {
                        res.send(setResponseJson(405, '실패', rows1, rows));
                    }
                } else {
                    console.log('실패 err : ' + err);
                    res.send(setResponseJson(404, '실패', err));
                }
            })
        })
    }, 


    }

const process = {

}

module.exports = {
    output,
    process
}