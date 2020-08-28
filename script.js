// Selector for numpad
const decimalPoint = document.querySelector("#decimal-point");
const signChange = document.querySelector("#sign-change");
const zero = document.querySelector("#zero");
const one = document.querySelector("#one");
const two = document.querySelector("#two");
const three = document.querySelector("#three");
const four = document.querySelector("#four");
const five = document.querySelector("#five");
const six = document.querySelector("#six");
const seven = document.querySelector("#seven");
const eight = document.querySelector("#eight");
const nine = document.querySelector("#nine");
// Selector for arithmatics
const backspaceBtn = document.querySelector("#delete");
const clearBtn = document.querySelector("#clear");
const squareBtn = document.querySelector("#square");
const sqrtBtn = document.querySelector("#square-root");
const multiplyBtn = document.querySelector("#multiply");
const divideBtn = document.querySelector("#divide");
const addBtn = document.querySelector("#add");
const subtractBtn = document.querySelector("#subtract");
const answerBtn = document.querySelector("#answer");
const equalsBtn = document.querySelector("#equals");
// Selector for display
const display = document.querySelector("#display");

document.onkeydown = function (e) {
    e = e || window.event;
    if (e.keyCode == 9 || e.keyCode == 8 || e.keyCode == 27) {
        keyboardSupport(e.keyCode, String.fromCharCode(e.keyCode));
    }
};

document.onkeypress = function (e) {
    e = e || window.event;
    keyboardSupport(e.keyCode, String.fromCharCode(e.keyCode));
};

signChange.addEventListener("click", () => {
    signSwitch();
});
decimalPoint.addEventListener("click", () => {
    if (displayValue.includes(".")) {
        return;
    }
    updateDisplay(".");
});
zero.addEventListener("click", () => {
    updateDisplay(0);
});
one.addEventListener("click", () => {
    updateDisplay(1);
});
two.addEventListener("click", () => {
    updateDisplay(2);
});
three.addEventListener("click", () => {
    updateDisplay(3);
});
four.addEventListener("click", () => {
    updateDisplay(4);
});
five.addEventListener("click", () => {
    updateDisplay(5);
});
six.addEventListener("click", () => {
    updateDisplay(6);
});
seven.addEventListener("click", () => {
    updateDisplay(7);
});
eight.addEventListener("click", () => {
    updateDisplay(8);
});
nine.addEventListener("click", () => {
    updateDisplay(9);
});
addBtn.addEventListener("click", () => {
    operationSelector("add");
});
subtractBtn.addEventListener("click", () => {
    operationSelector("subtract");
});
multiplyBtn.addEventListener("click", () => {
    operationSelector("multiply");
});
divideBtn.addEventListener("click", () => {
    operationSelector("divide");
});
equalsBtn.addEventListener("click", () => {
    operate(num1, num2, operator);
});
backspaceBtn.addEventListener("click", () => {
    backspace();
});
clearBtn.addEventListener("click", () => {
    clearAll();
});
squareBtn.addEventListener("click", () => {
    square();
});
sqrtBtn.addEventListener("click", () => {
    sqrt();
});
answerBtn.addEventListener("click", () => {
    answer();
});

var num1;
var num2;
var operator;
var ans = 0;
var error = false;
let displayValue = "";

function storeAsNum(inputNum) {
    if (operator != null) {
        if (inputNum === "") {
            num2 = null;
            return;
        }
        num2 = Math.round((Number(inputNum) + Number.EPSILON) * 1e10) / 1e10;
        return;
    } else {
        if (inputNum === "") {
            num1 = null;
            return;
        }
        num1 = Math.round((Number(inputNum) + Number.EPSILON) * 1e10) / 1e10;
    }
}

function updateDisplay(input) {
    if (error) {
        display.textContent = "ERROR";
        return;
    } else if (displayValue.length > 20) {
        display.textContent = `${displayValue}
        Max character reached`;
        return;
    } else if (displayValue == "ans") {
        return;
    }
    displayValue += input;
    display.textContent = `${displayValue}`;
    storeAsNum(displayValue);
}

function operationSelector(inputOperator) {
    displayValue = "";
    if (num2 != null) {
        operate(num1, num2, operator);
        operator = inputOperator;
        displayValue = "";
    }
    operator = inputOperator;
}

