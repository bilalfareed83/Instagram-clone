const express = require('express')
const app = express()
const api = require('./api')
const middleware = require('./middleware')

app.use(express.json())

app.get('/protected', middleware.loginMiddleware , api.protected)

app.post('/signin', api.signin)

app.post('/signup', api.signup)

app.post('/createPost',middleware.loginMiddleware,api.createPost)

app.get('/allPost', api.allPost)

app.get('/myPosts',middleware.loginMiddleware , api.myPosts)


module.exports = ({port, cb})=>{
    app.listen(port, cb)
}