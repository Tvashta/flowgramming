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

window.onload = () => {
    let contestId = '',
        problemId = ''
    if (window.name.split('&').length > 1) {
        contestId = window.name.split('&')[1]
        problemId = window.name.split('&')[0]
    } else problemId = window.name
    console.log(window.name)
    fetch('http://localhost:5000/problems/' + problemId)
        .then((response) => response.json())
        .then((x) => {
            let html =
                '<main class="page"><section class="clean-block features"><div class="container"><div class="block-heading"><h2 class="text-info">' +
                x.name +
                '</h2></div></div><div class="container"><div class = "row"><div class="col-md-8"><h4 style="color: var(--bs-info);  text-decoration: underline;">Problem Description</h4><p>' +
                x.problemStatement +
                '</p><h4 style="color: var(--bs-info); text-decoration: underline;">Constraints</h4>'

            if (x.constraints) {
                x.constraints.map((y) => {
                    html += '<p>' + escapeHtml(y) + '</p>'
                })
            }

            html +=
                '</div><div class = "col-md-4"><h6 style="color: var(--bs-info); text-decoration: underline;">Time Limit</h6><p>' +
                x.timeLimit +
                '</p><h6 style="color: var(--bs-info);  text-decoration: underline;">Memory Limit</h6><p>' +
                x.memoryLimit +
                '</p><h6 style="color: var(--bs-info); text-decoration: underline;">Problem Type</h6>'
            x.problemType.map((y) => {
                html += '<p>' + escapeHtml(y) + '</p>'
            })

            html +=
                '</div></div></div> <div class="container"><div class="row"><div class="col-md-6"><h4 style="color: var(--bs-info); text-decoration: underline;">Sample Input</h4>'
            x.sampleInput.map((y) => {
                html += '<p>' + escapeHtml(y) + '</p>'
            })
            html +=
                '</div><div class="col-md-6"><h4 style="color: var(--bs-info); text-decoration: underline;">Sample Output</h4>'
            x.sampleOutput.map((y) => {
                html += '<p>' + escapeHtml(y) + '</p>'
            })
            html +=
                '</div></div></div><div class="container"><div class="row"><div class="col-md-12"><h4 style="color: var(--bs-info); text-decoration: underline;">Explanation</h4><p>' +
                x.explanation +
                '</p></div></div></div></section></main>'
            $('#problem').append(html)
            if (contestId !== '') {
                $('#problem').append(
                    '<div class="text-md-center"><button class="btn btn-success" id="submit">Submit answer</button></div><br><br>'
                )
                $('#submit').click(() => {
                    openNewTab('index.html', `${window.name}IDE`)
                })
            }
        })
}
