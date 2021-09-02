var mongoose = require('mongoose')

var problemSchema = mongoose.Schema({
    name: String,
    problemStatement: String,
    constraints: [String],
    sampleInput: [String],
    sampleOutput: [String],
    explanation: String,
    image: {
        data: Buffer,
        contentType: String,
    },
    timeLimit: Number,
    memoryLimit: Number,
    authors: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
    ],
    problemType: [String],
    visibility: String,
})

module.exports = mongoose.model('Problem', problemSchema)
