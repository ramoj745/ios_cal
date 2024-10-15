let operand1 = "";
let operand2 = "";
let operator = "";
let shouldResetScreen = false;
let toggled = false;
let calculated = null;
const maxDigits = 9


const calculatorScreen = document.querySelector("h1");
const buttons = document.querySelectorAll(".btn");

buttons.forEach(button => {
    button.addEventListener("click", () => {
            const buttonText = button.innerHTML;

            //checks if pressed btn is a number
            if (!isNaN(buttonText) || buttonText === ".") {

                //if second input
                if (shouldResetScreen) {

                    //if entry is curr. calculated, update screen
                    if (calculated) {
                        if (operand2.length < maxDigits) {
                            operand2 += buttonText
                            console.log("calculated: true - op2: " + operand2)
                            appendNumberToScreenOnly3()
                        }
                    } else { //else, update screen for initial calculation
                        if (operand2.length < maxDigits) {
                            appendNumberToScreenOnly2(buttonText)
                            operand2 += buttonText
                            console.log("op2 " + operand2)
                        }
                    }
                    //checks if theres a second entry, and
                    //checks if op button is curr. toggled & untoggles specified by curr. operator
                    if (operand2) {
                        if (toggled && operator === "+") {
                            const buttonTog = document.getElementById("operators-add")
                            buttonTog.classList.toggle("toggle-btn")
                        }
                        else if (toggled && operator === "–") {
                            const buttonTog = document.getElementById("operators-sub")
                            buttonTog.classList.toggle("toggle-btn")
                        }
                        else if (toggled && operator === "×") {
                            const buttonTog = document.getElementById("operators-mult")
                            buttonTog.classList.toggle("toggle-btn")
                        }
                        else if (toggled && operator === "÷") {
                            const buttonTog = document.getElementById("operators-div")
                            buttonTog.classList.toggle("toggle-btn")
                        }
                        toggled = false
                    }
                // if first input
                } else {
                    if (operand1.length < maxDigits) {
                        appendNumberToScreenOnly(buttonText)
                        operand1 += buttonText
                        console.log("op1 " +operand1)
                    }
                }
            adjustSize()
            }
            //reset
            else if (buttonText === "AC") {
                calculatorScreen.innerHTML = "0";
                operand1 = "";
                operand2 = "";
                operator = "";
                console.log("reset");
                shouldResetScreen = false
                calculated = null
                toggled = false
                adjustSize()

                //removes toggles after reset
                const buttonTog = document.querySelectorAll(".tog")
                buttonTog.forEach(button => {
 
                    if (button.classList.contains("toggle-btn")) {
                        button.classList.toggle("toggle-btn")
                    }
                })
            }

            // pos/neg conversion
            else if (buttonText === "±") {
                //if curr. input is op1
                if (!shouldResetScreen) {
                    const negative = String(operand1).includes("-")
                    if (negative) {
                        operand1 = operand1.replace("-", "")
                        calculatorScreen.innerHTML = operand1
                    } else {
                        const neg = "-" + operand1
                        operand1 = neg
                        calculatorScreen.innerHTML = neg
                    }
                    console.log(operand1)
                } else {
                    //converts answer to neg/pos
                    if (calculated) {
                        calculated = calculated * -1
                        if (calculated.toString().length > 9) {
                            calculatorScreen.innerHTML = calculated.toExponential(0)
                        } else {
                            calculatorScreen.innerHTML = calculated
                        }
                    //converts op2 to neg/pos
                    } else {
                        const negative = operand2.includes("-")
                        if (negative) {
                            operand2 = operand2.replace("-", "")
                            calculatorScreen.innerHTML = operand2
                        } else {
                            const neg = "-" + operand2
                            operand2 = neg
                            calculatorScreen.innerHTML = neg
                        }
                    console.log(operand2)
                    }
                }
            } //1% conversion
            else if (buttonText === "%") {
                if (!shouldResetScreen) {
                    const percent = Number(operand1) / 100
                    if (percent.toString().length > 9) {
                        operand1 = percent
                        calculatorScreen.innerHTML = operand1.toExponential(0)
                    } else {
                        operand1 = percent
                        calculatorScreen.innerHTML = operand1
                    }
                } else {
                    if (calculated) {
                        const percent = calculated / 100
                        calculated = percent
                        if (percent.toString().length > 9) {
                            calculatorScreen.innerHTML = calculated.toExponential(0)
                        } else {
                            calculatorScreen.innerHTML = calculated
                        }
                        console.log(calculated)
                    } else {
                        const percent = Number(operand2) / 100
                        operand2 = percent
                        if (percent.toString().length > 9) {
                            calculatorScreen.innerHTML = operand2.toExponential(0)
                        } else {
                            calculatorScreen.innerHTML = operand2
                        }
                    }
                }
                adjustSize()
            }
            //pressed an operator
            else {
                if (buttonText !== "=") {
                    shouldResetScreen = true
                    operator = buttonText
                    if (operator === "+") {
                        const buttonTog = document.getElementById("operators-add")
                        buttonTog.classList.toggle("toggle-btn")
                    }
                    else if (operator === "–") {
                        const buttonTog = document.getElementById("operators-sub")
                        buttonTog.classList.toggle("toggle-btn")
                    }
                    else if (operator === "÷") {
                        const buttonTog = document.getElementById("operators-div")
                        buttonTog.classList.toggle("toggle-btn")
                    }
                    else if (operator === "×") {
                        const buttonTog = document.getElementById("operators-mult")
                        buttonTog.classList.toggle("toggle-btn")
                    }
                    toggled = true
                }
            }

            //pressed equal
            if (buttonText === "=") {

                //if calculating initially
                if (operand1 && operand2 && !calculated) {
                    if (operator === "+") {
                        const sum = Number(operand1) + Number(operand2)
                        if (sum.toString().length > 7) {
                            calculatorScreen.innerHTML = sum.toExponential(0)
                        } else {
                            calculatorScreen.innerHTML = sum
                        }
                        calculated = sum
                    }
                    else if (operator === "–") {
                        const diff = Number(operand1) - Number(operand2)
                        if (diff.toString().length > 9) {
                            calculatorScreen.innerHTML = diff.toExponential(0)
                        } else {
                            calculatorScreen.innerHTML = diff
                        }
                        calculated = diff
                    }
                    else if (operator === "÷") {
                        const quo = Number(operand1) / Number(operand2)
                        if (quo.toString().length > 9) {
                            calculatorScreen.innerHTML = quo.toExponential(0)
                        } else {
                            calculatorScreen.innerHTML = quo
                        }
                        calculated = quo
                    }
                    else if (operator === "×") {
                        const prod = Number(operand1) * Number(operand2)
                        if (prod.toString().length > 9) {
                            calculatorScreen.innerHTML = prod.toExponential(0)
                        } else {
                            calculatorScreen.innerHTML = prod
                        }
                        calculated = prod
                    }
                    operand2 = ""
                }
                //if calculating from last answer
                else if (calculated) {
                    if (operator === "+") {
                        const sum = calculated + Number(operand2)
                        if (sum.toString().length > 9) {
                            calculatorScreen.innerHTML = sum.toExponential(0)
                        } else {
                            calculatorScreen.innerHTML = sum
                        }
                        calculated = sum
                    }
                    else if (operator === "–") {
                        const diff = calculated - Number(operand2)
                        if (diff.toString().length > 9) {
                            calculatorScreen.innerHTML = diff.toExponential(0)
                        } else {
                            calculatorScreen.innerHTML = diff
                        }
                        calculated = diff
                    }
                    else if (operator === "÷") {
                        const quo = calculated / Number(operand2)
                        if (quo.toString().length > 9) {
                            calculatorScreen.innerHTML = quo.toExponential(0)
                        } else {
                            calculatorScreen.innerHTML = quo
                        }
                        calculated = quo
                    }
                    else if (operator === "×") {
                        const prod = calculated * Number(operand2)
                        if (prod.toString().length > 9) {
                            calculatorScreen.innerHTML = prod.toExponential(0)
                        } else {
                            calculatorScreen.innerHTML = prod
                        }
                        calculated = prod
                    }
                    operand2 = ""
                }
                adjustSize()
            }
    });
});


function appendNumberToScreenOnly(num) {
    if (calculatorScreen.innerHTML === "0") {
        calculatorScreen.innerHTML = num;
    } else {
        calculatorScreen.innerHTML += num
    }
}

function appendNumberToScreenOnly2(num) {
    if (operand2.length === 0) {
        calculatorScreen.innerHTML = num;
    } else {
        calculatorScreen.innerHTML += num
    }
}

function appendNumberToScreenOnly3() {
        calculatorScreen.innerHTML = operand2
}


function adjustSize() {

    const length = calculatorScreen.innerHTML.length;
    console.log(length)

    if (length < 6) {
        calculatorScreen.style.fontSize = "5.8rem";
    } else if (length === 7) {
        calculatorScreen.style.fontSize = "5.5rem"; 
    } else if (length === 8) {
        calculatorScreen.style.fontSize = "5rem"; 
    } else if (length >= 9) {
        calculatorScreen.style.fontSize = "4.4rem";
    }
}