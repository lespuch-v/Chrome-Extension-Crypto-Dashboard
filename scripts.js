import * as qdata from "./quotes.js"


let myQuoteData = qdata.default

const cryptoButtons = document.querySelectorAll(".btn-c")
const cryptoValues = document.querySelector(".cryptoSection")
const curTime = document.getElementById("time")
const quote = document.querySelector(".container-middle")
const arrCrypto = ["bitcoin", "ethereum", "dogecoin"]

// MODAL
const btnCloseModal = document.querySelector(".btnCloseModal")
const coffeeModal = document.querySelector(".myAwesomeModal")



// Checking for event listeners on the Crypto Buttons
cryptoButtons.forEach(function(item){
    item.addEventListener("click", (e)=>{
        if(e.target.classList.contains("bitcoin")){
            console.log("BTN-CLICKED-bitcoin")
            getCryptoBTC(arrCrypto[0])
        }else if (e.target.classList.contains("ethereum")){
            console.log("ethereum")
            getCryptoBTC(arrCrypto[1])
        }else if(e.target.classList.contains("dogecoin")){
            console.log("dogecoin")
            getCryptoBTC(arrCrypto[2])
        }else if(e.target.classList.contains("coffee")){
            getCoffeeImage()
        }
    })
})


// Fetching data from the coingecko.com
async function getCryptoBTC(crypto) {
    let response = await fetch(`https://api.coingecko.com/api/v3/coins/${crypto}`)
    let data = await response.json()
    cryptoValues.innerHTML = 
    `
    <img class="cryptoSection" src="${data.image.large}" alt="crypto-logo" width="150" height="150">
    <div class="cryptoValues">
        <h3 class="cryptoValues curprice">Current price: ${new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 3 }).format(data.market_data.current_price["usd"])} <i class="fas fa-dollar-sign"></i> <img class="imgLogo" src="images/dolar.png" alt=""></h3>
        <h3 class="cryptoValues">Price change 24h: ${new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 3 }).format(data.market_data.price_change_percentage_24h)} <img class="imgLogo" src="images/percantage.png" alt=""></h3>
        <h3 class="cryptoValues High">High 24: ${new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 3 }).format(data.market_data.high_24h["usd"])} <i class="fas fa-dollar-sign"></i> <img class="imgLogo" src="images/trend-up.png" alt=""></h3>
        <h3 class="cryptoValues low">Low 24: ${new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 3 }).format(data.market_data.low_24h["usd"])} <i class="fas fa-dollar-sign"></i> <img class="imgLogo" src="images/trend-down.png" alt=""></h3>
    </div>
    `

}

// Time
const currentTime = () => {
    let today = new Date()
    let hours  = today.getHours()
    let minutes = today.getMinutes()
    let seconds = today.getSeconds()

    //seconds
        curTime.innerHTML = 
        `
        <h1>${hours < 10 ? `0${hours}`: hours}:${minutes < 10 ? `0${minutes}`: minutes}:${seconds < 10 ? `0${seconds}`: seconds}</h1>
        `
}

// Gets random Quote from the array
function getQuote(){
    let randomNumber = (Math.floor(Math.random() * myQuoteData.length)) 
    let randomNumber2 = (Math.floor(Math.random() * myQuoteData.length)) 
    quote.innerHTML = `<h1 class="quoteStyling">${randomNumber != randomNumber2 ? myQuoteData[randomNumber] : myQuoteData[randomNumber - 1]}</h1>`
}

/* COFFEE */

async function getCoffeeImage(){
    // Open and Close MODAL
    if(coffeeModal.style.display === "block"){
        coffeeModal.style.display = "none"
    }else{
        coffeeModal.style.display = "block"
        fetch("https://meme-api.herokuapp.com/gimme")
            .then(response => response.json())
            .then(data => {
            coffeeModal.style.backgroundImage = `url(${data.url})`
        })
    }

    // Getting Image
    

}

getCryptoBTC(arrCrypto[0])
setInterval(currentTime, 1000)
setInterval(getQuote, 5000)

// Getting random picture API CALLING
document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?nature')"



