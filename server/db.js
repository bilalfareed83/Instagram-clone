const mongoose = require("mongoose")

module.exports= ({MONGO_URI})=>{
try {
    mongoose.connect
    (MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(()=>{
        console.log('Database connected')
    })
} catch (error) {
    console.log({message: error})
}
}