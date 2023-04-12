const express = require('express');
const path = require('path');

const app = express();

app.set('port', process.env.PORT ||3000);

app.use((req, res, next) => {
    console.log('모든 요청에 실행하고 싶어요');
    // next 사용 안하면 넘어가지 않는다.
    next();
})

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

app.listen(3000, () => {
    console.log('익스프레스 서버 생성');
})