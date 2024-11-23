
import userModel from "../model/userModel.js";
import validator from 'validator'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'


// create TOken for authenticate
const createToken = (id)=>{
 return jwt.sign({id}, process.env.JWT_SECRET)
}

// user login route
const login = async (req, res) =>{
  const {email, password} = req.body
   // make sure all the fill are filled
   if(!name || !email || !password){
    res.send({success:false, message:"All fields are required"})
  }
  const user = await userModel.findOne({email})
  if(!user){
    return res.send({success:false, message:"The user doesn't exists"})
  }
  const isMatch = await bcrypt.compare(password, user.password)

  if(isMatch){
    const token = createToken(user._id)
    res.send({success:true, token})
  }
  else{
    res.send({success:false, message:"Incorrect Password"})
  }
}

// User Registration route

const registerUser = async (req, res) => {
 try {

  const {name, email, password} = req.body;
  
  // make sure all the fill are filled
  if(!name || !email || !password){
    res.send({success:false, message:"All fields are required"})
  }
  // check the user already registered or not
  const exists = await userModel.findOne({email})
  if(exists){
    res.send({success:false, message:"The Email is already registered"})
  }
  if(!validator.isEmail(email)){
    res.send({success:false, message:"Please input a valid Email"})
  }
  if(password.length < 8){
    res.send({success:false, message:"Please input a strong Password"})
  }
  // hashing password using bcrypt
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const newUser = new userModel ({
    name, email, password:hashedPassword
  });
  const user = await newUser.save()
  const token = createToken(user._id)

  res.send({success:true, token})

 } catch (error) {
  console.log(error),
  res.send({success:false, message:error.message})
 }

}

export {registerUser, login};