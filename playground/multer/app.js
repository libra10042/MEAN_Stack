const express = require('express');
const multer = require('multer');
const app = express();

// 파일 저장 설정
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage: storage });

// 정적 파일 제공 설정
app.use(express.static('public'));

// 파일 업로드 라우트 설정
app.post('/uploads', upload.fields([{ name: 'image', maxCount: 1 }, { name: 'image2', maxCount: 1 }]), (req, res) => {
  if (!req.files) {
    return res.status(400).send('No files uploaded.');
  }
  res.status(200).send('Files uploaded successfully: ' + JSON.stringify(req.files));
});

// 서버 시작
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});