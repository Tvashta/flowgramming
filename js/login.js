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

$('#form').on('submit', function (event) {
    event.preventDefault()
    loginUser()
})

async function loginUser() {
    let email = $('#email-input').val()
    let password = $('#password-input').val()
    let formData = {
        email: email,
        password: password,
    }

    
    // fetch('/users/login', {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify(formData),
    // })
    //     .then((response) => response.json())
    //     .then((data) => {
    //         if (data.error) {
    //             alert('Invalid Credentials')
    //             console.log('Invalid Credentials')
    //         } else {
    //             alert('User logged in!')
    //             localStorage.setItem('userId', data._id)
    //             console.log('User logged in', data._id, data.firstName)
    //         }
    //     })

    fetch('/test', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({name: "username"})
    })
    .then((data)=> {
        console.log(data);
    });
}
