//db설정

const maria = require('mariadb');

const connection = maria.createPool({
    host: 'mars-port.duckdns.org',
    port: 3306,
    user: 'root',
    password: 'mars',
    database: 'Mars_portfolio'
});

//maria connection 실행
connection.getConnection()
    .then(conn => {
        console.log("Successfully connected to the database. ")
    })
    .catch(err => {
        console.log("database connecion failed")
    })


module.exports = connection