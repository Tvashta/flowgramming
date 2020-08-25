paper.on('element:pointerdblclick', function (elementView) {
    handleElementDoubleClick(elementView)
})

function handleElementDoubleClick(elementView) {
    const id = elementView.model.id
    const currentElement = findModel(id)

    if (currentElement.attr('element/type') === 'declare') {
        $('#modal .modal-body').html(`
            <p>Enter Variable Name and Type</p>
             <div class="input-group">
                <input id="variable" type="text" class="form-control" aria-label="Text input with dropdown button" placeholder="Variable Name">
                <p id="variableType" hidden>Default</p>
                <div class="input-group-append">
                    <button id="dataTypeButton" class="btn btn-outline-secondary dropdown-toggle"
                     type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        DataType
                    </button>
                    <div class="dropdown-menu">
                        <a class="dropdown-item" onclick="toggleDataType('Integer')">Integer</a>
                        <a class="dropdown-item" onclick="toggleDataType('Float')">Float</a>
                        <a class="dropdown-item" onclick="toggleDataType('Char')">Character</a>
                        <button id="arrayTypeButton" class="btn btn-outline-secondary dropdown-toggle"
                        type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Array
                        </button>
                           <div class="dropdown-menu">
                           <a class="dropdown-item" onclick="toggleDataType('Integer array')">Integer</a>
                           <a class="dropdown-item" onclick="toggleDataType('Float array')">Float</a>
                           <a class="dropdown-item" onclick="toggleDataType('Char array')">Character</a>
                    </div>
                </div>
            </div>
            </div>
    `)
        $('#modal').modal('show')
        $('#okButton').one('click', function () {
            const variableName = $('#variable').val()
            const variableType = $('#variableType').text().trim()
            $('#modal').modal('hide')
            if (variableName.length <= 0) {
                alert('Error: Please enter the variable name before declaring the variable')
            } else if (variableType === 'Default') {
                alert('Error: Please enter the variable type before declaring the variable')
            } else {
                const regex = new RegExp('^[a-zA-Z_][a-zA-Z0-9_]*$')
                const keyWords = ['int', 'float', 'string', 'array', 'char', 'if', 'else', 'while', 'for',
                    'switch', 'case', 'default', 'break', 'continue', 'auto', 'const', 'let', 'var', 'do',
                    'foreach', 'enum', 'long', 'register', 'return', 'short', 'signed', 'sizeof', 'static',
                    'struct', 'typedef', 'union', 'unsigned', 'void', 'volatile', 'new', 'throw', 'catch',
                    'printf', 'scanf', 'print', 'cin', 'cout', 'scanner', 'list', 'in', 'true', 'false', 'null', 'None', 'not']
                if (!regex.test(variableName)) {
                    alert('Follow naming convention while declaring a variable \n \n'
                        + '-> Variable name should start only either with an underscore or an alphabet. It should not start with number or any other special symbols. \n'
                        + '-> Other characters apart from first character can be alphabets, numbers or _ character. \n'
                        + '-> Variable name should not contain space. \n'
                    )
                } else if (keyWords.includes(variableName)) {
                    alert('Variable name must not be a keyword. \n')
                } else {
                    currentElement.attr({
                        label: {
                            text: getWrapText(variableType + ' ' + variableName)
                        },
                        element: {
                            variableName,
                            variableType
                        }
                    })
                }
            }
        })
    } else if (currentElement.attr('element/type') === 'input') {
        $('#modal .modal-body').html(`
            <p>Enter Variable Name</p>
            <div class="input-group">
                <input id="variable" type="text" class="form-control" aria-label="Text input with dropdown button">
            </div>
    `)
        $('#modal').modal('show')
        $('#okButton').one('click', function () {
            const variableName = $('#variable').val()
            if (variableName.length > 0) {
                $('#modal').modal('hide')
                currentElement.attr({
                    label: {text: getWrapText('Input ' + variableName)},
                    element: {
                        variableName,
                    }
                })
            }
        })
    } else if (currentElement.attr('element/type') === 'output' || currentElement.attr('element/type') === 'if') {
        $('#modal .modal-body').html(`
            <p>Enter the expression</p>
            <div class="input-group">
                <input id="exp" type="text" class="form-control" aria-label="Text input with dropdown button">
            </div>
    `)
        $('#modal').modal('show')
        $('#okButton').one('click', function () {
            const expression = $('#exp').val()
            if (expression.length > 0) {
                $('#modal').modal('hide')
                currentElement.attr({
                    label: {
                        text: getWrapText(
                            (currentElement.attr('element/type') !== 'if' ? 'Print ' : '') + expression
                        )
                    },
                    element: {
                        expression
                    }
                })
            }
        })
    } else if (currentElement.attr('element/type') === 'assignment') {
        $('#modal .modal-body').html(`
            <p>Select a variable and enter the value</p>
            <div class="input-group mb-3">
              <input type="text" id="variableName" class="form-control" placeholder="Variable name">
              <input type="text" id="variableValue" class="form-control" placeholder="Variable value">
            </div>
            `)
        $('#modal').modal('show')
        $('#okButton').one('click', function (event) {
            const variableValue = $('#variableValue').val()
            const variableName = $('#variableName').val()
            if (variableValue.length > 0 && variableName.length > 0) {
                $('#modal').modal('hide')
                currentElement.attr({
                    label: {text: getWrapText(variableName + ' = ' + variableValue)},
                    element: {
                        variableName,
                        variableValue
                    }
                })
            }
        })
    }
}

function toggleDataType(dataType) {
    $('#variableType').text(dataType)
    $('#dataTypeButton').text(dataType)
}
