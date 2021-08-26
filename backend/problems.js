const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const PORT = 4000

const uri =
    'mongodb+srv://flowgramming:thetiredtrinity@cluster0.vg4hl.mongodb.net/flowgrammingdB?retryWrites=true&w=majority'
const app = express()
app.use(cors())
app.use(express.json())

mongoose.connect(
    uri,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => {
        console.log('Connected to db!')
        app.listen(PORT, () => console.log('Server Up and running'))
    }
)

const problemSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    description: {
        type: String,
    },
})

let problemsModel = mongoose.model('Problems', problemSchema)

app.route('/problems')
    .get((req, res) => {
        problemsModel.find({}, (error, result) => {
            if (error) res.json(error.message)
            res.json(result)
        })
    })
    .post(async (req, res) => {
        let problems = new problemsModel(req.body)
        try {
            await problems.save()
            res.json('Problem Added')
        } catch (err) {
            res.json(err.message)
        }
    })

app.route('/problems/:id')
    .get((req, res) => {
        problemsModel.findOne({ _id: req.params.id }, (error, result) => {
            if (error) res.json(error.message)
            res.json(result)
        })
    })
    .delete((req, res) => {
        problemsModel.findByIdAndRemove(req.params.id, (error, result) => {
            if (error) res.json(error.message)
            res.json('Deleted Problem')
        })
    })
