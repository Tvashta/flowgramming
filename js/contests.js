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

$(document).on('click', '.openContest', function (event) {
    console.log('asdfg')
    let id = $(event.target).attr('data-id')
    window.open('viewContest.html', id)
})
window.onload = () => {
    fetch('http://localhost:5000/contest/ongoing')
        .then((res) => res.json())
        .then((allContests) => {
            console.log(allContests)
            let html =
                '<div class="block-heading">' +
                '<h2 class="text-info">Ongoing Contests</h2>' +
                '<p>Here is a list of all currently ongoing contests</p><br>' +
                '<div class="table-responsive">' +
                '<table class="table">' +
                '<thead>' +
                '<tr>' +
                '<th>Contest ID</th>' +
                '<th>Contest Name</th>' +
                '<th>Start Time</th>' +
                '<th>End Time</th>' +
                ' <th>Authors</th>' +
                '</tr>' +
                '</thead>' +
                '<tbody>'

            allContests.map((contest, index) => {
                html +=
                    '<tr>' +
                    '<td>' +
                    '<span class="openContest" data-id="' +
                    contest.contestID +
                    '">' +
                    contest.contestID +
                    '</span>' +
                    '</td>' +
                    '<td>' +
                    contest.name +
                    '</td>' +
                    '<td>' +
                    new Date(contest.contestStartTime).toLocaleString('en-IN') +
                    '</td>' +
                    '<td>' +
                    new Date(contest.contestEndTime).toLocaleString('en-IN') +
                    '</td>'
                if (contest.organizer)
                    html +=
                        '<td>' +
                        contest.organizer.firstName +
                        ' ' +
                        contest.organizer.lastName +
                        '</td>'
                else html += '<td>Test User</td>'

                html += '</tr>'
            })
            html += '</tbody>  </table> </div> </div>'
            $('#allOngoingContestsDiv').append(html)
        })

    fetch('http://localhost:5000/contest/all')
        .then((res) => res.json())
        .then((allContests) => {
            let html =
                '<div class="block-heading">' +
                '<h2 class="text-info">All Contests</h2>' +
                '<p>Here are a list of all contests</p><br>' +
                '<div class="table-responsive">' +
                '<table class="table">' +
                '<thead>' +
                '<tr>' +
                '<th>Contest ID</th>' +
                '<th>Contest Name</th>' +
                '<th>Start Time</th>' +
                '<th>End Time</th>' +
                ' <th>Authors</th>' +
                '</tr>' +
                '</thead>' +
                '<tbody>'

            allContests.map((contest, index) => {
                html +=
                    '<tr>' +
                    '<td><span class="openContest" data-id="' +
                    contest.contestID +
                    '">' +
                    contest.contestID +
                    '</span></td>' +
                    '<td>' +
                    contest.name +
                    '</td>' +
                    '<td>' +
                    new Date(contest.contestStartTime).toLocaleString('en-IN') +
                    '</td>' +
                    '<td>' +
                    new Date(contest.contestEndTime).toLocaleString('en-IN') +
                    '</td>'
                if (contest.organizer)
                    html +=
                        '<td>' +
                        contest.organizer.firstName +
                        ' ' +
                        contest.organizer.lastName +
                        '</td>'
                else html += '<td>Test User</td>'

                html += '</tr>'
            })
            html += '</tbody>  </table> </div> </div>'
            $('#allContestsDiv').append(html)
        })
}
