//db 설정

const maria = require("mysql");

// 데이터베이스 connection 객체 생성
const connection = maria.createConnection({
    host: 'mars-port.duckdns.org',
    port: 3306,
    user: 'root',
    password: 'mars',
    database: 'Mars_portfolio'
});

// maria connection 실행
connection.connect(error=>{
    if(error) throw error;
    console.log("Successfully connected to the database. ");
});

module.exports = connection;