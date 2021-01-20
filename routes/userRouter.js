const router = require('express').Router()
const {registerValidation, loginValidation} = require('../validation/userValidation')
const User = require('../models/userModel')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const auth = require('../middleware/auth')
router.post("/register", async (req,res)=>{
    
    try {
    
    // const {error} = registerValidation(req.body)
    // if(error) return res.json(error.details[0].message)
    // res.json("all is ok")   
    const {email, password, name} = req.body
    if(!email||!password||!name) return res.status(401).json({msg: "Not all fields have been entered"})
    if(password.length<5) return res.status(401).json({msg: "The password should be at least 5 characters long"})

    const existedUser = await User.findOne({email: email})  
    if(existedUser) return res.status(401).json({msg: "This user is already exists"})
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const newUser = new User({
        email,
        password: hashedPassword,
        name
    })
    
    const savedUser = await newUser.save()
    // res.json(savedUser)
    res.json(hashedPassword)
    } catch (err) {
        res.status(500).json({error:err.message})
    }
})

router.post("/login", async(req,res)=>{
    try {
        const {email, password} = req.body
        if(!email||!password)return res.status(401).json({msg: "Not all fields have been entered"})
        const user = await User.findOne({email: email})
        if(!user)return res.status(401).json({msg: "No users with this email"})
        const compare = await bcrypt.compare(password, user.password)
        if(!compare)return res.status(401).json({msg: "Incorrect password"})
        const token = jwt.sign(
            {
            id: user._id,
            },
            process.env.JWT_SECRET
            )
        res.json({
            token,
            user:{
                id: user._id,
                name: user.name
            }
        })
    } catch (err) {
        res.status(400).json({error: err.message})
    }
})

router.delete("/delete",auth, async (req,res)=>{
  try {
      console.log(req.user)
      const deletedUser = await User.findByIdAndDelete(req.user)
      res.json(deletedUser)
    } catch (err) {
      res.status(400).json({error: err.message})
  }
})

router.post("/tokenIsValid", async(req,res)=>{
    try {
        const token = req.header("x-auth-token")
        if(!token)return res.json(false)
        const verified = jwt.verify(token, process.env.JWT_SECRET)
        if(!verified) return res.json(false)
        const user = await User.findById(verified.id)
        if(!user)return res.json(false)
        return res.json(true)
    } catch (err) {
        res.status(400).json({error: err.message})
    }
})

router.get("/", auth, async (req,res)=>{
    const user = await User.findById(req.user)
    res.json({
        name: user.name,
        id: user._id
    })
})

module.exports = router