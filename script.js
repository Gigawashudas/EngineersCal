const numberInput = document.getElementById("number-input");
const convertBtn = document.getElementById("convert-btn");
const result = document.getElementById("result");
const conversionType = document.getElementById("input-type");

const decimalToBinary = (input) => {
  if (input === 0 || input === 1) {
    return String(input);
  } else {
    return decimalToBinary(Math.floor(input / 2)) + (input % 2);
  }
};

const decimalToOctal = (input) => {
    return input.toString(8);
  };

const decimalToHexadecimal = (input) => {
    return input.toString(16).toUpperCase();
  };

const binaryToDecimal = (input) => {
  // Ensure input is a string to check binary validity
  if (/^[01]+$/.test(input)) {
    return parseInt(input, 2);
  } else {
    return "Invalid binary input";
  }
};

const binaryToOctal = (input) => {
    return decimalToOctal(binaryToDecimal(input));
};

const binaryToHexadecimal = (input) => {
    return decimalToHexadecimal(binaryToDecimal(input));
};

const octalToDecimal = (input) => {
    return parseInt(input, 8);
};
  
const octalToBinary = (input) => {
    return decimalToBinary(octalToDecimal(input));
};
  
const octalToHexadecimal = (input) => {
    return decimalToHexadecimal(octalToDecimal(input));
};

const hexadecimalToDecimal = (input) => {
    return parseInt(input, 16);
};
  
const hexadecimalToBinary = (input) => {
    return decimalToBinary(hexadecimalToDecimal(input));
};
  
const hexadecimalToOctal = (input) => {
    return decimalToOctal(hexadecimalToDecimal(input));
};

const checkUserInput = () => {
    const inputValue = numberInput.value.trim();
    const conversion = conversionType.value;
    const inputInt = parseInt(inputValue);
  
    if (!conversion) {
      alert("Please select an input type");
      return;
    } else if (!inputValue) {
      alert("Please provide a number.");
      return;
    }
  
    if (conversion === "decimal") {
      if (isNaN(inputInt) || inputInt < 0) {
        alert("Please provide a valid decimal number greater than or equal to 0.");
        return;
      }
      result.innerHTML = `
                            <tr>
                              <td>Binary</td>
                              <td class="value">${decimalToBinary(inputInt)}</td>
                            </tr>
                            <tr>
                              <td>Octal</td>
                              <td class="value">${decimalToOctal(inputInt)}</td>
                            </tr>
                            <tr>
                             <td>Hexadecimal</td>
                              <td class="value">${decimalToHexadecimal(inputInt)}</td>
                          `;
    } else if (conversion === "binary") {
      if (!/^[01]+$/.test(inputValue)) {
        alert("Please provide a valid binary number (only 0s and 1s).");
        return;
      }
      const decimal = binaryToDecimal(inputValue);
      result.textContent = `Decimal: ${decimal} | Octal: ${binaryToOctal(inputValue)} | Hexadecimal: ${binaryToHexadecimal(inputValue)}`;
    } else if (conversion === "octal") {
      if (!/^[0-7]+$/.test(inputValue)) {
        alert("Please provide a valid octal number (only 0-7).");
        return;
      }
      const decimal = octalToDecimal(inputValue);
      result.textContent = `Decimal: ${decimal} | Binary: ${octalToBinary(inputValue)} | Hexadecimal: ${octalToHexadecimal(inputValue)}`;
    } else if (conversion === "hex") {
      if (!/^[0-9A-Fa-f]+$/.test(inputValue)) {
        alert("Please provide a valid hexadecimal number (only 0-9 and A-F).");
        return;
      }
      const decimal = hexadecimalToDecimal(inputValue);
      result.textContent = `Decimal: ${decimal} | Binary: ${hexadecimalToBinary(inputValue)} | Octal: ${hexadecimalToOctal(inputValue)}`;
    }
  };
  

convertBtn.addEventListener("click", checkUserInput);

numberInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    checkUserInput();
  }
});
