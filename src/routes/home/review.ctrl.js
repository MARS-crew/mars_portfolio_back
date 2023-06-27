const db = require('../../config/db')
const setResponseJson = require('../../utils/setResponseJson')

const output = {
    selectRef: async (req, res) => { // 조회(대상)
        let resStr = '리뷰 조회(대상) 요청 ';
        try {
            const { ref_member_id } = req.params;

            if (ref_member_id == null) {
                throw new Error('ref_member_id is not null');
            }

            const sql = `SELECT * FROM tbl_review WHERE ref_member_id = ? AND del_yn = 'N'`;
            db.query(sql, [ref_member_id],function(err,rows) {
                if(!err) {
                    if(rows.length > 0) {
                        res.send(setResponseJson(200, resStr + '성공', rows));
                    } else {
                        res.send(setResponseJson(405, resStr + '실패', rows));
                    }
                } else {
                    console.log(resStr + '실패 err : ' + err);
                    res.send(setResponseJson(404, resStr + '실패', err));
                }
            });
        } catch (err) {
            console.log(resStr + '실패 err : ' + err);
            res.send(setResponseJson(500, resStr + '실패', err));
        }
    },
    selectAdded: async (req, res) => { // 조회(작성)
        let resStr = '리뷰 조회(작성) 요청 ';
        try {
            const { member_id } = req.params;

            if (member_id == null) {
                throw new Error('member_id is not null');
            }

            const sql = `SELECT * FROM tbl_review WHERE member_id = ? AND del_yn = 'N'`;
            db.query(sql, [member_id],function(err,rows) {
                if(!err) {
                    if(rows.length > 0) {
                        res.send(setResponseJson(200, resStr + '성공', rows));
                    } else {
                        res.send(setResponseJson(405, resStr + '실패', rows));
                    }
                } else {
                    console.log(resStr + '실패 err : ' + err);
                    res.send(setResponseJson(404, resStr + '실패', err));
                }
            });
        } catch (err) {
            console.log(resStr + '실패 err : ' + err);
            res.send(setResponseJson(500, resStr + '실패', err));
        }
    },
}

