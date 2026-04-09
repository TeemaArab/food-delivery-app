import userModel from '../models/userModel.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import validator from 'validator';

// login user
const loginUser = async( req,res) =>{
   const {email, password} = req.body;

   try{
    //checking if user exists
    const user = await userModel.findOne({email});
    if(!user){
        return res.status(400).json({success: false, message: "User does not exist"});
    }
    //check if password is correct
    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch){
        return res.status(400).json({success: false, message: "Invalid Password"});
    }

    // if password is correct, create token and send response
    const token = createToken(user._id);
    res.json({success: true, token});
    
   }catch(error){
    console.log(error);
    return res.status(500).json({success: false, message: "Error occurred while logging in"});

   }
}


const createToken = (id)=>{
    return jwt.sign({id}, process.env.JWT_SECRET);
}
// register user
const registerUser = async( req,res) =>{
  const {name, email, password} = req.body;

  try{
    // checking if user already exists
       const exists = await userModel.findOne({email});
       if(exists){
        return res.status(400).json({success: false, message: "User already exists"});
       }

       //validating email format & strong password
       if(!validator.isEmail(email)){
        return res.status(400).json({success: false, message: "Please enter a valid email"});
       }

       //checking password length
       if(password.length < 8){
        return res.status(400).json({success: false, message: "Password must be at least 8 characters long"});
       }
       //hashing password
       const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

         //creating new user
         const newUser = new userModel({
            name: name,
            email: email,
            password: hashedPassword
         })
         const user = await newUser.save();
         const token = createToken(user._id);
         res.json({success: true, token});

  }catch(error){
    console.log(error);
    return res.status(500).json({success: false, message: "Error occurred while registering user"});
  }
}


export { loginUser, registerUser }