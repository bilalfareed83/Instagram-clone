const User = require('./models/User')
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken')
const {JWT_KEY} = require('./config')
const Post = require('./models/Post')


const protected = (req, res)=>{
    // console.log(req.user)
    res.send("hello user")
}



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
           const token = jwt.sign({findUser}, JWT_KEY ) 
        //    res.send({message: 'you are signin'})
        
                res.send(token)
           
        
    } catch (error) {
        console.log(error)    }
}



const createPost = async (req, res)=>{
    const {title, body} = req.body
    try {
        if(!title || !body){
            return res.status(402).json({error: "please add all fields"})
        }
        req.user.password = undefined
        const post = await new Post({
            title,
            body,
            postById: req.user
        }).save()

        res.send(post)    

    } catch (error) {
        res.send({error: "error message"})
    }
   
}


const allPost = async (req, res)=>{
    try {
        const posts = await Post
        .find()
        .populate("postById", "_id name")
        res.send(posts)

    } catch (error) {
        console.log(error)
    }
}


const myPosts = async (req, res)=>{
    
    try {        
            const myPosts = await Post
            .find({postById: req.user._id})
            .populate('postById', "_id name")
            
            res.send(myPosts)

    } catch (error) {
        console.log(error)
    }
    
}

module.exports = {
    signup,
    signin,
    protected,
    createPost,
    allPost,
    myPosts,
}