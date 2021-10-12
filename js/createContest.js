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

var problems = []
$(document).ready(() => {
    getAllProblems()
})

async function getAllProblems() {
    await fetch('/problems/all')
        .then((response) => response.json())
        .then((data) => {
            problems = data
            console.log(problems)
        })
}

$('#createContestBtn').click(() => {
    var appendString =
        '<br><div class="problem"><label class="w-25 float-md-left">Problem Name</label><select name="problems" class="form-control w-50" autocomplete="on">'
    for (var i = 0; i < problems.length; i++) {
        appendString += '<option value="' + problems[i].name + '">'
        appendString += problems[i].name + ' (' + problems[i].visibility + ')'
        appendString += '</option>'
    }
    appendString += '</select>'
    appendString +=
        '<label class="w-25 float-md-left">Points</label><input type="number" class="form-control w-50">'
    appendString +=
        '<button class="btn-sm btn btn-danger form-inline delete-btn">Delete</button></div>'
    $('.problems-group').append(appendString)
})

$(document).on('click', '.delete-btn', (e) => {
    $(e.target.parentNode).remove()
})

$('#submit-btn').click(async () => {
    var formData = $('#form').serializeArray()
    console.log(formData)
    var data = {}
    data.problems = []
    data.points = []
    var startDate, startTime, endDate, endTime
    for (var i = 0; i < formData.length; i++) {
        if (formData[i].name == 'contestStartTime')
            startTime = formData[i].value
        if (formData[i].name == 'contestStartDate')
            startDate = formData[i].value
        if (formData[i].name == 'contestEndTime') endTime = formData[i].value
        if (formData[i].name == 'contestEndDate') endDate = formData[i].value

        if (formData[i].name == 'problems')
            data.problems.push(formData[i].value)
        else if (formData[i].name == 'points')
            data.points.push(formData[i].value)
        else if (
            formData[i].name == 'contestStartTime' ||
            formData[i].name == 'contestStartDate' ||
            formData[i].name == 'contestEndTime' ||
            formData[i].name == 'contestEndDate'
        )
            continue
        else data[formData[i].name] = formData[i].value
    }
    var contestStartTime = startDate + 'T' + startTime + '+05:30'
    var contestEndTime = endDate + 'T' + endTime + '+05:30'
    data.contestStartTime = contestStartTime
    data.contestEndTime = contestEndTime

    console.log(data)

    await fetch('http://localhost:5000/contest/new', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
        .then((response) => response.json())
        .then((data) => {
            window.location.replace('/contests/' + data.contestID)
        })
})
