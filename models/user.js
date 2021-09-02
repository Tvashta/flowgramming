var mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
var userSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    rollNumber: String,
    email: String,
    numberOfProblemsSolved: Number,
    rankByPoints: Number,
    totalPoints: Number,
    password: String,
    rules: [String],
    joinedContests: [String],
})

module.exports = mongoose.model('User', userSchema)

module.exports.createUser = function (newUser, callback) {
    bcrypt.genSalt(5, function (err, salt) {
        if (err) console.log(err)
        else {
            bcrypt.hash(newUser.password, salt, function (err, hash) {
                newUser.password = hash
                newUser.save(callback)
            })
        }
    })
}

module.exports.comparePassword = function (candidatePassword, hash, callback) {
    bcrypt.compare(candidatePassword, hash, function (err, isMatch) {
        callback(err, isMatch)
    })
}
