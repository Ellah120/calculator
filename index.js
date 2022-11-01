const calculator = {
  displayValue: '0',
  firstOperand: null,
  waitingForSecondOperand: false,
  operator: null
}

function displayDigit (digit) {
  const {displayValue, waitingForSecondOperand} = calculator;
    if (waitingForSecondOperand == true) {
     calculator.displayValue = digit;
     calculator.waitingForSecondOperand = false;
    } else{
      calculator.displayValue = displayValue === '0' ? digit : displayValue + digit
      console.log(calculator);
    }
  }
  

function addDecimal (dot) {
  if(calculator.waitingForSecondOperand){
    calculator.displayValue = '0.'
    calculator.waitingForSecondOperand = false;
    return;
  }
  if (!calculator.displayValue.includes(dot)) {
    calculator.displayValue += dot;
  }
}
// to update the displayValue property of our calculator

function updateValue () {
  const display = document.querySelector("#result");
  display.value = calculator.displayValue;
}
updateValue();

const keys = document.querySelector('.calculator-keys');
keys.addEventListener("click", (event) => {
  const {target} = event;
  if(!target.matches('input')) {
    return;
  }

  if (target.classList.contains('operator')) {
    handleOperator(target.value)
    updateValue();
    return;
  }

  if (target.classList.contains('decimal')) {
    addDecimal(target.value)
    updateValue();
    return;
  }

  if (target.classList.contains('clear')) {
    resetCalculator()
    updateValue();
    return;
  }

  displayDigit(target.value);
  updateValue();
} );

function handleOperator(nextOperator) {
  const {firstOperand, displayValue, operator} = calculator

  // converting displayValue into a floating-point number ie a number with decimals.
  const inputValue = parseFloat(displayValue)
  if(operator && calculator.waitingForSecondOperand){
    calculator.operator = nextOperator;
    console.log(calculator);
    return;
  }
  if (firstOperand === null && !isNaN(inputValue)) {
    calculator.firstOperand = inputValue;
  } else if(operator){
    const result = calculate(firstOperand, inputValue, operator)
    calculator.displayValue = `${parseFloat(result.toFixed(7))}`
    calculator.firstOperand = result;
  }
    calculator.waitingForSecondOperand = true;
    calculator.operator = nextOperator;
    console.log(calculator);
}


function calculate (firstOperand, secondOperand, operator) {
  if (operator === "+") {
    return firstOperand + secondOperand;
  } else if(operator === "-"){
    return firstOperand - secondOperand;
  } else if(operator === "x"){
    return firstOperand * secondOperand;
  } else if (operator === "/"){
    return  firstOperand / secondOperand
  } else if(operator === "%"){
    return ((firstOperand / 100) * secondOperand)
  }
  return secondOperand;
}

function resetCalculator(){
  calculator.displayValue = '0';
  calculator.firstOperand = null;
  calculator.waitingForSecondOperand = false;
  calculator.operator = null;
  console.log(calculator);

}