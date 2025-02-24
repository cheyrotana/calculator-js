const buttonValues = [
    "AC", "+/-", "%", "÷", 
    "7", "8", "9", "×",
    "4", "5", "6", "-",
    "1", "2", "3", "+",
    "0", ".", "="
];
const rightSymbols = ["÷", "×", "-", "+", "="];
const topSymbols = ["AC", "+/-", "%"];

let A = null;
let operator = null;
let B = null;

function clearAll(){
    A = null;
    operator = null;
    B = null;
}

const display = document.getElementById("display");

for(let i = 0; i < buttonValues.length; i++){
    let value = buttonValues[i];
    let button = document.createElement("button");
    button.innerText = value;

    button.addEventListener("click", function() {
        // Handle top symbols first (like AC, +/- and %)
        if(topSymbols.includes(value)) {
            if(value === "AC") {
                clearAll();
                display.value = "";
            }
            else if(value === "+/-") {
                if(display.value !== "" && display.value !== "0") {
                    display.value = -Number(display.value);
                } 
            }
            else if(value === "%"){
                if(display.value !== "" && display.value !== "0") {
                    display.value = Number(display.value) / 100;
                }
            }
        } 
        // Then handle operator symbols including "="
        else if(rightSymbols.includes(value)) {
            // When the "=" button is pressed, perform the calculation if possible.
            if(value === "=") {
                if(A !== null && operator !== null && display.value !== "") {
                    B = display.value;
                    let numA = Number(A);
                    let numB = Number(B);
                    let result;
                    switch(operator) {
                        case "+":
                            result = numA + numB;
                            break;
                        case "-":
                            result = numA - numB;
                            break;
                        case "×":
                            result = numA * numB;
                            break;
                        case "÷":
                            result = numA / numB;
                            break;
                    }
                    display.value = result;
                    clearAll();
                }
            } 
            // For operator buttons (except "="), store the current value and operator.
            else {
                if(display.value !== "") {
                    A = display.value;
                    operator = value;
                    display.value = "";
                }
            }
        } 
        // Finally, handle decimal and number buttons
        else {
            if(value == "."){
                if(display.value !== "" && !display.value.includes(value)){
                    display.value += value;
                }

            }
            else if(display.value === "0") // only one zero
            {
                display.value = value;
            }
            else{
                display.value += value;
            }        
        } 
    });

    document.getElementById("buttons").appendChild(button);
}
