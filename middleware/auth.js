const jwt = require("jsonwebtoken")

const auth = async(req,res,next)=>{
    try {
        const token = req.header("x-auth-token")
        if(!token){
            return res.status(400).json({msg:"No auth token"})
        }
        const verified = jwt.verify(token, process.env.JWT_SECRET)
        if(!verified){
            return res.status(400).json({msg:"Invalid token"})
        }
        req.user=verified.id
        next()
    } catch (err) {
        res.status(500).json({error:err.message})
    }
}

module.exports = auth