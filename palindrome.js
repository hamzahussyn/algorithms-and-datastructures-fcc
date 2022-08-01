function cleanInputString(str) {
  return str.replace(/[^a-z0-9]/gi, "").toLowerCase();
}

function palindrome(str) {
  let cleanString = cleanInputString(str);
  let length = cleanString.length;

  for (let i = 0; i < length; i++) {
    if (cleanString[i] !== cleanString[length - 1 - i]) {
      return false;
    }
  }

  return true;
}

palindrome("eye");
