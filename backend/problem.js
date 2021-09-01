const express = require('express')
const mongoose = require('mongoose')
const app = express.Router()

let problemsModel = require('../models/problem');

app.route('/')
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

app.route('/:id')
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

module.exports = app