$(document).ready(function() {
    var result = 0;
    var prevEntry = 0;
    var operation = null;
    var currentEntry = '0';
    updateScreen(result);
    $('.button').click(function(event) {
        var buttonPressed = $(this).html();

        if (buttonPressed === 'C') {
            result = 0;
            currentEntry = '0';
        } else if (buttonPressed === 'CE') {
            //result = 0;
            currentEntry = '0';
        } else if (buttonPressed === 'Back') {
            currentEntry = currentEntry.substring(0, currentEntry.length - 1);
        } else if (buttonPressed === '+/-') {
            currentEntry *= -1;
        } else if (buttonPressed === '.') {
            currentEntry += '.';
        } else if (isInteger(buttonPressed)) {

            if (currentEntry === '0') {
                currentEntry = buttonPressed;
            } else {
                // Angka sebelumnya + angka sekarang
                currentEntry = currentEntry + buttonPressed;
            }

        } else if (isOperator(buttonPressed)) {
            prevEntry = parseFloat(currentEntry);
            operation = buttonPressed;
            currentEntry = '';
        } else if (buttonPressed === '%') { // Percentage
            currentEntry = currentEntry / 100;
        } else if (buttonPressed === '1/x') { //
            currentEntry = 1 / currentEntry;
        } else if (buttonPressed === 'pi') { // Phi 22/7 or 3.14
            currentEntry = Math.PI;
        } else if(buttonPressed === 'sqrt') {
            currentEntry = Math.sqrt(currentEntry);
        } else if (buttonPressed === '=') {
            currentEntry = operate(prevEntry, currentEntry, operation);
            operation = null;
        }
        updateScreen(currentEntry);
    });
});

// Lambda

updateScreen = function(displayVal) {
    var displayVal = displayVal.toString();
    $('div.screen').html(displayVal.substring(0, 10));
}

// Cek apakah angka ?
isInteger = function(value) {
    //return !isNan(value);
    if (isNaN(value)) {
        return false;
    } else {
        return true;
    }
}

isOperator = function(value) {
    return value === '/' || value === '*' || value === '+' || value === '-';
}

// Hitung
operate = function(valA, valB, operation) {
    valA = parseFloat(valA);
    valB = parseFloat(valB);
    //console.log(valA, valB, operation);
    if (operation === '+') return valA + valB;
    if (operation === '-') return valA - valB;
    if (operation === '*') return valA * valB;
    if (operation === '/') return valA / valB;
}
