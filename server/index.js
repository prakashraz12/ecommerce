const express = require("express")
const app = express();
const cors = require('cors')
const mongoose = require("mongoose")
const register = require("./routes/register")
const login = require('./routes/login')
require("dotenv").config()



const products = require('./product')
const port = process.env.PORT || 4000;
app.use(express.json())
app.use(cors())
app.use('/api/register', register)
app.use('/api/login', login)



app.get("/", (req, res) => {
    res.send("hwllo k cha jta kt h?")
})
app.get("/products", (req, res) => {
    res.send(products)
})

app.listen(port, () => {
    try {
        console.log(`started at ${port}`)
    } catch (error) {
        console.log(error)
    }
})


const database = () => {

    mongoose.connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => {
        console.log("Database connected")
    }).catch((error) => {
        console.log(`Mongodb ${error}`)
    })


}
database()