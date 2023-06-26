const db = require('../../config/db');

const output = {
    //인터뷰 조회
    'interview' : (req, res) => {
        const member_id = req.body.member_id;
        const url = req.body.url;
        const reg_date = new Date();
        const mod_date = new Date();

        var sql = `INSERT INTO tbl_interview 
        (member_id, url, reg_date, mod_date) 
        VALUES (?, ?, ?, ?)`;
        var values = [member_id, url, reg_date, mod_date];
        db.query(sql, values, function(err) {
            if(err) {
                console.error(err);
                return;
            }else{
                res.send("인터뷰 등록 성공");
            }
        })
    },
    test : (req,res) => {
            res.send('dsfdsdsss');
    }
};

//함수 설정 부분
const process = {
    //인터뷰 작성
    'interview' : (req, res) => {
        const member_id = req.body.member_id;
        const url = req.body.url;
        const reg_date = new Date();
        const mod_date = new Date();

        var sql = `INSERT INTO tbl_interview 
        (member_id, url, reg_date, mod_date) 
        VALUES (?, ?, ?, ?)`;
        var values = [member_id, url, reg_date, mod_date];
        db.query(sql, values, function(err) {
            if(err) {
                console.error(err);
                return;
            }else{
                res.send("인터뷰 등록 성공");
            }
        })
    }
};

module.exports = {
    output,
    process
};