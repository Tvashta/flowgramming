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
                window.open('viewProblem.html', id);
            })

            window.onload = () => {
                fetch('http://localhost:5000/problems')
                    .then((response) => response.json())
                    .then((data) => {
                        let html = '<div class="container block-heading">' +
                                        '<div class="table-responsive">' +
                                          '  <table class="table">' +
                                               ' <thead>' +
                                                   ' <tr>' +
                                                        '<th>S. No.</th>' +
                                                        '<th>Problem Name</th>' +
                                                        '<th>Creation Date</th>' +
                                                       ' <th>Visibility</th>' +
                                                   ' </tr>' +
                                                '</thead><tbody>';
                        data.map((problem, index) => {
                            html += '<tr>' +
                            '<td>'+ (index+1)+'</td>' +
                            '<td><span class="openProblem" data-id="'+problem._id+'">'+problem.name+'</span></td>';
                            
                            if(problem.author)
                                html += '<td>'+problem.author.firstName+' '+problem.author.lastName+'</td>'
                            else 
                                html += '<td>Test Author</td>';
                            
                            html += '<td><span class="visibilityTag'+problem.visibility+'">'+ problem.visibility +'</span></td>';
                            html+='</tr>';
                            
                        });
                        html += '</table></div></div>';
                        $('#problemsDiv').append(html)
                    })
            }

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
                await postReq('http://localhost:5000/problems', formData)
                location.reload()
            }