const passport = require('passport');
const NaverStrategy = require('passport-naver').Strategy;
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const KakaoStrategy = require('passport-kakao').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
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
  console.log(profile);

  // 네이버 로그인 성공 시 호출되는 함수
  const email = profile.emails[0].value;
  const type = profile.provider;

  // 데이터베이스에 이미 등록된 사용자인지 확인
  let sql = `
    SELECT * FROM tbl_sns sn 
    WHERE sn.type = ?
    AND sn.member_id = 
    (SELECT mb.member_id FROM tbl_member mb WHERE mb.email = ?);
  `;

  db.query(sql, [type, email], (err, rows) => {
    if (err) return done(err);

    // 이미 등록된 사용자인 경우
    if (rows.length > 0) {
      return done(null, rows[0]);
    }

    let data1 = {};
    data1.email = email;
    if(profile.displayName != undefined) {
      data1.name = profile.displayName;
    }

    // 새로운 사용자인 경우, 데이터베이스에 저장
    sql = `INSERT INTO tbl_member SET ?`;
    db.query(sql, data1, (err, rows) => {
      if (err) return done(err);

      if (rows.affectedRows > 0) {
        let data2 = {};
        data2.member_id = rows.insertId;
        data2.access_token = accessToken;
        data2.refresh_token = refreshToken;
        data2.type = type;

        if(profile._json.nickname != undefined) {
          data2.name = profile._json.nickname;
        }

        sql = `INSERT INTO tbl_sns SET ?`;
        db.query(sql, data2, (err, rows) => {
          if (err) return done(err);

          if (rows.affectedRows > 0) {
            // 데이터베이스에서 삽입된 사용자 가져오기
            sql = `SELECT * FROM tbl_member WHERE member_id = ?`;
            db.query(sql, [data2.member_id], (err, rows) => {
              if (err) return done(err);
              return done(null, rows[0]);
            });
          }
        });
      }
    });
  });
}));

// Google Strategy 설정
passport.use(new GoogleStrategy({
  clientID: '101139357605-p8b2dk8opivcm0vvrecm1rb6ci7los03.apps.googleusercontent.com',
  clientSecret: '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',
  callbackURL: '/auth/google/callback',
}, (accessToken, refreshToken, profile, done) => {
  console.log(profile);

  // 구글 로그인 성공 시 호출되는 함수
  const email = profile.emails[0].value;
  const type = profile.provider;

  // 데이터베이스에 이미 등록된 사용자인지 확인
  let sql = `
    SELECT * FROM tbl_sns sn 
    WHERE sn.type = ?
    AND sn.member_id = 
    (SELECT mb.member_id FROM tbl_member mb WHERE mb.email = ?);
  `;
  
  db.query(sql, [type, email], (err, rows) => {
    if (err) return done(err);

    // 이미 등록된 사용자인 경우
    if (rows.length > 0) {
      return done(null, rows[0]);
    }

    let data1 = {};
    data1.email = email;
    if(profile.displayName != undefined) {
      data1.name = profile.displayName;
    }

    // 새로운 사용자인 경우, 데이터베이스에 저장
    sql = `INSERT INTO tbl_member SET ?`;
    db.query(sql, data1, (err, rows) => {
      if (err) return done(err);

      if (rows.affectedRows > 0) {
        let data2 = {};
        data2.member_id = rows.insertId;
        data2.access_token = accessToken;
        data2.refresh_token = refreshToken;
        data2.type = type;

        if(profile.displayName != undefined) {
          data2.name = profile.displayName;
        }

        sql = `INSERT INTO tbl_sns SET ?`;
        db.query(sql, data2, (err, rows) => {
          if (err) return done(err);

          if (rows.affectedRows > 0) {
            // 데이터베이스에서 삽입된 사용자 가져오기
            sql = `SELECT * FROM tbl_member WHERE member_id = ?`;
            db.query(sql, [data2.member_id], (err, rows) => {
              if (err) return done(err);
              return done(null, rows[0]);
            });
          }
        });
      }
    });
  });
}));


