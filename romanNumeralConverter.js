const RomanArabicNumeralMapping = new Map();
RomanArabicNumeralMapping.set('M', 1000);
RomanArabicNumeralMapping.set('CM', 900);
RomanArabicNumeralMapping.set('D', 500);
RomanArabicNumeralMapping.set('CD', 400);
RomanArabicNumeralMapping.set('C', 100);
RomanArabicNumeralMapping.set('XC', 90);
RomanArabicNumeralMapping.set('L', 50);
RomanArabicNumeralMapping.set('XL', 40);
RomanArabicNumeralMapping.set('X', 10);
RomanArabicNumeralMapping.set('IX', 9);
RomanArabicNumeralMapping.set('V', 5);
RomanArabicNumeralMapping.set('IV', 4);
RomanArabicNumeralMapping.set('I', 1);


function isPositive(num) {
  return num >= 0;
}

function convertToRoman(num) {
  let digitsLeft = num;
  let romanNumeral = '';

  while (digitsLeft !== 0) {
    for (const [key, value] of RomanArabicNumeralMapping.entries()) {
      if (isPositive(digitsLeft - value)) {
        console.log(digitsLeft + '-' + value);
        digitsLeft -= value;
        romanNumeral += key;
        break;
      }
    }
  }

  return romanNumeral;
}

console.log(convertToRoman(29));