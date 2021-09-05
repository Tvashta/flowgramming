$('#form').on('submit', function (event) {
    event.preventDefault()
    loginUser();
});

async function loginUser() {
    let email = $('#email-input').val();
    let password = $('#password-input').val();
    let formData = {
        email: email,
        password: password
    }
    fetch('http://localhost:5000/users/login', {
        method: 'POST',
        mode: 'cors',
        referrerPolicy: 'no-referrer',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
    }).then((response)=> response.json())
    .then((data)=> {
        if(data.error) {
            alert("Invalid Credentials");
            console.log("Invalid Credentials");
        } else {
            alert("User logged in!");
            localStorage.setItem('userId', data._id);
            console.log("User logged in", data._id, data.firstName);
        }
    });
}