const http = require('http');
const fs = require('fs').promises;
const url = require('url');
const qs = require('querystring');

const parseCookies = (cookie = "")=>
    cookie
        .split(';')
        .map(v => v.split('='))
        .reduce((acc, [k, v])=> {
            acc[k.trim()] = decodeURIComponent(v);
            return acc;
        }, {});

http.createServer(async, (req, res) => {
    const cookies = parseCookies(req.headers.cookie);
    
    if(req.url.startsWith('/login')){
        const { query } = url.parse(req.url);
        const { name } = qs.parse(query);
        const expires = new Date();
        
        expires.setMinutes(expires.getMinutes() + 5);
        // http only : javascript로 접근하지 못하도록 한다.( 보안 관련 이슈 발생 우려)
        res.writeHead(302, {
            location : '/',
            'Set-Cookie' : `name=${encodeURIComponent(name)}; Expires=${expires.toGMTString()}; HttpOnly; Path=/`,
        })
        res.end();
    }else if(cookies.name){
        res.writeHead(200, {'Content-Type' : 'text/plain; charset=utf-8'});
        res.end(`${cookies.name}님 안녕하세요`);
    }
})

