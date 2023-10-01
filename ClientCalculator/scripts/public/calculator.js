let numA = 0;
let numB = 0;
let isSum = false;
let isSub = false;
let isMult = false;
let isDiv = false;
let isResultSet = false;

const getScreenValue = () => {
  let screenValue = 0;
  let screenText = document.getElementById("screen-text");
  screenValue =
    screenText.innerText === undefined
      ? 0
      : (screenValue = convertToFloat(screenText.innerText));
  return screenValue;
};

const setScreenValue = (value) => {
  let screenText = document.getElementById("screen-text");
  screenText.innerText = value;
};

const convertToFloat = (value) => {
  try {
    return parseFloat(value);
  } catch (error) {
    return NaN;
  }
};

const operationPressed = (e) => {
    setValues();
  if (isActiveOperation()) {
    operate();
    clearOperations();
  } else {
    setActiveOperation(e.innerText);
  }
};

const setValues = () => {
  if (numA == 0) {
    numA = getScreenValue();
  } else {
    numB = getScreenValue();
  }
};

const isActiveOperation = () => {
  return isSum || isSub || isMult || isDiv;
};

const setActiveOperation = (operation) => {
    clearScreen();
  switch (operation) {
    case "+":
      isSum = true;
      break;
    case "-":
      isSub = true;
      break;
    case "*":
      isMult = true;
      break;
    case "/":
      isDiv = true;
      break;
  }
};
const operate = () => {
  if (!isNaN(numB)) {
    printValues();
    if (isSum) {
      numA = sum(numA, numB);
    }
    if (isSub) {
      numA = sub(numA, numB);
    }
    if (isMult) {
      numA = mult(numA, numB);
    }
    if (isDiv) {
      numA = div(numA, numB);
    }
    
    numB = 0;
    console.log("-----------");
    printValues();
  }
  console.log("Hola");
  setScreenValue(numA);
};

const sum = (numA, numB) => {
    isSum = false;
    redirectURL("sum", numA, numB);
};

const sub = (numA, numB) => {
  isSub = false;
  redirectURL("subtract", numA, numB);
};

const mult = (numA, numB) => {
  isMult = false;
  redirectURL("multiplication", numA, numB);
};

const div = (numA, numB) => {
  isDiv = false;
  redirectURL("division", numA, numB);
};

const redirectURL = (method, numA, numB) => {
    url = `http://localhost:3000/soap?method=${method}&numA=${numA}&numB=${numB}`;
  window.location.href = url;
};

const clearOperations = () => {
  isSum = false;
  isSub = false;
  isMult = false;
  isDiv = false;
};

const printValues = () => {
  console.log("NumA: " + numA);
  console.log("NumB: " + numB);
  console.log("isSum: " + isSum);
  console.log("isSub: " + isSub);
  console.log("isMult: " + isMult);
  console.log("isDiv: " + isDiv);
};
