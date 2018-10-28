function isAction(btnId) {
  var actions = "+-X/";
  return actions.indexOf(btnId) > -1;
}

function isNumber(btnId) {
  var numbers = "1234567890";
  return numbers.indexOf(btnId) > -1;
}

function isDot(btnId) {
  return btnId === ".";
}

function isMinus(btnId) {
  return btnId === "-";
}

function isLong(equation) {
  return equation.length > 9;
}

function evaluate(equation) {
  var evalLastChar = equation.substr(-1);
  equation = equation.replace("X", "*");
  if (isAction(evalLastChar) || isDot(evalLastChar)) {
    if (equation.length === 1) {
      equation = "0";
    } else {
      equation = equation.slice(0, -1);
    }
  }
  var result = eval(equation).toString();
  if (result === "Undefined" || result === "NaN") {
    errorHandler("Undefined expression");
    result = equation;
  } else if (result === "Infinity") {
    errorHandler("Cannot divide by 0");
    result = equation;
  } else if (result.length > 9) {
    result = result.toString().slice(0, 9);
  }
  return result;
}

function errorHandler(error) {
  if (error === "reset") {
    document.getElementById("errors").innerHTML = "";
  } else {
    document.getElementById("errors").innerHTML = `Error: ${error}`;
  }
  return null;
}
function addEnterListener() {
  document.getElementById("output").addEventListener("keypress", function(e) {
    var key = e.which || e.keyCode;
    if (13 == key) {
      this.value = evaluate(this.value).toString();
    }
  });
}
function addButtonListeners() {
  var equation = "";
  var btns = document.getElementsByTagName("button");
  for (let i = 0; i < btns.length; i++) {
    btns[i].addEventListener("click", function() {
      if (equation === "") {
        errorHandler("reset");
        if (isNumber(this.id) || isDot(this.id) || isMinus(this.id)) {
          equation = this.id;
        }
      } else {
        var lastChar = equation.substr(-1);
        errorHandler("reset");
        if (this.id === "=") {
          equation = evaluate(equation);
        } else if (isAction(this.id) && isAction(lastChar)) {
          equation = equation.slice(0, -1) + this.id;
        } else if (this.id === "delete") {
          equation = equation.slice(0, -1);
        } else if (this.id === "clear") {
          equation = "";
        } else if (isDot(this.id) && isDot(lastChar)) {
          errorHandler("Invalid button");
        } else if (isLong(equation)) {
          errorHandler("Equation is too long");
        } else {
          equation += this.id;
        }
      }
      document.getElementById("output").value = equation;
    });
  }
}

window.addEventListener("load", function() {
  addButtonListeners();
  addEnterListener();
});
