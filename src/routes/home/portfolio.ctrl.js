const db = require('../../config/db');

const output = {
    //포트폴리오 조회
    'portfolio/:member_id' : (req,res) => {
        var sql = 'SELECT * FROM tbl_portfolio WHERE member_id = ?';
        db.query(sql, [req.params.member_id],function(err,rows) {
            if(!err) {
                if(rows != '') {
                    res.send(rows);
                } else {
                    res.send(rows);
                } 
                console.log(req.params.member_id)
            }
        })
    },
    //포트폴리오 등록
    'portfolio' : (req, res) => {
        const member_id = req.body.member_id;
        const file_id = req.body.file_id;
        const kind = req.body.kind;
        const url = req.body.url;
        const title = req.body.title;
        const description = req.body.description;
        const reg_date = new Date();
        const mod_date = new Date();

        var sql = `INSERT INTO tbl_portfolio 
        (member_id, file_id, kind, url, title, description,reg_date, mod_date) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)`; 
        var values = [member_id, file_id, kind, url, title, description, reg_date, mod_date];
        db.query(sql, values, function(err) {
            if(err) {
                console.error(err);
                return;
            }else{
                res.send("등록 성공");
            }
        })
    },
    test : (req,res) => {
            res.send('dsfs');
    }
};

//함수 설정 부분
const process = {
    
};

module.exports = {
    output,
    process
};