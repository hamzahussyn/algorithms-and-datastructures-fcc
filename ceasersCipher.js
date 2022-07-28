const NUM_OF_ALPHABETS = 26;
const LAST_UPPER_ASC = 90;
const LAST_LOWER_ASC = 122;

function getCode(char){
  let code = char.match(/^[0-9A-Za-z]+$/) ? char.charCodeAt(0) + 13 : char.charCodeAt(0);
  let upperCase = false;

  if(char.toUpperCase() === char){
    upperCase = true;
  }

  return upperCase ? (code > LAST_UPPER_ASC ? code - NUM_OF_ALPHABETS : code) : (code > LAST_LOWER_ASC ? code - NUM_OF_ALPHABETS : code);
}

function rot13(str) {
  return str.split(' ').map(word => word.split('').map(char => String.fromCharCode(getCode(char))).join('')).join(' ');;
}

rot13("GUR DHVPX OEBJA SBK WHZCF BIRE GUR YNML QBT.");