const jwt = require('jsonwebtoken')
const {JWT_KEY} = require('./config')
const User = require('./models/User')

const loginMiddleware =  (req,res,next)=>{

    const {authorization} = req.headers
    if(!authorization){
        return res.status(401).json({error: "you must be logged in"})     
        
    }

    const token = authorization.replace("Bearer ", "")
        
        jwt.verify(token, JWT_KEY, (err, payload)=>{
            if(err){
                return res.status(401).json({error:"you must be logged in."})
            }

          const {findUser:{_id}} = payload
        //   console.log(payload.findUser.name)
            
          User.findById(_id).then((userData)=>{
              req.user = userData
            
              next()      
          })
              
        })
        
}


module.exports = {
    loginMiddleware,
    
}