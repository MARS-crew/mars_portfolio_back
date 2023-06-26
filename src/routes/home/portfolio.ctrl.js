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
    test : (req,res) => {
            res.send('dsfs');
    }
};

//함수 설정 부분
const process = {
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
                res.send("포트폴리오 등록 성공");
            }
        })
    },
    //포트폴리오 수정
    'portfolio/:portfolio_id' : (req, res) => {
        const portfolio_id = req.params.portfolio_id;
        const member_id = req.body.member_id;
        const kind = req.body.kind;
        const url = req.body.url;
        const title = req.body.title;
        const description = req.body.description;
        const mod_date = new Date();

        var sql = `UPDATE tbl_portfolio
        SET member_id = ?, kind = ?, url = ?, title = ?, description = ?, mod_date = ?
        WHERE portfolio_id = ?`; 
        var values = [member_id, kind, url, title, description, mod_date, portfolio_id];
        db.query(sql, values, function(err) {
            if(err) {
                console.error(err);
                res.send("포트폴리오 수정 실패");
                return;
            }else{
                res.send("포트폴리오 수정 성공");
            }
        })
    },
    //포트폴리오 삭제
    'portfolio/:portfolio_id' : (req, res) => {
        const portfolio_id = req.params.portfolio_id;
        const member_id = req.body.member_id;
        var sql = `DELETE FROM tbl_portfolio
        WHERE portfolio_id = ? AND member_id = ?`; 
        var values = [portfolio_id, member_id];
        db.query(sql, values, function(err) {
            if(err) {
                console.error(err);
                res.send("포트폴리오 삭제 실패");
                return;
            }else{
                res.send("포트폴리오 삭제 성공");
            }
        })
    }
};

module.exports = {
    output,
    process
};