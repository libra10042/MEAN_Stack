const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();


const userSchema = mongoose.Schema({
    name : {
        type : String, 
        maxlength : 100
    }, 
    email: {
        type : String, 
        maxlength: 100,
        trim : true,  // 공백을 제거해준다.
        unique : 1
    }, 
    password : {
        type : String, 
        minlength : 5
    }, 
    lastname : {
        type : String, 
        maxlength : 50
    }, 
    role : {
        type : Number, 
        default : 0
    }, 
    image : String, 
    token :{ 
        type : String
    }, 
    tokenExp : {
        type: Number
    }
})

userSchema.pre('save', function(next) {
    let user = this; 

    if(user.isModified('password')){
        bcrypt.genSalt(saltRounds, function(err, salt) {
            if(err) return next(err)
    
            bcrypt.hash(user.password, salt, function(err, hash){
                if(err) return next(err)
                user.password = hash

                next()
            })
        })
    }else { 
        next()
    }
    
})

userSchema.methods.comparePassword = async function(plainPassword) {
    console.log("#########comparePassword")
    // plaingenerateTokenPassword 1234567   암호화된 
  
    try {
      const isMatch = await bcrypt.compare(`${plainPassword}`, this.password);
      return isMatch;
    } catch (err) {
      throw err;
    }
  }

  userSchema.methods.generateToken = async function() {
    console.log("##########generateToken")
  
    try {
      const user = this; 
      console.log('user_id', user._id)
  
      // jsonwebtoken 을 이용해서 token 을 생성하기 
      const token = jwt.sign(user._id.toHexString(), process.env.jwt_token)
  
      console.log("####" + token)
      user.token = token
      await user.save();
      return {token, user};
  
    } catch (err) {
      throw err;
    }
  }

  userSchema.statics.findByToken = async function(token) {
    try {
      const user = this;
      //user._id + '' = token
      const decoded = jwt.verify(token, process.env.jwt_token);
  
      // 유저아이디를 이용해서 유저를 찾은 다음에 
      // 클라이언트에서 가져온 token과 db에 보관된 토큰이 일치하는지 확인 
      const foundUser = await user.findOne({"_id" : decoded, "token" : token});
      return foundUser;
  
    } catch (err) {
      throw err;
    }
  }


const User = mongoose.model('User', userSchema);

module.exports = {User}; 