const process = {
    insert: async (req, res) => { // 등록
        let resStr = '리뷰 등록 요청 ';
        try {
            const data = {
                ref_member_id: req.body.ref_member_id,
                member_id: req.body.member_id,
                content: req.body.content
            };

            const sql = `INSERT INTO tbl_review SET ?`;
            db.query(sql, data,function(err,rows) {
                if(!err) {
                    if(rows.affectedRows > 0) {
                        res.send(setResponseJson(200, resStr + '성공', rows));
                    } else {
                        res.send(setResponseJson(405, resStr + '실패', rows));
                    }
                } else {
                    console.log(resStr + '실패 err : ' + err);
                    res.send(setResponseJson(404, resStr + '실패', err));
                }
            });
        } catch (err) {
            console.log(resStr + '실패 err : ' + err);
            res.send(setResponseJson(500, resStr + '실패', err + ''));
        }
    },
    update: async (req, res) => { // 수정
        let resStr = '리뷰 수정 요청 ';
        try {
            const data = {
                review_id: req.params.review_id,
                member_id: req.body.member_id,
                content: req.body.content
            };

            const sql = `UPDATE tbl_review SET content = ? WHERE review_id = ? AND member_id = ? AND del_yn = 'N'`;
            db.query(sql, [data.content, data.review_id, data.member_id],function(err,rows) {
                if(!err) {
                    if(rows.affectedRows > 0) {
                        res.send(setResponseJson(200, resStr + '성공', rows));
                    } else {
                        res.send(setResponseJson(405, resStr + '실패', rows));
                    }
                } else {
                    console.log(resStr + '실패 err : ' + err);
                    res.send(setResponseJson(404, resStr + '실패', err));
                }
            });
        } catch (err) {
            console.log(resStr + '실패 err : ' + err);
            res.send(setResponseJson(500, resStr + '실패', err + ''));
        }
    },
    delete: async (req, res) => { // 삭제
        let resStr = '리뷰 삭제 요청 ';
        try {
            const data = {
                review_id: req.params.review_id,
                member_id: req.body.member_id
            };

            const sql = `UPDATE tbl_review SET del_yn = 'Y' WHERE review_id = ? AND member_id = ?`;
            db.query(sql, [data.review_id, data.member_id],function(err,rows) {
                if(!err) {
                    if(rows.affectedRows > 0) {
                        res.send(setResponseJson(200, resStr + '성공', rows));
                    } else {
                        res.send(setResponseJson(405, resStr + '실패', rows));
                    }
                } else {
                    console.log(resStr + '실패 err : ' + err);
                    res.send(setResponseJson(404, resStr + '실패', err));
                }
            });
        } catch (err) {
            console.log(resStr + '실패 err : ' + err);
            res.send(setResponseJson(500, resStr + '실패', err + ''));
        }
    },
    hide: async (req, res) => { // 숨기기
        let resStr = '리뷰 숨기기 요청 ';
        try {
            const data = {
                review_id: req.params.review_id,
                member_id: req.body.member_id,
                hide_yn: req.body.hide_yn
            };

            let hide_yn = '';

            if (req.body.hide_yn == 'Y') {
              hide_yn = 'Y';
            } else if (req.body.hide_yn == 'N') {
              hide_yn = 'N';
            } else {
              res.send(setResponseJson(500, resStr + ' 실패: hide_yn 오류', ''));
              return;
            }

            const sql = `UPDATE tbl_review SET hide_yn = ? WHERE review_id = ? AND member_id = ? AND del_yn = 'N'`;
            db.query(sql, [hide_yn, data.review_id, data.member_id],function(err,rows) {
                if(!err) {
                    if(rows.affectedRows > 0) {
                        res.send(setResponseJson(200, resStr + '성공', rows));
                    } else {
                        res.send(setResponseJson(405, resStr + '실패', rows));
                    }
                } else {
                    console.log(resStr + '실패 err : ' + err);
                    res.send(setResponseJson(404, resStr + '실패', err));
                }
            });
        } catch (err) {
            console.log(resStr + '실패 err : ' + err);
            res.send(setResponseJson(500, resStr + '실패', err + ''));
        }
    },
    like: async (req, res) => { // 좋아요
        let resStr = '리뷰 좋아요 요청';
        try {
            const data = {
                member_id: req.body.member_id,
                ref_review_id: req.body.ref_review_id
            };

            let sql = `SELECT * FROM tbl_like WHERE member_id = ? AND ref_review_id = ?`;
            resStr = '리뷰 좋아요 존재 확인 ';
        
            db.query(sql, [data.member_id, data.ref_review_id], (err, rows) => {
                if(!err) {
                    if(rows.length > 0) { // 리뷰 좋아요 존재
                        resStr = '리뷰 좋아요 삭제 요청 ';
                        sql = `DELETE FROM tbl_like WHERE member_id = ? AND ref_review_id = ?`;
                        db.query(sql, [data.member_id, data.ref_review_id],function(err,rows) {
                            if(!err) {
                                if(rows.affectedRows > 0) {
                                    res.send(setResponseJson(200, resStr + '성공', rows));
                                } else {
                                    res.send(setResponseJson(405, resStr + '실패', rows));
                                }
                            } else {
                                console.log(resStr + '실패 err : ' + err);
                                res.send(setResponseJson(404, resStr + '실패', err));
                            }
                        });
                    } else { // 리뷰 좋아요 미존재
                        resStr = '리뷰 좋아요 등록 요청 ';
                        sql = `INSERT INTO tbl_like SET ?`;
                        db.query(sql, data,function(err,rows) {
                            if(!err) {
                                if(rows.affectedRows > 0) {
                                    res.send(setResponseJson(200, resStr + '성공', rows));
                                } else {
                                    res.send(setResponseJson(405, resStr + '실패', rows));
                                }
                            } else {
                                console.log(resStr + '실패 err : ' + err);
                                res.send(setResponseJson(404, resStr + '실패', err));
                            }
                        });
                    }
                } else {
                    console.log(resStr + '실패 err : ' + err);
                    res.send(setResponseJson(404, resStr + '실패', err));
                }
            });
        } catch (err) {
            console.log(resStr + '실패 err : ' + err);
            res.send(setResponseJson(500, resStr + '실패', err + ''));
        }
    },
}

module.exports = {
    output,
    process
}