# mars_portfolio_back

### Node.js version
``` 
$ node -v
v16.16.0
``` 

### npm version
``` 
$ npm -v
  9.6.5
``` 
### server start
``` 
$ npm install nodemon -g //nodemon 설치
$ npm start //서버 실행

$ npm install // package.json dependencies 안에 있는 패키지 일괄 설치

현재 로컬 포트 8080
http://localhost:8080/
hello world까지 확인

``` 
### folder structure
``` 
📁 프로젝트 명
  📁 APP
    📁 bin
      📃 www.js     -- 서버 port 설정
    📁 node_modules -- 모듈 관리 폴더 모듈 설치 시 이 곳에 설치
    📁src 
      📁 config     -- db 설정 
        📃 db.js
      📁 models     -- User 관련 처리
      📁 public     --  css, js, 업로드 된 첨부파일 등을 관리
        📁 uploads  -- 업로드된 파일
        📁 js       -- js 파일
      📁 routes     -- 라우터와 컨트롤러 관리
        📁 home  
          📃 home.ctrl.js -- api(실 동작)
          📃 index.js     -- 라우팅
      📁 views      -- ejs 파일 관리
    📃 index.js     -- 전체적인 앱 세팅
``` 
