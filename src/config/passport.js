const passport = require('passport');
const NaverStrategy = require('passport-naver').Strategy;
const db = require('./db');

// Passport 직렬화
passport.serializeUser((user, done) => {
  done(null, user);
});

// Passport 역직렬화
passport.deserializeUser((user, done) => {
  done(null, user);
});

// Naver Strategy 설정
passport.use(new NaverStrategy({
  clientID: 'OkrQLa31Si2PsDyhpSjx',
  clientSecret: '5souQXoeSG',
  callbackURL: '/auth/naver/callback'
}, (accessToken, refreshToken, profile, done) => {
  // 네이버 로그인 성공 시 호출되는 함수
  const data = {
    naverId: profile.id,
    type: 1,
    name: 'name',//profile.displayName,
    email: profile.emails[0].value
  };
  console.log(profile);
  console.log(data);
  // 데이터베이스에 이미 등록된 사용자인지 확인
  let sql = `SELECT * FROM tbl_sns WHERE NAME = ? AND TYPE = ?`;
  db.query(sql, [data.naverId, data.type], function(err,rows) {
    if (err) return done(err);

    // 이미 등록된 사용자인 경우
    if (rows.length > 0) {
        return done(null, rows[0]);
    }

    // 새로운 사용자인 경우, 데이터베이스에 저장
    sql = `INSERT INTO tbl_member (email, name, tel, birth) VALUES (?, ?, ?, ?)`;
    db.query(sql, [data.email, data.name, '010', '20000712'], function(err,rows) {
      if (err) return done(err);

      if (rows.affectedRows > 0) {
        const member_id = rows.insertId;
        sql = `INSERT INTO tbl_sns (member_id, type, name, access_token, refresh_token) VALUES (?, ?, ?, ?, ?)`;
        db.query(sql, [member_id, data.type, data.naverId, accessToken, refreshToken], function(err,rows) {
          if (err) return done(err);
  
          if (rows.affectedRows > 0) {
            // 데이터베이스에서 삽입된 사용자 가져오기
            sql = `SELECT * FROM tbl_member WHERE member_id = ?`;
            db.query(sql, [member_id], (err, rows) => {
              if (err) return done(err);
              return done(null, rows[0]);
            });
          }
        });
      }
    });
  });
}));

module.exports = passport;