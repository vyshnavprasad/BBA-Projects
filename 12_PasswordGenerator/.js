///////////////////
// DEBUG HELPERS //
///////////////////

let bpx = 0;
function bp() {
    console.log(bpx++);
}

bp();

/////////////////
// APPLICATION //
/////////////////

// VARIABLES
const upperCase = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
const lowerCase = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
const symbol    = [
    ".",  // Period
    ",",  // Comma
    "!",  // Exclamation mark
    "?",  // Question mark
    ":",  // Colon
    ";",  // Semicolon
    "'",  // Single quote
    "-",  // Hyphen
    "_",  // Underscore
    "(",  // Left parenthesis
    ")",  // Right parenthesis
    "[",  // Left bracket
    "]",  // Right bracket
    "{",  // Left brace
    "}",  // Right brace
    "/",  // Slash
    "|",  // Vertical bar
    "@",  // At symbol
    "#",  // Hash
    "$",  // Dollar sign
    "%",  // Percent
    "^",  // Caret
    "&",  // Ampersand
    "*",  // Asterisk
    "~"   // Tilde
];
const number = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

let password;


// FUNCTIONS
function Randomizer(string) {
    let stringLength = string.length;
    for(let index in string){
        let pos = Math.floor(Math.random()*(stringLength-index));
        pos = ((pos>=stringLength)? stringLength: pos);
        string = string.slice(0, pos) + string.slice(pos+1, stringLength) + string[pos];
    }
    return(string);
}
function Selector(array){
    return(Randomizer(array)[Math.floor(array.length*Math.random())]);
}

function ResetSlider() {
    console.log("triggered")
    if(repeatCheck.checked){
        lengthSlider.max = 64;
    }
    else{
        lengthSlider.max =
            (numberCheck.checked     ? number.length  : 0)+ 
            (symbolCheck.checked     ? symbol.length   : 0)+
            (caseCheck.checked       ? upperCase.length : 0)+
            (letterCheck.checked     ? lowerCase.length : 0);
        if(lengthSlider.max>64)    lengthSlider.max = 64; 
        lengthSlider.value = lengthSlider.max;
    }
    passwordLength.textContent = lengthSlider.value;
}

// QUERY SELECTOR
let numberCheck = document.querySelector("#number");
let letterCheck = document.querySelector("#letter");
let caseCheck = document.querySelector("#case");
let symbolCheck = document.querySelector("#symbol");
let genarateButton = document.querySelector("#genarate");
let passwordString = document.querySelector("#password");
let lengthSlider = document.querySelector("#length-slider");
let passwordLength = document.querySelector("#length");
let copyButton = document.querySelector("#copy");
let repeatCheck = document.querySelector("#repeat");


// EVENT HANDLERS

copyButton.addEventListener("click", () => {
    navigator.clipboard.writeText(passwordString.innerText)
})

lengthSlider.oninput = function () {
    passwordLength.innerText = lengthSlider.value;
}

genarateButton.addEventListener("click", () => {
    password = "";
    let charecters = 
        (numberCheck.checked     ? number.join("")   : "")+ 
        (symbolCheck.checked     ? symbol.join("")   : "")+
        (caseCheck.checked       ? upperCase.join(""): "")+
        (letterCheck.checked     ? lowerCase.join(""): "");

    let n = (letterCheck.checked+caseCheck.checked+symbolCheck.checked+numberCheck.checked);
    password = 
    (numberCheck.checked     ? Selector(number.join(""))    : "")+ 
    (symbolCheck.checked     ? Selector(symbol.join(""))    : "")+
    (caseCheck.checked       ? Selector(upperCase.join("")) : "")+
    (letterCheck.checked     ? Selector(lowerCase.join("")) : "");
    password = password + StringGenerator(charecters, password, lengthSlider.value-n, repeatCheck.checked);

    passwordString.innerText = Randomizer(password);
})