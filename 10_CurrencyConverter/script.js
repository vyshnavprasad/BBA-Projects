///////////////////
// DEBUG HELPERS //
///////////////////

let bpx = 0;
function bp() {
    bpx++;
}


/////////////////
// APPLICATION //
/////////////////

// VARIABLES



// QUERY SELECTOR
const countryOne = document.querySelector("#countryOne");
const countryOneAmount = document.querySelector("#countryOneAmount");
const countryTwoAmount = document.querySelector("#countryTwoAmount");
const countryTwo = document.querySelector("#countryTwo");
const refresh = document.querySelector("#generate");
let currencyOne = "INR", currencyTwo = "USD";


//FUNCTIONS
function createCountryList(element){
    fetch("https://restcountries.com/v3.1/all?fields=name,currencies,flag")
    .then(response => response.json())
    .then(data => {
        console.log(data);
        for(let country of data) {
            let option = document.createElement("option");
            option.value = Object.keys(country.currencies);
            option.classList.add("option");
            option.innerText = `${Object.keys(country.currencies)[0]} - ${country.name.common}`;
            element.append(option);
        }
    })
    .catch(error => console.error("Error Fetch!!!", error));
}



// EVENT FUNCTIONS
function EventRun(){
    
}

createCountryList(countryOne);
createCountryList(countryTwo);



// EVENT HANDLERS

calculate.addEventListener("click", () => {
    let result;
    fetch(`https://v6.exchangerate-api.com/v6/2a52a7fb4ba56d5c83393733/pair/${currencyOne}/${currencyTwo}`)
    .then(response => response.json())
    .then(data => {
        result = data.conversion_rate*countryOneAmount.value;
        countryTwoAmount.innerText = result;
    })
    .catch(error => console.error("Error Fetch!!!", error))
})