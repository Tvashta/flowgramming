var mongoose = require('mongoose')
var bcrypt = require('bcryptjs')

var contestSchema = mongoose.Schema({
    contestID: String,
    name: String,
    description: String,
    organizer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    judges: [String],
    contestStartTime: Date,
    contestEndTime: Date,
    password: String,
    problems: [
        {
            problemObject: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Problem',
            },
            points: Number,
        },
    ],
    rankings: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
            },
            points: Number,
        },
    ],
})

module.exports = mongoose.model('Contest', contestSchema)

module.exports.createContest = function (newContest, callback) {
    bcrypt.genSalt(5, function (err, salt) {
        if (err) console.log(err)
        else {
            bcrypt.hash(newContest.password, salt, function (err, hash) {
                newContest.password = hash
                newContest.save(callback)
            })
        }
    })
}

module.exports.comparePassword = function (candidatePassword, hash, callback) {
    bcrypt.compare(candidatePassword, hash, function (err, isMatch) {
        callback(err, isMatch)
    })
}