function signSwitch() {
    if (num2 != null) {
        num2 = -num2;
        displayValue = `${num2}`;
        display.textContent = `${num2}`;
        return;
    } else if (num1 != null) {
        num1 = -num1;
        displayValue = `${num1}`;
        display.textContent = `${num1}`;
        return;
    } else {
        return;
    }
}

function backspace() {
    if (displayValue == "") {
        return;
    } else if (displayValue.charAt(0) == "-") {
        displayValue = displayValue.slice(1);
        updateDisplay("");
        return;
    }
    displayValue = displayValue.slice(0, -1);
    updateDisplay("");
}

function clearAll() {
    num1 = null;
    num2 = null;
    operator = null;
    error = false;
    displayValue = "";
    display.textContent = "";
}

function answer() {
    displayValue = "ans";
    storeAsNum(ans);
    display.textContent = `Ans`;
}

function add(input1, input2) {
    return input1 + input2;
}

function subtract(input1, input2) {
    return input1 - input2;
}

function multiply(input1, input2) {
    return input1 * input2;
}

function divide(input1, input2) {
    return input1 / input2;
}

function square() {
    if (num2 != null) {
        num2 *= num2;
        num2 = Math.round((num2 + Number.EPSILON) * 1e10) / 1e10;
        displayValue = "";
        updateDisplay(num2);
        displayValue = "";
        return;
    } else if (num1 != null) {
        num1 *= num1;
        num1 = Math.round((num1 + Number.EPSILON) * 1e10) / 1e10;
        displayValue = "";
        updateDisplay(num1);
        displayValue = "";
        return;
    } else {
        return;
    }
}

function sqrt() {
    if (num2 != null) {
        if (num2 < 0) {
            error = true;
            updateDisplay("ERROR");
            return;
        }
        num2 = Math.sqrt(num2);
        num2 = Math.round((num2 + Number.EPSILON) * 1e10) / 1e10;
        displayValue = "";
        updateDisplay(num2);
        displayValue = "";
        return;
    } else if (num1 != null) {
        if (num1 < 0) {
            error = true;
            updateDisplay("ERROR");
            return;
        }
        num1 = Math.sqrt(num1);
        num1 = Math.round((num1 + Number.EPSILON) * 1e10) / 1e10;
        displayValue = "";
        updateDisplay(num1);
        displayValue = "";
        return;
    } else {
        return;
    }
}

function operate(input1, input2, inputOperator) {
    displayValue = "";
    if (input1 != null && input2 == null && operator == null) {
        ans = input1;
        updateDisplay(input1);
        displayValue = "";
        return;
    } else if (input1 != null && input2 != null && operator != null) {
        operator = null;
        num2 = null;
        num1 = null;
        switch (inputOperator) {
            case "add":
                ans = add(input1, input2);
                break;

            case "subtract":
                ans = subtract(input1, input2);
                break;

            case "multiply":
                ans = multiply(input1, input2);
                break;

            case "divide":
                if (input2 == 0) {
                    error = true;
                    updateDisplay("ERROR");
                    return;
                }
                ans = divide(input1, input2);
                break;

            default:
                return;
        }
        ans = Math.round((ans + Number.EPSILON) * 1e10) / 1e10;
        display.textContent = `${ans}`;
        storeAsNum(ans);
        return;
    } else if (input1 == null && input2 == null && operator == null) {
        return;
    } else {
        error = true;
        updateDisplay("ERROR");
        return;
    }
}

function keyboardSupport(keyCodeInput, keyInput) {
    if (keyCodeInput >= 48 && keyCodeInput <= 57) {
        updateDisplay(keyInput);
    } else if (keyCodeInput == 43) {
        operationSelector("add");
    } else if (keyCodeInput == 45) {
        operationSelector("subtract");
    } else if (keyCodeInput == 42) {
        operationSelector("multiply");
    } else if (keyCodeInput == 47) {
        operationSelector("divide");
    } else if (keyCodeInput == 46) {
        if (displayValue.includes(".")) {
            return;
        }
        updateDisplay(".");
    } else if (keyCodeInput == 13) {
        operate(num1, num2, operator);
    } else if (keyCodeInput == 94) {
        square();
    } else if (keyCodeInput == 82) {
        sqrt();
    } else if (keyCodeInput == 9) {
        answer();
    } else if (keyCodeInput == 8) {
        console.log("yo");
        backspace();
    } else if (keyCodeInput == 27) {
        clearAll();
    }
}
