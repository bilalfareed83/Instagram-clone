const User = require('./models/User')
const bcrypt = require("bcrypt")


const signup = async (req, res)=>{
    const {name, email, password} = req.body
    try {
        if(!name || !email || !password ){
            res.status(422).json({error: "please add all feild"})
        }
          
        
        const findUser = await User.findOne({email:email})
        
            if(findUser){
                 return res.status(422).send({error: "User already exists."})
            }

            bcrypt.hash(password,12)
            .then(hashPassword =>{
                const user = new User({
                    name,
                     email,
                      password: hashPassword
        
                }).save()
                res.send({message: "seccessfuly saved"})
    
            })            
        
    } catch (error) {
        res.send({error: 'signup failed'})
    }
}


const signin = async (req, res)=>{
    const { email, password} = req.body
    try {
        if( !email || !password ){
            res.status(422).json({error: "please add all feild"})
        }
        const findUser = await User.findOne({email})
      
            if(!findUser){
                 return res.status(422).send({error: "Invalid email"})
            }
            const match = await bcrypt.compare(password, findUser.password);
            if(!match){
                return res.status(422).send({error: "Invalid password"})
           }
           res.send({message: 'you are signin'})        
           
        
    } catch (error) {
        console.log(error)    }
}





module.exports = {
    signup,
    signin
}