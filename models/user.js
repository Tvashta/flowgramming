var mongoose = require('mongoose')

var userSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    rollNumber: String,
    email: String,
    numberOfProblemsSolved: Number,
    rankByPoints: Number,
    totalPoints: Number,
})

module.exports = mongoose.model('User', userSchema)
