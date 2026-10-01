// Calculator Logic

const display = document.getElementById('display');

let currentOperand = '';
let previousOperand = '';
let operation = undefined;

function updateDisplay() {
  display.innerText = currentOperand || '0';
}

function appendNumber(number) {
  if (number === '.' && currentOperand.includes('.')) return;
  if(currentOperand === '0' && number !== '.') {
      currentOperand = number;
  } else {
      currentOperand = currentOperand.toString() + number.toString();
  }
  updateDisplay();
}

function appendOperator(op) {
  if (currentOperand === '') return;
  if (previousOperand !== '') {
    calculateResult();
  }
  operation = op;
  previousOperand = currentOperand;
  currentOperand = '';
}

function calculateResult() {
  let computation;
  const prev = parseFloat(previousOperand);
  const current = parseFloat(currentOperand);
  
  if (isNaN(prev) || isNaN(current)) return;

  switch (operation) {
    case '+':
      computation = prev + current;
      break;
    case '-':
      computation = prev - current;
      break;
    case '*':
      computation = prev * current;
      break;
    case '/':
      if(current === 0) {
          alert('Cannot divide by zero!');
          clearDisplay();
          return;
      }
      computation = prev / current;
      break;
    default:
      return;
  }
  
  currentOperand = computation;
  operation = undefined;
  previousOperand = '';
  updateDisplay();
}

function clearDisplay() {
  currentOperand = '0';
  previousOperand = '';
  operation = undefined;
  updateDisplay();
}
