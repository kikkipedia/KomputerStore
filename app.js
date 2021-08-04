
//self executing function 
(async function (){
    const picture = document.createElement("img") 

    const laptopsDropdown = document.getElementById('laptops')
    const laptopInfo = document.getElementById('laptop-info')
    const price = document.getElementById('price')
    const description = document.getElementById('description')
    const title = document.getElementById('title')
    const workButton = document.getElementById('workButton')
    const workSum = document.getElementById('workSum')
    const bankButton = document.getElementById('bankButton')
    const bankSum = document.getElementById('bankSum')
    const loanButton = document.getElementById('loanButton')
    const loanSum = document.getElementById('loanSum')

    //fetches all laptops from API
    async function getLaptops() {
        try {
            const response = await fetch('https://noroff-komputer-store-api.herokuapp.com/computers')
            const laptops = await response.json()
            return laptops
        } catch (error) {
            console.log("Error: " + error)
        }
    }   
    const laptops = await getLaptops()
    
    console.log(laptops)

    //fills select-menu with laptop options
    function addLaptopsToSelect(laptops) {
        for (const laptop of laptops) {
            const laptopOption = document.createElement("option")
            laptopOption.text = laptop.title
            laptopOption.value = laptop.id
            laptopsDropdown.appendChild(laptopOption)
        }
    }
    addLaptopsToSelect(laptops)

    //shows info about selected laptop
    const handleLaptopChange = (e) => {
        const selectedLaptop = laptops[e.target.selectedIndex]
        //TODO! Image not working
        //TODO! show list of specs
        price.innerText = selectedLaptop.price
        description.innerText = selectedLaptop.description
        title.innerText = selectedLaptop.title
        picture.src= "https://noroff-komputer-store-api.herokuapp.com/computers/" + selectedLaptop.image
        picture.alt = "image"     
    } 

    //work and earn 100 kr by clicking the work button
    let payCheck = 100
    let paySum = 0
    function handleWorkClick() {
        paySum+=payCheck
        workSum.innerHTML=paySum
    }

    //transfers the money from work balance to bank balance
    function payToBank() {
        //TODO! if has outstanding loan
        bankSum.innerHTML=workSum.innerHTML
    }

    //take a loan and fulfill requirements
    function takeLoan() {
        let currentLoan = loanSum.innerHTML
        if (currentLoan > 0) {
            alert("Pay back you current loan first!")
        }
        else {
            const loan = prompt("Please enter the amount you wish to loan: ")
            if (loan > parseFloat(bankSum.innerHTML) * 2){
                alert("Your loan must be smaller")
             }
            else {
                loanSum.innerHTML = loan
            }
        }
    }

    laptopsDropdown.addEventListener("change", handleLaptopChange)
    workButton.addEventListener("click", handleWorkClick)
    bankButton.addEventListener("click", payToBank)
    loanButton.addEventListener("click", takeLoan)

})()


