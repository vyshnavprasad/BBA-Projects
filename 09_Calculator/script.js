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
const buttonsList = ["1", "2", "3", "C", "%", "4", "5", "6", "+", "-", "7", "8", "9", "/", "*", ".", "0", "=", "Del", "Exp"];
let string = "";
let history = [""];

// QUERY SELECTOR


// FUNCTIONS


// EVENT HANDLERS
let display = document.querySelector("#display");

let buttons = document.querySelector("#buttons");
for(let child of buttonsList){
    let button = document.createElement("button");
    button.innerText = child;
    button.classList = "button";
    buttons.append(button);
    button.addEventListener("click", () => {
        string = display.innerText;
        if(display.innerText == "undefined") string="";
        console.log(child+" key pressed...");
        switch(child){
            case "C": string = "";
                break;
            case "=": if(string === "") break; 
                    string = function () {
                    try {
                        return eval(string);
                    }
                    catch {
                        string = "!nput error";
                    };
                    history.push(string);
                }();
                console.log(history);
                break;
            case "Del":
                string = string.substring(0, string.length-1);
                break;
            case "Exp":
                string = string + "**";
                break;
            default: string += button.innerText;
                break
        }
        display.innerText = string;
    });
}

console.log("no");
