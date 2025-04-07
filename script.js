const numberInput = document.getElementById("number-input");
const convertBtn = document.getElementById("convert-btn");
const result = document.getElementById("result");
const conversionType = document.getElementById("input-type");
const errorDisplay = document.getElementById("error-msg"); // New: Error message container



const decimalToBinary = (input) => {
  if (input === 0 || input === 1) {
    return String(input);
  } else {
    return decimalToBinary(Math.floor(input / 2)) + (input % 2);
  }
};

const decimalToOctal = (input) => input.toString(8);

const decimalToHexadecimal = (input) => input.toString(16).toUpperCase();

const binaryToDecimal = (input) => /^[01]+$/.test(input) ? parseInt(input, 2) : "Invalid binary input";

const binaryToOctal = (input) => decimalToOctal(binaryToDecimal(input));

const binaryToHexadecimal = (input) => decimalToHexadecimal(binaryToDecimal(input));

const octalToDecimal = (input) => parseInt(input, 8);

const octalToBinary = (input) => decimalToBinary(octalToDecimal(input));

const octalToHexadecimal = (input) => decimalToHexadecimal(octalToDecimal(input));

const hexadecimalToDecimal = (input) => parseInt(input, 16);

const hexadecimalToBinary = (input) => decimalToBinary(hexadecimalToDecimal(input));

const hexadecimalToOctal = (input) => decimalToOctal(hexadecimalToDecimal(input));

const displayError = (msg) => {
  errorDisplay.textContent = msg;
};

const clearError = () => {
  errorDisplay.textContent = '';
};

const checkUserInput = () => {
  const inputValue = numberInput.value.trim();
  const conversion = conversionType.value;

  clearError();

  if (!conversion) {
    displayError("Please select an input type.");
    numberInput.focus();
    return;
  } else if (!inputValue) {
    displayError("Please provide a number.");
    numberInput.focus();
    return;
  }

  let inputInt = parseInt(inputValue, conversion === "hex" ? 16 : 10);

  if (conversion === "decimal") {
    if (isNaN(inputInt) || inputInt < 0) {
      displayError("Please provide a valid decimal number greater than or equal to 0.");
      numberInput.focus();
      return;
    }
    result.innerHTML = `
      <tr><td>Decimal</td><td class="value">${inputInt}</td></tr>
      <tr><td>Binary</td><td class="value">${(decimalToBinary(inputInt))}</td></tr>
      <tr><td>Octal</td><td class="value">${decimalToOctal(inputInt)}</td></tr>
      <tr><td>Hexadecimal</td><td class="value">${decimalToHexadecimal(inputInt)}</td></tr>
    `;
  } else if (conversion === "binary") {
    if (!/^[01]+$/.test(inputValue)) {
      displayError("Please provide a valid binary number (only 0s and 1s).");
      numberInput.focus();
      return;
    }
    inputInt = inputValue;
    result.innerHTML = `
      <tr><td>Decimal</td><td class="value">${binaryToDecimal(inputInt)}</td></tr>
      <tr><td>Binary</td><td class="value">${(inputInt)}</td></tr>
      <tr><td>Octal</td><td class="value">${binaryToOctal(inputInt)}</td></tr>
      <tr><td>Hexadecimal</td><td class="value">${binaryToHexadecimal(inputInt)}</td></tr>
    `;
  } else if (conversion === "octal") {
    if (!/^[0-7]+$/.test(inputValue)) {
      displayError("Please provide a valid octal number (only 0-7).");
      numberInput.focus();
      return;
    }
    result.innerHTML = `
      <tr><td>Decimal</td><td class="value">${octalToDecimal(inputValue)}</td></tr>
      <tr><td>Binary</td><td class="value">${(octalToBinary(inputValue))}</td></tr>
      <tr><td>Octal</td><td class="value">${inputValue}</td></tr>
      <tr><td>Hexadecimal</td><td class="value">${octalToHexadecimal(inputValue)}</td></tr>
    `;
  } else if (conversion === "hex") {
    if (!/^[0-9A-Fa-f]+$/.test(inputValue)) {
      displayError("Please provide a valid hexadecimal number (only 0-9 and A-F).");
      numberInput.focus();
      return;
    }
    result.innerHTML = `
      <tr><td>Decimal</td><td class="value">${hexadecimalToDecimal(inputValue)}</td></tr>
      <tr><td>Binary</td><td class="value">${(hexadecimalToBinary(inputValue))}</td></tr>
      <tr><td>Octal</td><td class="value">${hexadecimalToOctal(inputValue)}</td></tr>
      <tr><td>Hexadecimal</td><td class="value">${inputValue.toUpperCase()}</td></tr>
    `;
  }

  numberInput.focus(); // Refocus the input after conversion
};

convertBtn.addEventListener("click", checkUserInput);

numberInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    checkUserInput();
  }
});
