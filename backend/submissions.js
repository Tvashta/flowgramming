const express = require('express')
const mysql = require('mysql2')
const app = express.Router()

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'thetiredtrinity',
    database: 'flowgramming',
    multipleStatements: true,
})

db.connect((err) => {
    if (err) console.log(err)
    else console.log('Connected to DB')
})
let table = `CREATE TABLE if NOT EXISTS submissions
             (
                 id
                 int
                 primary
                 key
                 auto_increment,
                 userid
                 varchar
             (
                 16
             ) not null,
    problemid varchar
             (
                 128
             ) not null,
    code longtext not null,
    points float default 0,
    subtime datetime not null
    )`

db.query(table, (err) => {
    if (err) console.log(err.message)
})

app.route('/')
    .post((req, res) => {
        let code = req.body
        let sql = 'INSERT INTO submissions SET ?'
        let query = db.query(sql, code, (err, results) => {
            if (err) console.log(err)
            else res.json('Submission added')
        })
    })
    .get((req, res) => {
        let query = db.query('SELECT * from submissions', (err, results) => {
            if (err) console.log(err)
            else res.json(results)
        })
    })

module.exports = app
