const {User} = require('../schemas/Users')

const auth = async (req, res, next) => {
    try {
      // Get token from cookies
      const token = req.cookies.x_auth;
      if (!token) {
        return res.status(401).json({ isAuth: false, message: '인증되지 않은 사용자입니다.' });
      }
  
      // Verify token and find user
      const foundUser = await User.findByToken(token);
      if (!foundUser) {
        return res.status(401).json({ isAuth: false, message: '인증되지 않은 사용자입니다.' });
      }
  
      // Pass user info to next middleware
      req.token = token;
      req.user = foundUser;
      req.user_id = foundUser._id;
      next();
  
    } catch (err) {
      console.error(err);
      return res.status(500).send('Internal server error');
    }
  };

module.exports = { auth };