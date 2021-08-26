const express = require('express')
const mysql = require('mysql2')
const cors = require('cors')
const PORT = 4000

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
let table = `CREATE TABLE if NOT EXISTS submissions(
                          id int primary key auto_increment,
                          userid varchar(16) not null,
                          problemid varchar(16) not null,
                          code longtext not null,
                          points float default 0,
                          subtime datetime not null
                      )`

db.query(table, (err) => {
    if (err) console.log(err.message)
})

const app = express()
app.use(cors())
app.use(express.json())

app.post('/submitCode', (req, res) => {
    let code = req.body
    let sql = 'INSERT INTO submissions SET ?'
    let query = db.query(sql, code, (err, results) => {
        if (err) console.log(err)
        else res.json('Submission added')
    })
})

app.listen(PORT, () => console.log('Server is running on Port: ' + PORT))
