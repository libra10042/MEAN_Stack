const express = require('express');
const path = require('path');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');

const app = express();

app.set('port', process.env.PORT ||3000);

// 로그 기록
if (process.env.NODE_ENV === 'production') { 
    app.use(morgan('combined')); // 배포환경이면
 } else {
    app.use(morgan('dev')); // 개발환경이면
 }
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended : true}));

app.use((req, res, next) => {
    console.log('1요청에 실행하고 싶어요');
    next();
}, (req, res, next) => {
    try {
        throw new Error('error');
        console.log('에러');
    }catch(error){
        next(error);
    }
});


app.get('/', (req, res, next) => {
    req.cookies
    req.signedCookies;
    res.cookie('name', encodeURIComponent(name), {
        expires : new Date(), 
        httpOnly : true, 
        path : '/',
    })
    res.clearCookie('name', encodeURIComponent(name), {
        httpOnly : true, 
        path : '/',
    })

    res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/', (req, res)=> {
    res.send('hello express');
})

app.get('/about', (req, res) => {
    res.send('hello express');
})

app.get('/category/:name', (req, res) => {
    res.send(`hello ${req.params.name}`);
});
app.get('/', (req, res) => {
    res.send('hello express');
});

// 에러 미들웨어 
app.use((err, req, res, next) => {
    console.log('error');
    res.send('error!!!!!!!!!!!!')
})

app.listen(3000, () => {
    console.log('익스프레스 서버 생성');
})