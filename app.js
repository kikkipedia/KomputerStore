/* 
Todos:
- show first laptop at render
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
const payLoanButton = document.getElementById('payLoanButton')

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

//shows the balances
const calculateBalance = () => {
    bankSum.innerText = "Bank: " + bank + " kr"
    workSum.innerText = "Pay: " + pay + " kr"
    loanSum.innerText = "Loan: " + loan + " kr"
    if (loan === 0) {
        loanDiv.style.display = "none"
        payLoanButton.style.display = "none"
    }
    else {
        loanDiv.style.display = "block"
        payLoanButton.style.display = "block"
    }
}
calculateBalance()
    
//work and earn 100 kr by clicking the work button
const handleWorkClick = () => {
    pay += 100
    calculateBalance()
}

//send money from work to bank
const handleBankClick = () => {
    if (loan > 0) {
        //deduct 10% and pay loan with it
        let deduction = pay * 0.10
        bank += pay - deduction
        loan -= deduction
        pay = 0
    }
    else {
        bank += pay
        pay = 0
    }
    calculateBalance()
}

//take a loan but most 2x bank balance
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

const repayLoan = () => {
    loan -= pay
    if (loan <= 0) {
        loan = 0
    }
    calculateBalance()
}

laptopsDropdown.addEventListener("change", handleLaptopChange)
workButton.addEventListener("click", handleWorkClick)
bankButton.addEventListener("click", handleBankClick)
loanButton.addEventListener("click", takeLoan)
payLoanButton.addEventListener("click", repayLoan)