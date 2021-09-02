const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static(__dirname + '/public'))
app.use(cors())
const mongoConfig = require('../config/mongo')
const mongoURI = mongoConfig.MONGO_URI + mongoConfig.MAIN_DB

mongoose
    .connect(mongoURI, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
    })
    .then(() => {
        console.log('DB Connected')
    })
    .catch((err) => {
        console.log(err)
    })
const db = mongoose.connection

const contestRouter = require('./contest')
const problemRouter = require('./problem')
const submissionRouter = require('./submissions')
const userRouter = require('./users')
app.use('/contest', contestRouter)
app.use('/problems', problemRouter)
app.use('/submissions', submissionRouter)
app.use('/users', userRouter);
const port = 5000


var User = require('../models/user')
var newUser = new User({
    firstName: 'Ritwik',
    lastName: 'M',
    email: 'faculty@cb.amrita.edu',
    password: 'flowgramming',
    rules: ['Faculty'],
})




app.listen(port, () => console.log('Server running...'))

module.exports = app
