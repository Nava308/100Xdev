/*
  Implement a class `Calculator` having below methods
    - initialise a result variable in the constructor and keep updating it after every arithmetic operation
    - add: takes a number and adds it to the result
    - subtract: takes a number and subtracts it from the result
    - multiply: takes a number and multiply it to the result
    - divide: takes a number and divide it to the result
    - clear: makes the `result` variable to 0
    - getResult: returns the value of `result` variable
    - calculate: takes a string expression which can take multi-arithmetic operations and give its result
      example input: `10 +   2 *    (   6 - (4 + 1) / 2) + 7`
      Points to Note: 
        1. the input can have multiple continuous spaces, you're supposed to avoid them and parse the expression correctly
        2. the input can have invalid non-numerical characters like `5 + abc`, you're supposed to throw error for such inputs

  Once you've implemented the logic, test your code by running
*/
const isValidNumber = (input) => {
  if (Number.isNaN(Number(input))) {
    throw new Error("Invalid number");
  }
  return true;
};
class Calculator {
  constructor() {
    this.result = 0;
    this.precedence = {
      "+": 1,
      "-": 1,
      "*": 2,
      "/": 2,
    };
  }
  add(num) {
    try {
      if (isValidNumber(num)) {
        this.result = this.result + num;
      }
    } catch (error) {
      throw error;
    }
  }
  subtract(num) {
    try {
      if (isValidNumber(num)) {
        this.result = this.result - num;
      }
    } catch (error) {
      throw error;
    }
  }
  multiply(num) {
    try {
      if (isValidNumber(num)) {
        this.result = this.result * num;
      }
    } catch (error) {
      throw error;
    }
  }
  divide(num) {
    try {
      if (num === 0) {
        throw new Error("divide by zero error");
      }
      if (isValidNumber(num)) {
        this.result = this.result / num;
      }
    } catch (error) {
      throw error;
    }
  }
  clear() {
    this.result = 0;
  }
  getResult() {
    return this.result;
  }
  applyOperator(values, operator) {
    const b = values.pop();
    const a = values.pop();
    switch (operator) {
      case "+":
        values.push(a + b);
        break;
      case "-":
        values.push(a - b);
        break;
      case "*":
        values.push(a * b);
        break;
      case "/":
        if (b === 0) throw new Error("divide by 0 error");
        values.push(a / b);
        break;
      default:
        throw new Error(`Invalid operator: ${operator}`);
    }
  }
  evaluate(tokens) {
    const values = [];
    const operators = [];

    for (const token of tokens) {
      if (/\d+/.test(token)) {
        values.push(parseFloat(token));
      } else if (token === "(") {
        operators.push(token);
      } else if (token === ")") {
        while (operators.length && operators[operators.length - 1] !== "(") {
          this.applyOperator(values, operators.pop());
        }
        operators.pop(); // Pop '('
      } else {
        while (
          operators.length &&
          this.precedence[operators[operators.length - 1]] >=
            this.precedence[token]
        ) {
          this.applyOperator(values, operators.pop());
        }
        operators.push(token);
      }
    }

    while (operators.length) {
      this.applyOperator(values, operators.pop());
    }

    this.result = values[0];
  }
  calculate(string) {
    try {
      eval(string);
      const tokens = string.match(/\d+(\.\d+)?|\+|\-|\*|\/|\(|\)/g);

      if (!tokens) {
        throw new Error("Invalid characters in the expression.");
      }
      this.evaluate(tokens);
    } catch (error) {
      throw error;
    }
  }
}
cal = new Calculator();
cal.calculate("(2.5 + 1.5) * 3");
console.log(cal.getResult());
module.exports = Calculator;
