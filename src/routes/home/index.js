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

router.use(passport.initialize());
router.use(passport.session());

// 로그인 페이지 렌더링
router.get('/login', (req, res) => {
  const loginButtonHtml = `
    <a href="/auth/naver">naver 로그인</a>
    <a href="/auth/kakao">kakao 로그인</a>
    <a href="/auth/google">google 로그인</a>
    <a href="/auth/facebook">facebook 로그인</a>
  `;
  res.send(loginButtonHtml);
});

// 소셜 로그아웃 라우트
router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/login');
  });

// 소셜 로그인 라우트 (Naver)
router.get('/auth/naver', passport.authenticate('naver'));

// 소셜 로그인 콜백 라우트 (Naver)
router.get('/auth/naver/callback', passport.authenticate('naver', {
  successRedirect: '/test',
  failureRedirect: '/login'
}));

// 소셜 로그인 라우트 (Google)
router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
// router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'], accessType: 'offline' }));

// 소셜 로그인 콜백 라우트 (Google)
router.get('/auth/google/callback', passport.authenticate('google', {
  successRedirect: '/test',
  failureRedirect: '/login'
}));

// 카카오톡 로그인
router.get('/auth/kakao', passport.authenticate('kakao'));

// 카카오톡 로그인 콜백
router.get(
  '/auth/kakao/callback',
  passport.authenticate('kakao', {
    successRedirect: '/test',
    failureRedirect: '/login',
  })
);

// 소셜 로그인 라우트 (Facebook)
router.get('/auth/facebook', passport.authenticate('facebook', { scope: ['email'] }));

// 소셜 로그인 콜백 라우트 (Facebook)
router.get('/auth/facebook/callback', passport.authenticate('facebook', {
  successRedirect: '/test',
  failureRedirect: '/login'
}));




module.exports = router;