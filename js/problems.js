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

var constraints = [],
    sampleInput = [],
    sampleOutput = [],
    problemType = []

function addValue(e) {
    let val = $(`#${e.target.name}`).val()
    this[`${e.target.name}`].push(val)
    $('#' + e.target.name).val('')
    $(`#${e.target.name}List`).append('<li>' + val + '</li>')
}

$('#addproblem').on('submit', function (event) {
    event.preventDefault()
    addProblem()
})

$(document).on('click', '.openProblem', function (event) {
    let id = $(event.target).attr('data-id')
    location.assign('/problem/' + id)
})

function deleteProblem(id) {
    return fetch('http://localhost:5000/problems/' + id, {
        method: 'DELETE',
    }).then((response) => {
        location.reload()
    })
}

async function addProblem() {
    let formArray = $('#addproblem').serializeArray()
    let formData = {}
    for (let i = 0; i < formArray.length; i++) {
        formData[formArray[i]['name']] = formArray[i]['value']
    }
    if (formData['constraints'] !== '')
        constraints.push(formData['constraints'])
    formData['constraints'] = constraints

    if (formData['sampleInput'] !== '')
        sampleInput.push(formData['sampleInput'])
    formData['sampleInput'] = sampleInput

    if (formData['sampleOutput'] !== '')
        sampleOutput.push(formData['sampleOutput'])
    formData['sampleOutput'] = sampleOutput

    if (formData['problemType'] !== '')
        problemType.push(formData['problemType'])
    formData['problemType'] = problemType

    //Add escape html for form input

    await postReq('http://localhost:5000/problems', formData)
    location.reload()
}
