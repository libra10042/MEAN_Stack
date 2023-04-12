const express = require('express');
const path = require('path');

const app = express();

app.set('port', process.env.PORT ||3000);

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
})


// 공통 미들웨어
// app.use('/about', (req, res, next) => {
//     console.log('about 요청에 대해서만 실행한다. 모든 요청에 실행하고 싶어요');
//     // next 사용 안하면 넘어가지 않는다.
//     next();
// }, (res, req, next) =>{
//     console.log('2번째 실행');
// }, (res, req, next) => {
//     console.log('3번째 실행');
// })

app.get('/', (req, res) => {
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