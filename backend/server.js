var express = require('express')
var mongoose = require('mongoose')
var app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static(__dirname + '/public'))

var mongoConfig = require('../config/mongo')
var mongoURI = mongoConfig.MONGO_URI + mongoConfig.MAIN_DB

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
var db = mongoose.connection

var contestRouter = require('./contest')
var problemRouter = require('./problem')
app.use('/contest', contestRouter)
app.use('/problems', problemRouter)

const port = 5000

app.listen(port, () => console.log('Server running...'))

module.exports = app
