const bcrypt = require("bcrypt");
const Joi = require("joi");
const genAuthToken = require('../middleware/GenToken')
const { User } = require('../Models/User')
const express = require('express')

const router = express.Router()


router.post('/', async (req, res) => {
    const schema = Joi.object({
        email: Joi.string().min(3).required().email(),
        password: Joi.string().min(6).required()
    })
    const { error } = schema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    let user = await User.findOne({ email: req.body.email })
    if (!user) return res.status(400).send("Invalid email or password")
    const isValid = await bcrypt.compare(req.body.password, user.password)
    //compare password beetween database and clients provided 
    if (!isValid) return res.status(400).send("Invalid email or password")


    //store token 
    const token = genAuthToken(user)

    res.send(token)

})
module.exports = router