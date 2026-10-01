// Scientific Calculator Logic

const display = document.getElementById('display');
let currentExpression = '';

function updateDisplay() {
  // Make the display string more user friendly (replace Math.PI with π, etc)
  let visualString = currentExpression
    .replace(/Math.PI/g, 'π')
    .replace(/Math.E/g, 'e')
    .replace(/\*/g, '×')
    .replace(/\//g, '÷')
    .replace(/Math.sin\(/g, 'sin(')
    .replace(/Math.cos\(/g, 'cos(')
    .replace(/Math.tan\(/g, 'tan(')
    .replace(/Math.log10\(/g, 'log(')
    .replace(/Math.log\(/g, 'ln(')
    .replace(/Math.sqrt\(/g, '√(')
    .replace(/\*\*/g, '^');

  display.innerText = visualString || '0';
}

function appendValue(val) {
  // Convert friendly inputs into valid JS Math expressions
  if (val === 'sin(') currentExpression += 'Math.sin(';
  else if (val === 'cos(') currentExpression += 'Math.cos(';
  else if (val === 'tan(') currentExpression += 'Math.tan(';
  else if (val === 'log(') currentExpression += 'Math.log10('; // Base 10 Log
  else if (val === 'ln(') currentExpression += 'Math.log('; // Natural Log
  else if (val === '√(') currentExpression += 'Math.sqrt(';
  else if (val === '^') currentExpression += '**';
  else currentExpression += val;

  updateDisplay();
}

function clearDisplay() {
  currentExpression = '';
  updateDisplay();
}

function deleteLast() {
  // If the string ends with a Math function, we should ideally remove the entire function word,
  // but for simplicity, we'll just chop off the last character.
  // A robust calculator would parse tokens.
  
  if(currentExpression.endsWith('Math.sin(') || currentExpression.endsWith('Math.cos(') || currentExpression.endsWith('Math.tan(')) {
    currentExpression = currentExpression.slice(0, -9);
  } else if(currentExpression.endsWith('Math.log10(')) {
    currentExpression = currentExpression.slice(0, -11);
  } else if(currentExpression.endsWith('Math.log(')) {
    currentExpression = currentExpression.slice(0, -9);
  } else if(currentExpression.endsWith('Math.sqrt(')) {
    currentExpression = currentExpression.slice(0, -10);
  } else if(currentExpression.endsWith('Math.PI') || currentExpression.endsWith('Math.E')) {
    currentExpression = currentExpression.slice(0, -7);
  } else if(currentExpression.endsWith('**')) {
    currentExpression = currentExpression.slice(0, -2);
  } else {
    currentExpression = currentExpression.slice(0, -1);
  }

  updateDisplay();
}

function calculateResult() {
  if (currentExpression === '') return;
  
  try {
    // SECURITY NOTE: eval() is safe here ONLY because we strictly control the input via buttons.
    // In a production environment with keyboard input, building a parser or using Math.js is recommended.
    const result = eval(currentExpression);
    
    // Prevent undefined or weird results
    if (result === undefined || isNaN(result)) {
      display.innerText = 'Error';
      currentExpression = '';
    } else {
      // Fix float rounding errors (like 0.1 + 0.2 = 0.30000000000000004)
      const formattedResult = parseFloat(result.toPrecision(12)).toString();
      currentExpression = formattedResult;
      updateDisplay();
    }
  } catch (error) {
    display.innerText = 'Syntax Error';
    // Don't modify currentExpression so user can delete the mistake
  }
}
