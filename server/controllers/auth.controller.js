const User = require("../models/User.model.js")
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')

const register = async (req, res) => {
  try {
    const hashedPassword = bcrypt.hashSync(req.body.password, 10)
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    })

    await newUser.save();
    const {password, ...info} = newUser._doc
    res.status(200).json({
      message: "User created successfully",
      data: info
    })

  }catch(err){
    console.log(err);
    res.status(500).json({
      message: "user creation failed",
      error: err
    })
  }
}

const login = async(req, res) => {
  try{

    const user = await User.findOne({email: req.body.email});

    if(!user) return res.status(404).json({
      message : "email does not exists"
    });

    const comparedPassword = await bcrypt.compare(req.body.password, user.password);

    if(!comparedPassword){
      return res.status(404).json({
        message: "Email or password incorrect"
      });
    }

    const token = jwt.sign({
      userId: user._id,
      isAdmin: user.isAdmin
    }, process.env.JWT_KEY, {
      expiresIn: "5d"
    });

    const {password, ...info} = user._doc;

    res.status(200).json({
      data: {...info, token},
      message: "Login successful"
    })
  }catch(error){
    console.log(error)
    res.status(500).json({
      message: "Logon failed",
      error: error
    })
  }
  
}


module.exports = {
  register,
  login
}