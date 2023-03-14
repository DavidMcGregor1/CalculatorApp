const keys = document.querySelectorAll(".key");
const display_input = document.querySelector(".display .input");
const display_output = document.querySelector(".display .output");

let input = "";

for (let key of keys) {
  const value = key.dataset.key;

  key.addEventListener("click", () => {
    //check for clear button

    if (value == "clear") {
      input = "";
      display_input.innerHTML = "";
      display_output.innerHTML = "";

      //check for backspace button
    } else if (value == "backspace") {
      input = input.slice(0, -1);
      display_input.innerHTML = CleanInput(input);

      //check for equals button
    } else if (value == "=") {
      let result = eval(PrepareInput(input));
      display_output.innerHTML = CleanOutput(result);

      //check for brackets button
    } else if (value == "brackets") {
      if (
        input.indexOf("(") == -1 ||
        (input.indexOf("(") != -1 &&
          input.indexOf(")") != -1 &&
          input.lastIndexOf("(") < input.lastIndexOf(")"))
      ) {
        input += "(";
      } else if (
        (input.indexOf("(") != -1 && input.indexOf(")") == -1) ||
        (input.indexOf("(") != -1 &&
          input.indexOf(")") != -1 &&
          indexedDB.lastIndexOf("(") > input.lastIndexOf(")"))
      ) {
        input += ")";
      }
      display_input.innerHTML = CleanInput(input);
    } else {
      if (ValidateInput(value)) {
        input += value;
        display_input.innerHTML = CleanInput(input);
      }
    }
  });
}

function CleanInput(input) {
  let inputArray = input.split("");
  let inputArrayLength = inputArray.length;

  for (let i = 0; i < inputArrayLength; i++) {
    if (inputArray[i] == "*") {
      inputArray[i] = ` <span class="operator">x</span> `;
    } else if (inputArray[i] == "/") {
      inputArray[i] = ` <span class="operator">÷</span> `;
    } else if (inputArray[i] == "+") {
      inputArray[i] = ` <span class="operator">+</span> `;
    } else if (inputArray[i] == "-") {
      inputArray[i] = ` <span class="operator">-</span> `;
    } else if (inputArray[i] == "(") {
      inputArray[i] = `<span class="brackets">(</span>`;
    } else if (inputArray[i] == ")") {
      inputArray[i] = `<span class="brackets">)</span>`;
    } else if (inputArray[i] == "%") {
      inputArray[i] = `<span class="percent">%</span>`;
    }
  }

  return inputArray.join("");
}

//adding commas to big outputs
//adding decimal output functionality

function CleanOutput(output) {
  let outputString = output.toString();
  let decimal = outputString.split(".")[1];
  outputString = outputString.split(".")[0];

  let outputArray = outputString.split("");

  if (outputArray.length > 3) {
    for (let i = outputArray.length - 3; i > 0; i -= 3) {
      outputArray.splice(i, 0, ",");
    }
  }

  if (decimal) {
    outputArray.push(".");
    outputArray.push(decimal);
  }

  return outputArray.join("");
}

//validating input so users can't input multiple of one operator or decimal point

function ValidateInput(value) {
  let lastInput = input.slice(-1);
  let operators = ["+", "-", "/", "*"];

  if (value == "." && lastInput == ".") {
    return false;
  }

  if (operators.includes(value)) {
    if (operators.includes(lastInput)) {
      return false;
    } else {
      return true;
    }
  }

  return true;
}

//adding full functionality to the percentage button

function PrepareInput(input) {
  let inputArray = input.split("");

  for (let i = 0; i < inputArray.length; i++) {
    if (inputArray[i] == "%") {
      inputArray[i] = "/100";
    }
  }
  return inputArray.join("");
}
