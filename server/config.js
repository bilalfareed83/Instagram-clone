require('dotenv').config()

console.log(process.env.NODE_ENV)
module.exports = {
    PORT: process.env.PORT || 5000,
    MONGO_URI: process.env.MONGO_URI,
    NODE_ENV: process.env.NODE_ENV || 'developement',
    JWT_KEY: process.env.JWT_KEY

}