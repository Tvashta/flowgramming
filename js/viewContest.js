window.onload = async ()=>{
    var joined = false
    await fetch(
                'http://localhost:5000/users/get/' +
                localStorage.getItem('userId')
                )
                .then((res) => res.json())
                .then((user) => {
        if (user.joinedContests.includes(window.name))
                joined = true
        });


        console.log(joined)
    console.log(window.name)
    await fetch("http://localhost:5000/contest/id/"+window.name)
    .then(res => res.json())
    .then(contest=>{
      let html ='<br><br><br><h2 id="contestName">'+ contest.contestID + ' - ' + contest.name+'</h2>' +
          '    <p id="contestDescription">'+contest.description+'</p>' +
          '    <div class="container">'
    if (joined)
                            html +=
                                '<p class="text-center"> Currently in Contest!! </p>'
      if(contest.organizer)
        html+='<strong>Organizer: </strong>'+contest.organizer.firstName+contest.organizer.lastName
      html+= '      <br>' +
          '      <strong>Contest Start Time: </strong>'+new Date(contest.contestStartTime).toLocaleString("en-IN")+
          '      <br>' +
          '      <strong>Contest End Time: </strong>'+ new Date(contest.contestEndTime).toLocaleString("en-IN") +
          '    </div>' +
          '    <br>' +
          '    <table class="table">' +
          '      <thead class="thead-dark">' +
          '      <tr>' +
          '        <th scope="col">#</th>' +
          '        <th scope="col">Problem Name</th>' +
          '        <th scope="col">Points</th>' +
          '        <th scope="col">Author</th>' +
          '      </tr>' +
          '      </thead>' +
          '      <tbody>'

                        contest.problems.map((problem, index) => {
                            console.log(problem)
                            html +=
                                '      <tr>' +
                                '        <th scope="row">' +
                                (index + 1) +
                                '</th>'
                            if (joined)
                                html +=
                                    "        <td><a class='joinedContest' onclick=openNewTab('viewProblem.html',\"" +
                                    problem.problemObject._id +
                                    '&' +
                                    contest.contestID +
                                    '")>'
                            else html += '        <td><a onclick="showModal()">'
                            html +=
                                problem.problemObject.name +
                                '</a></td>' +
                                '        <td>' +
                                problem.points +
                                '</td>'
                            if (problem.problemObject.authors.length > 0)
                                html +=
                                    '        <td' +
                                    problem.problemObject.authors +
                                    '</td>'
                            else html += '        <td>Test Author</td>'
                        })
      html+=
          '      </tr>' +
          '      </tbody>' +
          '    </table>'

                        $('#contest').append(html)
                    })
                if (joined) {
                    $('#join').append(
                        '<button class="btn btn-info float-md-right" onclick=\'exitContest()\'>Leave Contest</button>'
                    )
                    $('#rankings-info-div span').text('Showing some ranks')
                } else {
                    $('#join').append(
                        '<button class="btn btn-info float-md-right" onclick=\'joinContest()\'>Join Contest</button>'
                    )
                    $('#rankings-info-div span').text(
                        'Enter contest to view rankings'
                    )
                }
            }
      
      

            async function joinContest() {
                await postReq('http://localhost:5000/users/join', {
                    id: localStorage.getItem('userId'),
                    contestID: window.name,
                })
                location.reload()
            }
            function showModal() {
                //Basically show a pop up saying you can only view problems when you join a contest
            }
            async function exitContest() {
                await postReq('http://localhost:5000/users/exit', {
                    id: localStorage.getItem('userId'),
                    contestID: window.name,
                })
                location.reload()
            }