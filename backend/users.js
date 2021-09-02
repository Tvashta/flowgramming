var express = require('express')
var router = express.Router()
var Contest = require('../models/contest')
var User = require('../models/user')
var Problem = require('../models/problem')
var User = require('../models/user')

// Create New User
router.get('/new', (req, res) => {
    var newUser = req.body
    var userObject = new User({
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        rollNumber: newUser.rollNumber,
        email: newUser.email,
        numberOfProblemsSolved: newUser.numberOfProblemsSolved,
        rankByPoints: newUser.rankByPoints,
        totalPoints: newUser.totalPoints,
        password: newUser.password,
        rules: newUser.rules,
    })

    User.createUser(userObject, (err, user) => {
        if (err) res.send(err)
        res.status(200).json(user)
    })
})

// Login User
router.get('/login', (req, res) => {
    var email = req.body.email
    User.findOne({ email: email }).exec((err, user) => {
        if (err) res.send(err)
        user.comparePassword(
            req.body.password,
            user.password,
            (err, isMatch) => {
                if (err) res.send(err)
                req.user = user
                res.status(200).json(user)
            }
        )
    })
})

module.exports = router
