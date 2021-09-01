var express = require('express')
var router = express.Router()
var Contest = require('../models/contest')
var User = require('../models/user')
var Problem = require('../models/problem')
var ejs = require('ejs')

router.get('/create', (req, res) => {
    Problem.find({})
            .populate('authors')
            .exec((err, allProblems) => {
                if (err) res.send(err);
                res.render('createContest.ejs', {problems: allProblems })
            });
})

router.get('/view/:id', (req, res) => {
    Contest.findOne({ contestID: req.params.id })
        .populate('organizer')
        .populate('problems.problemObject')
        .populate('rankings.user')
        .exec((err, contest) => {
            if (err) res.send(err);
            res.render('viewContest.ejs', { contest: contest });
        });
});

// GET - view all contests.
router.get('/all', (req, res) => {
    setTimeout(() => {
        Contest.find({})
            .populate('organizer')
            .populate('problems.problemObject')
            .populate('rankings.user')
            .exec((err, allContests) => {
                if (err) res.send(err)
                res.status(200).json(allContests)
            })
    }, 1400)
})

router.post('/test', (req, res) => {
    console.log(req.body); 
});

// GET - view all ongoing contests.
router.get('/ongoing', (req, res) => {
    var today = new Date()
    Contest.find({
        contestStartTime: { $gte: today },
        contestEndTime: { $lte: today },
    })
        .populate('organizer')
        .populate('problems.problemObject')
        .populate('rankings.user')
        .exec()
        .then((ongoingContests) => {
            res.send(ongoingContests)
        })
})

// POST - add new contest
router.post('/new', (req, res) => {
    setTimeout(() => {
        var newContest = req.body
        var newContestObject = new Contest({
            contestID: newContest.contestID,
            name: newContest.name,
            description: newContest.description,
            judges: newContest.judges,
            contestStartTime: new Date(newContest.contestStartTime),
            contestEndTime: new Date(newContest.contestEndTime),
            password: newContest.password,
            problems: [],
        })

        var contestID = newContest.contestID
        Contest.createContest(newContestObject, (err, contest) => {
            if (err) {
                console.log(err)
                console.log('Error in creating a new contest')
                // TO-DO
            } else {
                if (newContest.organizer) {
                    User.findById(newContest.organizer)
                        .exec()
                        .then((organizer) => {
                            Contest.findOne({ contestID: contestID })
                                .exec()
                                .then((contest) => {
                                    console.log("2", contest);
                                    contest.organizer = organizer
                                    contest.save()
                                })
                        })
                }
                console.log("------------------------------", contestID);
                if (newContest.problems) {
                    var index = 0;
                    newContest.problems.forEach((problem) => {
                        
                        Problem.findOne({name: problem})
                            .exec()
                            .then((problemObj) => {
                                Contest.findOne({ contestID: contestID })
                                    .exec()
                                    .then((contest) => {
                                        contest.problems.push({
                                            problemObject: problemObj,
                                            points: newContest.points[index]
                                        })
                                        contest.save()
                                    })
                            });
                        index+=1;
                    })
                }
                Contest.findOne({ contestID: contestID }, (err, contest) => {
                    if (err) {
                        console.log('There was an error in contest creation')
                        // TO DO
                    } else {
                        res.status(200).json(contest)
                    }
                })
            }
        })
        
    }, 1200)
})

// POST - edit contest information
router.put('/edit', (req, res) => {
    var newContest = req.body
    var newContestObject = {
        name: newContest.name,
        description: newContest.description,
        judges: newContest.judges,
        contestStartTime: new Date(newContest.contestStartTime),
        contestEndTime: new Date(newContest.contestEndTime),
        password: newContest.password,
        problems: [],
    }

    var contestID = newContest._id
    Contest.findByIdAndUpdate(contestID, newContestObject, (err, contest) => {
        if (err) {
            console.log('Error in updating contest information')
            // TO-DO
        } else {
            console.log(contest)
            contestID = contest._id
        }
    })

    User.findById(newContest.organizer)
        .exec()
        .then((organizer) => {
            Contest.findOne({ contestID: contestID })
                .exec()
                .then((contest) => {
                    contest.organizer = organizer
                    contest.save()
                })
        })

    newContest.problems.forEach((problem) => {
        Problem.findById(problem)
            .exec()
            .then((problemObj) => {
                Contest.findOne({ contestID: contestID })
                    .exec()
                    .then((contest) => {
                        contest.problems.push(problemObj)
                        contest.save()
                    })
            })
    })

    Contest.findOne({ contestID: contestID }, (err, contest) => {
        if (err) {
            console.log('There was an error in contest creation')
            // TO DO
        } else {
            res.status(200).json(contest)
        }
    })
})

//POST - delete a contest
router.get('/delete', (req, res) => {
    var contestID = req.body.contestID
    Contest.findByIdAndDelete(contestID, (err, deletedContest) => {
        if (err) {
            console.log('Contest could not be deleted')
            // TO-DO
        } else {
            res.send(True)
        }
    })
})

module.exports = router
