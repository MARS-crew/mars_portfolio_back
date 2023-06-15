const express = require('express');
const router = express.Router()
const path = require('path')
const db = require('../../config/db')

const output = {
    'resume/:member_id' : (req,res) => {
        // const member_id = req.params.member_id;
        const member_id =3;
        var sql = 'select * from tbl_resume A inner join tbl_career B on A.resume_id = B.resume_id left join tbl_award C on A.resume_id = C.resume_id left join tbl_technology D on A.resume_id = D.resume_id where A.member_id=? ';
        db.query(sql, [member_id],function(err,rows) {
            if(!err) {
                if(rows != '') {
                    res.send(rows);
                } else {
                    res.send(rows);
                }
            }
        })
    },
    test : (req,res) => {
            res.send('dsfs');
    }
}
const process = {

}

module.exports = {
    output,
    process,
  }