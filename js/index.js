document.addEventListener('DOMContentLoaded', () => {
    let numberOfMonsters

    
    fetch('http://localhost:3000/monsters')
    .then(resp => resp.json())
    .then(json => {
        console.log(json)
        numberOfMonsters = json.length
        console.log(json[json.length - 1].id)
    })

    const limit = 50

    let pageNumber = 20

    fetchAndReturn(limit, pageNumber)

    document.getElementById('back').addEventListener('click', e => {
        if(pageNumber !== 1){
            while(document.getElementById('monster-container').firstChild){
                document.getElementById('monster-container').firstChild.remove()
            }
            pageNumber -- 
            fetchAndReturn(limit, pageNumber)
        }
    })
    document.getElementById('forward').addEventListener('click', e => {
        if(pageNumber !== Math.ceil(numberOfMonsters / 50)){
                while(document.getElementById('monster-container').firstChild){
                    document.getElementById('monster-container').firstChild.remove()
                }
                console.log(pageNumber)
                console.log(Math.ceil(numberOfMonsters / 50))
                pageNumber ++ 
            fetchAndReturn(limit, pageNumber)
            }           
        })

        document.getElementById('create-monster').innerHTML +=
        `<form id = 'newMonster'>
            <input id = 'name' placeholder = 'name'></input>
            <input id = 'age' placeholder = 'age'></input>
            <input id = 'description' placeholder = 'description'></input>
            <input type = 'submit' id = 'submit'></submit>
        </form>`

        let name = document.getElementById('name')
        let age = document.getElementById('age')
        let description = document.getElementById('description')

        document.getElementById('newMonster').addEventListener('submit', e => {
            e.preventDefault()
            if(name.value && age.value && description.value){
                fetch('http://localhost:3000/monsters/?', {
                    method: 'POST',
                    headers: {                      
                        "Content-Type": "application/json",
                        Accept: "application/json"
                        },
                    body:JSON.stringify({ 
                        name: name.value, 
                        age: parseInt(age.value), 
                        description: description.value 
                    })                                     
                })
                name.value = ''
                description.value = ''
                age.value = ''                  
            }
        })
})

const fetchAndReturn = (limit, pageNumber) => {
    fetch(`http://localhost:3000/monsters/?_limit=${limit}&_page=${pageNumber}`)
        .then( resp => resp.json())
        .then( json => {
            // console.log(json)
            json.forEach(e => {
                document.getElementById('monster-container').innerHTML += 
                    `<h2>${e.name}</h2>
                    <h4>${e.age}</h4>
                    <p>${e.description}</p>`
            })
        })
}