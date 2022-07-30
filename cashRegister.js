"use strict";

//Enumerated types
const OP = {
  ADD: "+",
  SUB: "-",
};

const STATUS = {
  OPEN: "OPEN",
  CLOSED: "CLOSED",
  INSUFFICIENT_FUNDS: "INSUFFICIENT_FUNDS",
};

// A Map of currency units w.r.t value
const Currency = new Map();
Currency.set("PENNY", 0.01);
Currency.set("NICKEL", 0.05);
Currency.set("DIME", 0.1);
Currency.set("QUARTER", 0.25);
Currency.set("ONE", 1.0);
Currency.set("FIVE", 5.0);
Currency.set("TEN", 10.0);
Currency.set("TWENTY", 20.0);
Currency.set("ONE HUNDRED", 100);

// Helpers
function isPositive(num) {
  return num >= 0;
}

function safeCalculation(numOne, numTwo, op) {
  let safeNumOne = numOne.toFixed(2);
  let safeNumTwo = numTwo.toFixed(2);

  let result = eval(safeNumOne + op + safeNumTwo);
  result = result.toFixed(2);

  return Number(result);
}

function updateDrawer(array, key, value) {
  if (array.length == 0) return new Array([key, value]);
  return array.map((currency) => (currency[0] !== key ? currency : [key, currency[1] - value]));
}

function updateChange(array, key, value) {
  const Change = new Map(array);
  let changeArray = new Array();

  if (Change.has(key)) {
    let previous = Change.get(key);
    Change.set(key, safeCalculation(previous, value, OP.ADD));
  } else {
    Change.set(key, value);
  }

  for (const currency of Change.keys()) changeArray.push([currency, Change.get(currency)]);

  return changeArray;
}

// Main
function checkCashRegister(price, cash, cid) {
  let change = new Array();
  let cashDrawer = new Array(...cid);
  let changeAmount = safeCalculation(cash, price, OP.SUB);
  let emptyIterationFlag = false;
  let totalTransactions = 0;

  const totalCashInDrawer = cashDrawer.reduce((prev, current) => {
    return ["", safeCalculation(prev[1], current[1], OP.ADD)];
  })[1];

  while (emptyIterationFlag === false) {
    for (let i = cashDrawer.length - 1; i >= 0; i--) {
      let [currencyUnit, amount] = cashDrawer[i];

      if (amount == 0) {
        if (!change.find(([key, value]) => key == currencyUnit)) {
          change = updateChange(change, currencyUnit, 0);
          break;
        }
      }

      if (
        isPositive(safeCalculation(changeAmount, Currency.get(currencyUnit), OP.SUB)) &&
        isPositive(safeCalculation(amount, Currency.get(currencyUnit), OP.SUB))
      ) {
        changeAmount = safeCalculation(changeAmount, Currency.get(currencyUnit), OP.SUB);
        change = updateChange(change, currencyUnit, Currency.get(currencyUnit));
        cashDrawer = updateDrawer(cashDrawer, currencyUnit, Currency.get(currencyUnit));
        totalTransactions++;
        break;
      }

      if (i === 0) {
        emptyIterationFlag = true;
        break;
      }
    }
  }

  if (changeAmount > 0) return { status: STATUS.INSUFFICIENT_FUNDS, change: new Array() };

  if (changeAmount == 0) {
    if (totalCashInDrawer == safeCalculation(cash, price, OP.SUB)) {
      return { status: STATUS.CLOSED, change: cid };
    } else return { status: STATUS.OPEN, change: change };
  }
}

let x = checkCashRegister(19.5, 20, [
  ["PENNY", 0.5],
  ["NICKEL", 0],
  ["DIME", 0],
  ["QUARTER", 0],
  ["ONE", 0],
  ["FIVE", 0],
  ["TEN", 0],
  ["TWENTY", 0],
  ["ONE HUNDRED", 0],
]);

console.log(x);
