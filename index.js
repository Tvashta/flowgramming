/*
 # *************************************************************************************
 # Copyright (C) 2021 Ritwik Murali, Harshit Agarwal, Rajkumar S, Gali Mary Sanjana
 # This file is part of Flowgramming <https://github.com/flowgrammers-org/flowgramming>.
 #
 # Flowgramming is free software: you can redistribute it and/or modify
 # it under the terms of the GNU General Public License as published by
 # the Free Software Foundation, either version 3 of the License, or
 # (at your option) any later version.
 #
 # Flowgramming is distributed in the hope that it will be useful,
 # but WITHOUT ANY WARRANTY; without even the implied warranty of
 # MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 # GNU General Public License for more details.
 #
 # You should have received a copy of the GNU General Public License
 # along with Flowgramming.  If not, see <http://www.gnu.org/licenses/>.
 # *************************************************************************************
 */

const express = require('express')
const serveIndex = require('serve-index')
const ejs = require('ejs')
const axios = require('axios')
const cookieParser = require("cookie-parser");
const sessions = require('express-session');
const sessionSecret = require('./config/session').SECRET;
const cors = require('cors')

const app = express()

app.listen(3000)
console.log('Flowgramming listening at http://localhost:3000')

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static(__dirname))
app.use(cors())

app.get('/', (req, res) => {
    res.sendFile('/index.html')
})

const oneDay = 1000 * 60 * 60 * 24;
//session middleware
app.use(sessions({
    secret: sessionSecret,
    saveUninitialized:true,
    cookie: { maxAge: oneDay },
    resave: false
}));
var session;
app.use(cookieParser());
app.use(function (req, res, next) {
    res.locals.currentUser = req.session.user;
    res.locals.facultyRuleID = 'Faculty';
    next();
});

function checkUserLoggedIn (req, res, next) {
    if(req.session.user) {
        next();
    }
    else {
        res.redirect('/login')
    }
}

const serverUrl = 'http://localhost:5000'

app.get('/problems', checkUserLoggedIn, async (req, res) => {
    await axios
        .get(serverUrl + '/problems')
        .then((problems) => {
            res.render('problems.ejs', { problems: problems.data })
        })
        .catch((err) => res.send(err))
})

function getUserId() {
    //Have to add session details, isAuth
    //Temporarily using localStorage
}

app.get('/problems/all', checkUserLoggedIn, async(req, res) => {
    await axios
        .get(serverUrl + '/problems')
        .then((problems) => {
            res.json(problems.data);
        })
        .catch((err) => res.send(err))
});

app.get('/problem/:id', checkUserLoggedIn, async (req, res) => {
    await axios
        .get(serverUrl + '/problems/' + req.params.id)
        .then((problem) => {
            res.render('viewProblem.ejs', {
                problem: problem.data,
                contestId: null,
            })
        })
        .catch((err) => res.send(err))
})

app.get('/contest/problem/:cid&:id', checkUserLoggedIn, async (req, res) => {
    await axios
        .get(serverUrl + '/problems/' + req.params.id)
        .then((problem) => {
            res.render('viewProblem.ejs', {
                problem: problem.data,
                contestId: req.params.cid,
            })
        })
        .catch((err) => res.send(err))
})

// CONTESTS BACKEND

app.get('/contests', checkUserLoggedIn, async (req, res) => {
    await axios
        .get(serverUrl + '/contest/all')
        .then(async (allContests) => {
            await axios
                .get(serverUrl + '/contest/ongoing')
                .then((ongoingContests) => {
                    res.render('contests.ejs', {allContests: allContests.data, ongoingContests: ongoingContests.data});
                })
                .catch((err) => res.send(err))
        })
        .catch((err) => res.send(err))
});

app.get('/contests/new', checkUserLoggedIn, async(req, res) => {
    await axios
        .get(serverUrl + '/problems')
        .then((problems) => {
            res.render('createContest.ejs', { problems: problems.data })
        })
        .catch((err) => res.send(err))
});

app.get('/contests/:id', checkUserLoggedIn, async (req, res) => {
    await axios
        .get(serverUrl + '/contest/id/' + req.params.id)
        .then((contest) => {
            res.render('viewContest.ejs', { contest: contest.data })
        })
        .catch((err) => res.send(err))
});

app.get('/login', (req,res)=>{
    res.render('login.ejs');
});

app.post('/users/login', async(req,res) => {
    var body = req.body;
    await axios 
          .post(serverUrl+'/users/login', body)
          .then((user) => {
              user = user.data;
              if(user.error) {
                  // TO-DO AUTH ERROR
              } else {
                  session = req.session;
                  session.user = user;
              }
            res.redirect('/landing.html')
          });
});


