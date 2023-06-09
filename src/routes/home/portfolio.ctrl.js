const maria = require('../../config/db');

//포트폴리오 조회
const selectRef = async (req, res) => {
        try {
            //mariadb 연결
            const conn = await maria.getConnection();
            // 쿼리 설정 및 실행
            const rows = await conn.query('SELECT * FROM tbl_portfolio WHERE member_id = ?' , [req.params.member_id]);
            console.log(rows); // 가져온 데이터 출력
            res.json(rows); // 데이터를 JSON 형식으로 응답
    
            //연결 해제
            conn.release();
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: '서버 오류' });
        }
};

//함수 설정 부분
const Portfolio = {
    selectRef
  };

module.exports = Portfolio;