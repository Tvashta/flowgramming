var express = require('express')
var router = express.Router()
var Contest = require('../models/contest')
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
        joinedContests: [],
    })

    User.createUser(userObject, (err, user) => {
        if (err) res.send(err)
        res.status(200).json(user)
    })
})

router.get('/get/:id', (req, res) => {
    User.findById(req.params.id).exec((err, resp) => {
        if (err) res.send(err)
        res.send(resp)
    })
})

router.post('/join', (req, res) => {
    let user = req.body
    User.findByIdAndUpdate(user.id, {
        $addToSet: { joinedContests: user.contestID },
    }).exec((err, resp) => {
        if (err) res.send(err)
        else res.send(resp)
    })
})

router.post('/exit', (req, res) => {
    let user = req.body
    User.findByIdAndUpdate(user.id, {
        $pull: { joinedContests: user.contestID },
    }).exec((err, resp) => {
        if (err) res.send(err)
        else res.send(resp)
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
