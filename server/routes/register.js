const bcrypt = require("bcrypt");
const Joi = require("joi");
const genAuthToken = require('../middleware/GenToken')
const {User} = require('../Models/User')
const express = require('express')

const router = express.Router()

router.post('/', async (req, res) => {
    const schema = Joi.object({
        name: Joi.string().min(3).required(),
        email: Joi.string().min(3).required().email(),
        password: Joi.string().min(6).required()
    })
    const { error } = schema.validate(req.body)
    if (error)
        return res.status(400).send(error.details[0].message)
    let user = await User.findOne({ email: req.body.email })
    if (user) return res.status(400).send("User already exist..")
   user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    })

    //hasing password before save to database
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt)

   user = await user.save()
//
    const token = genAuthToken(user)
    res.send(token)


})

module.exports = router;