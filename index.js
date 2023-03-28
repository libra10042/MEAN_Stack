const express = require('express');
const app = express();
const dotenv = require("dotenv");
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
dotenv.config();

const {User} = require('./src/schemas/Users');
const {auth} = require('./src/middleware/auth');

// application/x-www-form-urlencoded
app.search(bodyParser.urlencoded({extended : true}));
// application/json
app.use(bodyParser.json());
app.use(cookieParser());


const mongoose =require("mongoose");
mongoose.connect(process.env.mognodb_secert_key, {
    useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Mongodb connected..'))
.catch(err => console.log('######error' + err));


app.get('/', (req, res) =>res.send('hello wolrd!!!'))

app.post('/sign-up',(req,res)=>{   
  //회원가입할 때 필요한 정보들을 client에서 가져오면,
  //그 정보들을 DB에 넣어준다.
  const user = new User(req.body);
  //user모델에 정보가 저장됨
  //실패 시, 실패한 정보를 보내줌
  user.save().then(()=>{
      res.status(200).json({
          success:true
      })
  }).catch((err)=>{
      return res.json({success:false,err})
  });


})


app.post('/sign-in', async(req, res) => {
  console.log("#########/sing-in")

   // Find the requested email in the database
   try {
    // Find the requested email in the database
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.json({
        loginSuceess: false,
        message: '이메일에 해당하는 user가 없습니다.'
      });
    }

    console.log("#########비밀번호 일치 여부 확인 ")
    const isMatch = await user.comparePassword(req.body.password);
    if (!isMatch) {
      console.log("Incorrect password")
      return res.json({ loginSuceess: false, message: '비밀번호가 틀렸습니다.' });
    }

    console.log("######## token for the user")
    // Generate token for the user
    const { token } = await user.generateToken();
    console.log(user);

    console.log("##########토큰 쿠기에 저장 ")
    // Save the token, where? Cookie or local storage
    res.cookie('x_auth', token)
      .status(200)
      .json({ loginSuceess: true});

  } catch (err) {
    console.error(err);
    return res.status(500).send('Internal server error');
  }
})



 // 비밀번호 까지 있다면 토큰을 생성한다.
app.get('/users/auth', auth, (req, res) => {
    
    res.status(200).json({
      _id :req.user_id,
      idAdmin : req.user.role === 0 ? false : true, 
      isAuth : true, 
      email : req.user.email, 
      name : req.user.name,
      role : req.user.role
    })


})

app.get('/users/logout', auth, (req,res) => {
  console.log('req.user', req.user)
  User.findOneAndUpdate({_id : req.user._id}, 
    { token: ""}
    , (err, user) => {
        if(err) return res.json({success:false, err});
        return res.status(200).send({
          success: true
      })
    })
});

  



const port = 8000
app.listen(port, () => console.log(`server port ${port} start`))
