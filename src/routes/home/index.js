const express = require('express')
const router = express.Router()
const path = require('path')
const ctrl = require('./home.ctrl')
const resumeCtrl = require('./resume.ctrl')
const reviewCtrl = require('./review.ctrl')
// const userCtrl = require('./user.ctrl')
const db = require('../../config/db')


const apiUrl = '/api/v1';

router.get('/resume/:member_id', resumeCtrl.output['resume/:member_id']);
router.get('/test', resumeCtrl.output.test)

// 리뷰
router.get(apiUrl + '/review/:ref_member_id', reviewCtrl.output['selectRef']);
router.get(apiUrl + '/review/added/:member_id', reviewCtrl.output['selectAdded']);
router.post(apiUrl + '/review', reviewCtrl.process['insert']);
router.put(apiUrl + '/review/:review_id', reviewCtrl.process['update']);
router.delete(apiUrl + '/review/:review_id', reviewCtrl.process['delete']);
router.patch(apiUrl + '/review/hide/:review_id', reviewCtrl.process['hide']);
router.post(apiUrl + '/review/like', reviewCtrl.process['like']);








// 회원
const passport = require('../../config/passport');

// 로그인 페이지 렌더링
router.get('/login', (req, res) => {
  const loginButtonHtml = `
    <a href="/auth/naver">naver 로그인</a>
    <a href="/auth/facebook">facebook 로그인</a>
    <a href="/auth/google">google 로그인</a>
  `;
  res.send(loginButtonHtml);
});

// 소셜 로그인 라우트 (Naver)
router.get('/auth/naver', passport.authenticate('naver'));

// 소셜 로그인 콜백 라우트 (Naver)
router.get('/auth/naver/callback', passport.authenticate('naver', {
  successRedirect: '/test',
  failureRedirect: '/login'
}));

// 소셜 로그아웃 라우트
router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/login');
});









// router.get(apiUrl + '/user/login/naver', userCtrl.output['naver']);

// const passport = require('passport');
// const NaverStrategy = require('passport-naver').Strategy;

// // 네이버 개발자센터에서 발급받은 클라이언트 ID와 시크릿을 입력합니다.
// const NAVER_CLIENT_ID = 'OkrQLa31Si2PsDyhpSjx';
// const NAVER_CLIENT_SECRET = '5souQXoeSG';

// // 세션에 사용자 정보를 저장하기 위해 serialize와 deserialize 메서드를 설정합니다.
// passport.serializeUser((user, done) => {
//   done(null, user);
// });

// passport.deserializeUser((user, done) => {
//   done(null, user);
// });

// // 네이버 로그인 전략을 설정합니다.
// passport.use(
//   new NaverStrategy(
//     {
//       clientID: NAVER_CLIENT_ID,
//       clientSecret: NAVER_CLIENT_SECRET,
//       callbackURL: '/api/v1/user/login/naver/callback', // 네이버 로그인 콜백 URL을 설정합니다.
//     },
//     (accessToken, refreshToken, profile, done) => {
//       // 사용자 정보를 가져온 후 필요한 처리를 수행합니다.
//       // 예시로 사용자 정보를 세션에 저장합니다.
//       const user = {
//         id: profile.id,
//         name: profile.displayName,
//         email: profile.emails[0].value,
//       };
//       return done(null, user);
//     }
//   )
// );

// // Express 앱에 Passport 미들웨어를 등록합니다.
router.use(passport.initialize());
router.use(passport.session());

// router.get(apiUrl + '/user/login', (req, res) => {
//   const loginButtonHtml = `
//     <a href="/api/v1/user/login/naver">네이버로 로그인</a>
//   `;
//   res.send(loginButtonHtml);
// });

// // 네이버 로그인 요청을 처리하기 위한 라우트 핸들러입니다.
// router.get(
//   '/api/v1/user/login/naver',
//   passport.authenticate('naver', { scope: ['profile', 'email'] })
// );

// // 네이버 로그인 콜백 핸들러입니다.
// router.get(
//   '/api/v1/user/login/naver/callback',
//   passport.authenticate('naver', { failureRedirect: '/login' }),
//   (req, res) => {
//     // 인증이 완료되면 메인 페이지로 리다이렉트합니다.
//     res.redirect('/user');
//   }
// );

// // 사용자 정보 확인을 위한 라우트 핸들러입니다.
// router.get('/user', (req, res) => {
//   // 로그인된 사용자 정보를 가져옵니다.
//   const user = req.user;
//   if (user) {
//     res.send(`Hello, ${user.name}!`);
//   } else {
//     res.send('Not logged in.');
//   }
// });

module.exports = router;