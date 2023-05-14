const express = require('express')
const router=express.Router()
const User=require('../Models/User')
const { body, validationResult } = require('express-validator');

//jwt
const jwt=require("jsonwebtoken")
//bcrpt
const bcrypt=require("bcryptjs")

const jwtSecret="MynameisRahul$#505"

//create user
router.post("/createuser",

body('email').isEmail(),
body('password').isLength({min:5})
,async(req,res)=>{
var displayname=req.body.name
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({errors:errors.array()});
  }

  const salt=await bcrypt.genSalt(10);
  let secPassword=await bcrypt.hash(req.body.password,salt)

try{
  await  User.create({
        name:req.body.name,
        password:secPassword,
        email:req.body.email,
        location:req.body.location
     })

     res.json({success:true});
}
catch(error){
console.log(error);
res.json({success:false});
}
})

//login

router.post("/loginuser",

  body('email').isEmail(),
  body('password').isLength({min:5})
,async(req,res)=>{

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({errors:errors.array()});
  }
let email=req.body.email
try{
 let userData= await  User.findOne({email})
 if(!userData){
   return res.status(400).json({errors:"Try logging with correct credentials"});
 }

 const pwdCompare=await bcrypt.compare(req.body.password,userData.password)

 if(!pwdCompare){
  return res.status(400).json({errors:"Try logging with correct credentials"});
 }
 const data={

  user:{
    id:userData.id
  }
 }

 const authToken=jwt.sign(data,jwtSecret)
 return res.json({success:true,authToken:authToken,name:userData.name})

}
catch(error){
console.log(error);
res.json({success:false});
}
})

module.exports=router;