// 카카오톡 로그인 설정
passport.use(new KakaoStrategy({
  clientID: '38cc3b67106247149a1827fde93259bf',
  clientSecret: 'ExlAvepfPoNyDmzWzJUfMLVA53eWfW86',
  callbackURL: '/auth/kakao/callback',
}, (accessToken, refreshToken, profile, done) => {
  console.log(profile);

  // 카카오톡 로그인 성공 시 호출되는 함수
  const email = profile._json.kakao_account.email;
  const type = profile.provider;

  // 데이터베이스에 이미 등록된 사용자인지 확인
  let sql = `
    SELECT * FROM tbl_sns sn 
    WHERE sn.type = ?
    AND sn.member_id = 
    (SELECT mb.member_id FROM tbl_member mb WHERE mb.email = ?);
  `;

  db.query(sql, [type, email], (err, rows) => {
    if (err) return done(err);

    // 이미 등록된 사용자인 경우
    if (rows.length > 0) {
      return done(null, rows[0]);
    }

    let data1 = {};
    data1.email = email;
    if (profile.username != undefined) {
      data1.name = profile.username;
    }

    // 새로운 사용자인 경우, 데이터베이스에 저장
    sql = `INSERT INTO tbl_member SET ?`;
    db.query(sql, data1, (err, rows) => {
      if (err) return done(err);

      if (rows.affectedRows > 0) {
        let data2 = {};
        data2.member_id = rows.insertId;
        data2.access_token = accessToken;
        data2.refresh_token = refreshToken;
        data2.type = type;

        if (profile.username != undefined) {
          data2.name = profile.username;
        }

        sql = `INSERT INTO tbl_sns SET ?`;
        db.query(sql, data2, (err, rows) => {
          if (err) return done(err);

          if (rows.affectedRows > 0) {
            // 데이터베이스에서 삽입된 사용자 가져오기
            sql = `SELECT * FROM tbl_member WHERE member_id = ?`;
            db.query(sql, [data2.member_id], (err, rows) => {
              if (err) return done(err);
              return done(null, rows[0]);
            });
          }
        });
      }
    });
  });
}));

// 페이스북 로그인 설정
passport.use(
  new FacebookStrategy(
    {
      clientID: '205344475801010',
      clientSecret: '95642b0a74fb5d4c6825c9949bc332bd',
      callbackURL: '/auth/facebook/callback',
      profileFields: ['id', 'displayName', 'email'],
    },
    (accessToken, refreshToken, profile, done) => {
      console.log(profile);

      // 페이스북 로그인 성공 시 호출되는 함수
      const email = profile.emails[0].value;
      const type = profile.provider;

      // 데이터베이스에 이미 등록된 사용자인지 확인
      let sql = `
        SELECT * FROM tbl_sns sn 
        WHERE sn.type = ?
        AND sn.member_id = 
        (SELECT mb.member_id FROM tbl_member mb WHERE mb.email = ?);
      `;
  
      db.query(sql, [type, email], (err, rows) => {
        if (err) return done(err);

        // 이미 등록된 사용자인 경우
        if (rows.length > 0) {
          return done(null, rows[0]);
        }

        let data1 = {};
        data1.email = email;
        if (profile.displayName != undefined) {
          data1.name = profile.displayName;
        }

        // 새로운 사용자인 경우, 데이터베이스에 저장
        sql = `INSERT INTO tbl_member SET ?`;
        db.query(sql, data1, (err, rows) => {
          if (err) return done(err);

          if (rows.affectedRows > 0) {
            let data2 = {};
            data2.member_id = rows.insertId;
            data2.access_token = accessToken;
            data2.type = type;

            if (profile.displayName != undefined) {
              data2.name = profile.displayName;
            }

            sql = `INSERT INTO tbl_sns SET ?`;
            db.query(sql, data2, (err, rows) => {
              if (err) return done(err);

              if (rows.affectedRows > 0) {
                // 데이터베이스에서 삽입된 사용자 가져오기
                sql = `SELECT * FROM tbl_member WHERE member_id = ?`;
                db.query(sql, [data2.member_id], (err, rows) => {
                  if (err) return done(err);
                  return done(null, rows[0]);
                });
              }
            });
          }
        });
      });
    }
  )
);

module.exports = passport;