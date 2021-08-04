/* 
Todos:
- payToBank not working - set pay to 0 again
- show first laptop at render
- not be able to take a loan if bank = zero
- hide loan if loan = 0
- One image has broken URL
- delete unnecessary code
- style css
*/

//get html-elements as variables
const picture = document.getElementById('computerImage') 
const laptopsDropdown = document.getElementById('laptops')
const price = document.getElementById('price')
const description = document.getElementById('description')
const title = document.getElementById('title')

const workButton = document.getElementById('workButton')
const workSum = document.getElementById('workSum')
const bankButton = document.getElementById('bankButton')
const bankSum = document.getElementById('bankSum')
const loanButton = document.getElementById('loanButton')
const loanSum = document.getElementById('loanSum')
const loanDiv = document.getElementById('loanDiv')

let laptops = []
let pay = 0
let bank = 0
let loan = 0

//fetches laptops from API
function getLaptops() {
    try {
        fetch('https://noroff-komputer-store-api.herokuapp.com/computers')
        .then(response => response.json())
        .then(data => laptops = data)
        .then(laptops => addLaptopsToSelect(laptops))
    } catch (error) {
        console.log("Error: " + error)
    }
} 

getLaptops()

//adds laptops to select dropdown options
const addLaptopsToSelect = (laptops) => {
    for (const laptop of laptops) {
        const laptopOption = document.createElement("option")
        laptopOption.text = laptop.title
        laptopOption.value = laptop.id
        laptopsDropdown.appendChild(laptopOption)
    }
}

//shows info about selected computer
const handleLaptopChange = (e) => {
    const selectedLaptop = laptops[e.target.selectedIndex]
    //removes previous list of specs
    let element = document.getElementById("list");
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
    //show specs for selected computer
    let specsList = selectedLaptop.specs,
    ul = document.createElement('ul')
    document.getElementById('list').appendChild(ul)
    specsList.forEach(x => {
        let li = document.createElement('li')
        ul.appendChild(li)
        li.innerText += x
    })
    //show other computer info
    price.innerText = selectedLaptop.price
    description.innerText = selectedLaptop.description
    title.innerText = selectedLaptop.title
    picture.src= "https://noroff-komputer-store-api.herokuapp.com/" + selectedLaptop.image
    picture.alt = "image"
}
//bank and work functions
const calculateBalance = () => {
    bankSum.innerText = "Bank: " + bank + " kr"
    workSum.innerText = "Pay: " + pay + " kr"
    loanSum.innerText = "Loan: " + loan + " kr"
    //TODO if no loan - hidden
}

calculateBalance()
    
//work and earn 100 kr by clicking the work button
const handleWorkClick = () => {
    console.log(pay)
    pay += 100
    calculateBalance()
}

//send money frpom work to bank
const handleBankClick = () => {
    bank += pay
    pay = 0
    calculateBalance()
}

const takeLoan = () => {
    if (loan > 0) {
        alert("Pay back you current loan first!")
    }
    else {
        const newLoan = prompt("Please enter the amount you wish to loan: ")
        if (newLoan > (bank * 2)){
            alert("You must have more money on the bank to be able to take a loan!")
        }
        else {
            loan = newLoan
        }
    }
    calculateBalance()
}

workButton.addEventListener("click", handleWorkClick)
bankButton.addEventListener("click", handleBankClick)
loanButton.addEventListener("click", takeLoan)
laptopsDropdown.addEventListener("change", handleLaptopChange)