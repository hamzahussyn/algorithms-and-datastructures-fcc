/*
Used a stack instead of JS own iterative methods, as a standard of other strongly typed languages.
*/

class Stack {
  constructor(array) {
    this.stackArray = new Array(...array);
  }

  lookup = (index) => this.stackArray[index];
  pop = () => this.stackArray.pop();
  push = () => this.stackArray.push();
  print = () => console.log(this.stackArray.toString());
  size = () => this.stackArray.length;
  isEmpty = () => this.stackArray.length == 0;
}

// Enumerated types and Constants
const MAX_DIGITS = 11;
const MIN_DIGITS = 10;
const COUNTRY_CODE = "1";
const SAPERATORS = ["-", "(", ")", " "];

const nonNumberCharactersRegex = new RegExp("[^a-z0-9()-s]");
const numericCharactersRegex = new RegExp("^[0-9]$");
const removeWhiteSpaces = new RegExp("\\s", "g");

// Helpers
function validCountryCode(num, stack) {
  let cleanedNum = num.replace(/[^a-z0-9]/gi, "");
  let code = stack.pop();

  if(SAPERATORS.includes(code)) return false;
  if (cleanedNum.length == MAX_DIGITS) return code === COUNTRY_CODE ? true : false;
  if (cleanedNum.length == MIN_DIGITS) return true;
  if (cleanedNum.length > MAX_DIGITS || cleanedNum.length < MIN_DIGITS) return false;

  return false;
}

function nonAplhaNumericCheck(str) {
  return nonNumberCharactersRegex.test(str) ? true : false;
}

function patternMatcher(stack, patternLength) {
  let saperator = "";
  let saperatorTwo = "";
  let saperatorStart = false;
  let saperatorEnd = false;
  let poppedChar = "";
  let length = stack.size();

  if (SAPERATORS.includes(stack.lookup(length - 1))) {
    saperatorStart = true;
    saperator = stack.pop();
  }

  for (let i = length; i > length - patternLength; i--) {
    poppedChar = stack.pop();
    if (!numericCharactersRegex.test(poppedChar)) {
      return false;
    }
  }

  if (saperatorStart && SAPERATORS.includes(stack.lookup(stack.size() - 1))) {
    if (stack.lookup(stack.size() - 1) !== saperator) {
      if (saperator == ")" && stack.lookup(stack.size() - 1) == "(") {
        saperatorEnd = true;
        saperatorTwo = stack.pop();
        return true;
      }
      saperatorStart = false;
      saperatorEnd = false;
      saperator = "";
    } else {
      saperatorEnd = true;
      saperatorTwo = stack.pop();
    }
  }

  if (saperator !== saperatorTwo) return false;

  return true;
}

// Main
function telephoneCheck(str) {
  str = str.replace(removeWhiteSpaces, "");

  let firstPattern = false;
  let secondPattern = false;
  let thirdPattern = false;

  let stack = new Stack(str);

  // First Pattern from the end
  firstPattern = patternMatcher(stack, 4);
  stack.print();

  secondPattern = patternMatcher(stack, 3);
  stack.print();

  thirdPattern = patternMatcher(stack, 3);
  stack.print();

  if (stack.size() > 0) {
    if (
      validCountryCode(str, stack) &&
      stack.isEmpty() &&
      firstPattern &&
      secondPattern &&
      thirdPattern
    ) {
      return true;
    } else return false;
  }

  return firstPattern && secondPattern && thirdPattern;
}

let result = telephoneCheck("(555-555-5555");
console.log(result);
