window.onload = () => {
    let contestId = '',
        problemId = ''
    if (window.name.split('&').length > 1) {
        contestId = window.name.split('&')[1]
        problemId = window.name.split('&')[0]
    } else problemId = window.name
    fetch('http://localhost:5000/problems/' + problemId)
        .then((response) => response.json())
        .then((x) => {
            let html =
                '<main class="page"><section class="clean-block features"><div class="container"><div class="block-heading"><h2 class="text-info">' +
                x.name +
                '</h2></div></div><div class="container"><div class = "row"><div class="col-md-8"><h4 style="color: var(--bs-info);  text-decoration: underline;">Problem Description</h4><p>' +
                x.problemStatement +
                '</p><h4 style="color: var(--bs-info); text-decoration: underline;">Constraints</h4>'

            if(x.constraints) {
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