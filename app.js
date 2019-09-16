//기본적으로 필요한 모듈 임포트
const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

//라우터
const index = require('./routers/index');
const users = require('./routers/users');

require('dotenv').config();

const app = express();

//몽고디비 연결
const mongoose = require('mongoose');
mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0-gylqx.mongodb.net/test?retryWrites=true&w=majority`,
                {useNewUrlParser: true}
).then(()=>{
    console.log('mongoDB 연결이 정상적으로 처리되었습니다.');
}, err => {
    console.log('mongoDB 연결 실패.');
});

//뷰 엔진 설정
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);

//마지막까지 매칭되는 응답이 없을 경우(상단에 작성한 url과 전부 다르면)
app.use('*',(req, res) => {
    res.send('잘못된 URL요청입니다.');
})

//3000번 포트를 통해 서버를 올리고 나면 콜백 함수 실행
//익명함수는 화살표 함수로 바꿀 수 있음
app.listen(3000, () => {
    console.log('server ready on port 3000!!');
});

module.exports = app;