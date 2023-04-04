const fs = require('fs')
// creatReadStream : 64KB를 한번에 읽는다.
const readStream = fs.createReadStream('./readFile.txt');

const data = [];
readStream.on('data', (chunk) => {
    data.push(chunk)
    console.log('data', chunk, chunk.length)
})

readStream.on('end', () => {
    console.log('end:', Buffer.concat(data).toString());
})

readStream.on('error', (err) =>{
    console.log('error:', err);
})