// Dropdown from api at loading page
let dropdown = document.getElementById('laptop-dropdown')
dropdown.length = 0
let defaultOption = document.createElement('option')
defaultOption.text = 'Choose laptop'
dropdown.addEventListener(defaultOption)
dropdown.selectedIndex = 0
fetch ('https://noroff-komputer-store-api.herokuapp.com/computers')
    .then(
        function(response) {
            if(response.status !== 200) {
                console.warn('A problem occured: ' + response.status)
                return  
            }
            response.json()
            .then(function(data) {
                let option
                for(let i = 0; i<data.length; i++) {
                    option = document.createElement('option')
                    option.text = data[i].title
                    option.value = data[i].id 
                    dropdown.add(option)
                }
            })
        }
    ). catch(function(err) {
        console.error('err')
    })

