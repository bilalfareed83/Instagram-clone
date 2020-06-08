const express = require('express')
const app = express()
const api = require('./api')

app.use(express.json())

app.post('/signin', api.signin)

app.post('/signup', api.signup)

module.exports = ({port, cb})=>{
    app.listen(port, cb)
}