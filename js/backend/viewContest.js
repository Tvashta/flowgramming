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

window.onload = async () => {
    var joined = false
    await fetch(
        'http://localhost:5000/users/get/' + localStorage.getItem('userId')
    )
        .then((res) => res.json())
        .then((user) => {
            if (user.joinedContests.includes($('#getContestID').text()))
                joined = true
        })

    console.log(joined)
    console.log($('#getContestID').text())

    if (joined) {
        $('.problemLinks').each(function () {
            var id = this.id
            var problemID = id.split('-')[1]
            var problemName = $(this).text()
            var contestID = $('#getContestID').text()
            $(this).html(
                '<a href="/contest/problem/' +
                    contestID +
                    '&' +
                    problemID +
                    '">' +
                    problemName +
                    '</a>'
            )
        })
        $('#join').append(
            '<button class="btn btn-info float-md-right" onclick=\'exitContest()\'>Leave Contest</button>'
        )
        $('#rankings-info-div span').text('Showing some ranks')
    } else {
        $('#join').append(
            '<button class="btn btn-info float-md-right" onclick=\'joinContest()\'>Join Contest</button>'
        )
        $('#rankings-info-div span').text('Enter contest to view rankings')
    }
}

async function joinContest() {
    await postReq('http://localhost:5000/users/join', {
        id: localStorage.getItem('userId'),
        contestID: $('#getContestID').text(),
    })
    location.reload()
}

function showModal() {
    //Basically show a pop up saying you can only view problems when you join a contest
}

async function exitContest() {
    await postReq('http://localhost:5000/users/exit', {
        id: localStorage.getItem('userId'),
        contestID: $('#getContestID').text(),
    })
    location.reload()
}
