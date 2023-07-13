const express = require('express');
const router = express.Router()
const path = require('path')
const db = require('../../config/db')
const setResponseJson = require('../../utils/setResponseJson');



const output = {



    'resume/:member_id': (req, res) => {
        const member_id = req.params
        //var member_id = 3;
        var sql = 'select * from tbl_resume A left join tbl_career B on A.resume_id = B.resume_id left join tbl_award C on A.resume_id = C.resume_id left join tbl_technology D on A.resume_id = D.resume_id left join tbl_specialty E on A.resume_id = E.resume_id left join tbl_interests F on A.resume_id = F.resume_id left join tbl_category G on G.category_id = E.category_id where A.member_id=? ';
        db.query(sql, [member_id], function (err, rows) {
            if (!err) {
                if (rows.length != null) {
                    res.send(setResponseJson(200, '성공', rows[3]));
                } else {
                    res.send(setResponseJson(405, '실패', rows));
                }
            } else {
                console.log('실패 err : ' + err);
                res.send(setResponseJson(404, '실패', err));
            }
        })
    },

    write: (req, res) => {
        res.send();
    },

    delete: (req,res) => {
        res.send();
    },
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

    write: (req, res) => {

        var member_id = 4
        var resume_id = 38
        var introduce = req.body.introduce
        var postcode = req.body.postcode
        var addr = req.body.addr
        var detail_addr = req.body.detail_addr
        var email = req.body.email
        var tel = req.body.tel
        var member_name = req.body.member_name

        //공통
        var del_yn = 'N'
        
        //수상경력
        var name = '제 3056회 호떡 굽기 대회';
        var issuer = req.body.issuer

        //카테고리

        // 카테고리 - 관심분야
        var interestsCate = 3;
        // 카테고리 -전문분야
        var specialCate = 5;

        //커리어
        var com_name = req.body.com_name
        var period = req.body.period
        var rank =  req.body.rank
        var started_date = req.body.started_date
        var duty = '붕어빵 굽기';
        
        //기술
        var tecName = 'Java';
        var tecLevel = 2;
        var tecInfo = '상세정보';

        const resumeData = [member_id, introduce, postcode, addr, detail_addr, email, tel, member_name, del_yn];
        const awardData = [resume_id,name,issuer,del_yn];
        const interestsData = [interestsCate, resume_id];
        const specialData = [specialCate, resume_id];
        const careerData = [resume_id ,com_name,started_date,period,rank,duty];
        const technologyData = [resume_id,tecName,tecLevel,tecInfo]

        var sql = 'insert into tbl_resume(member_id,introduce,postcode,addr,detail_addr,email,tel,name,del_yn,reg_date,mod_date) values(?,?,?,?,?,?,?,?,?,now(),now())';
        var sql2 = 'insert into tbl_award(resume_id, date, name, issuer, del_yn, reg_date, mod_date) values(?, now(), ?, ?, ?, now(), now())';
        var sql3 = 'insert into tbl_interests(category_id, resume_id) values (?,?)';
        //카테고리
        var sql4 = 'insert into tbl_specialty(category_id, resume_id) values(?,?)';
        var sql5 = 'insert into tbl_career(resume_id, com_name, started_date, period,rank,duty,reg_date,mod_date) values(?, ?, ?, ?, ?, ?, now(), now())';
        var sql6 = 'insert into tbl_technology(resume_id, name,level, info,reg_date,mod_date) values(?,?,?,?, now(), now() )';
        db.query(sql, resumeData, function (err, rows) {
            db.query(sql2, awardData,(err,rows2) =>{
                db.query(sql3, interestsData, (err, rows3) =>{
                  db.query(sql4, specialData, (err,rows4) =>{
                    db.query(sql5, careerData, (err,rows5) =>{
                        db.query(sql6, technologyData, (err,rows6) =>{
                            if (!err) {
                                if (rows != null && rows2 != null && rows3.length > 0 && rows4.length > 0) {
                                    res.send(setResponseJson(200, '성공', rows));
                                } else {
                                    res.send(setResponseJson(405, '실패', rows));
                                }
                            } else {
                                console.log('실패 err : ' + err);
                                res.send(setResponseJson(404, '실패', err));
                            }
                        })
                    })
                  })
                })
             
            })
            
        });
        
    },
   
    delete : (req, res) => {
        const member_id = 4;
        var resume_id =34;
        var sql = 'delete A,B,C,D from tbl_resume A RIGHT JOIN tbl_award B on A.resume_id = B.resume_id RIGHT JOIN tbl_career C on A.resume_id = C.resume_id RIGHT JOIN tbl_interests D on A.resume_id = D.resume_id where member_id = ? ';
        const data = [member_id, resume_id]
        db.query(sql, data, function (err,rows) {
            if (!err) {
                if (rows != '') {
                    res.send(setResponseJson(200, '성공', rows));
                } else {
                    res.send(setResponseJson(405, '실패', rows));
                }
            } else {
                console.log('실패 err : ' + err);
                res.send(setResponseJson(404, '실패', err));
            }
        })
    },

    update : (req,res) =>{
        var member_id = req.body.member_id
        var resume_id = req.body.resume_id
        var introduce = req.body.introduce
        var postcode = req.body.postcode
        var addr = req.body.addr
        var detail_addr = req.body.detail_addr
        var email = req.body.email
        var tel = req.body.tel
        var member_name  = req.body.member_name

         //공통
         var del_yn = 'N'
        
         //수상경력
         var name = req.body.name
         var issuer = req.body.issuer
 
         //카테고리
 
         // 카테고리 - 관심분야
         var interestsCate = req.body.interestsCate
         // 카테고리 -전문분야
         var specialCate = req.body.specialCate
 
         //커리어
         var com_name = req.body.com_name
         var period = req.body.period
         var rank = req.body.rank
         var started_date = req.body.started_date
         var duty = req.body.duty
         
         //기술
         var tecName = req.body.tecName
         var tecLevel = req.body.tecLevel
         var tecInfo = req.body.tecInfo
 

        var sql = 'update tbl_resume A set A.introduce = ?, A.postcode = ?, A.addr = ?, A.detail_addr = ?, A.email = ?, A.tel = ?, A.name= ? where A.member_id = ? and A.resume_id = ?'
        var sql2 = 'update tbl_award B set B.name = ?, B.issuer = ?, B.del_yn = ? where B.resume_id = ?'
        var sql3 = 'update tbl_interests C set C.category_id = ? where C.resume_id = ?'
        var sql4 = 'update tbl_specialty D set D.category_id = ? where D.resume_id = ?'
        var sql5 = 'update tbl_career E set E.com_name = ? , E.period = ?, E.rank = ?, E.started_date = ?, E.duty = ? where E.resume_id = ?'
        var sql6 = 'update tbl_technology F set F.name = ?, F.level = ? , F.info = ? where F.resume_id = ?'

        

        const resumeData = [introduce, postcode, addr, detail_addr, email, tel, member_name , member_id, resume_id]
        const awardData = [name,issuer,del_yn,resume_id];
        const interestsData = [interestsCate, resume_id];
        const specialData = [specialCate, resume_id];
        const careerData = [com_name,started_date,period,rank,duty,resume_id];
        const technologyData = [tecName,tecLevel,tecInfo,resume_id]
        

        db.query(sql, resumeData , function(err,rows, fields) {
            if(err || rows.length == 0 ) 
                    console.log('실패')
                    console.log(err,rows)
                    console.log(introduce)
            db.query(sql2,awardData, function (err,rows){
                db.query(sql3,interestsData, function(err,rows){
                    db.query(sql4, specialData , function(err,rows){
                        db.query(sql5, careerData , function(err,rows){
                            
                            db.query(sql6, technologyData , function(err,rows){
                                if (!err) {
                                    if (rows.length != null && rows.length == '') {
                                        res.send(setResponseJson(200, '성공', rows));
                                    } else {
                                        res.send(setResponseJson(405, '실패', rows));
                                        console.log(err)
                                    }
                                } else {
                                    console.log('실패 err : ' + err);
                                    res.send(setResponseJson(404, '실패', err));
                                }
                            })
                        })
                    })
                })
              })
            
        })

    },

   
}

module.exports = {
    output,
    process,
}