//Imports

let value = 0;
let screenText;

document.addEventListener("DOMContentLoaded", function () {
  onLoad();
  loadResultFromURL();
});

const loadResultFromURL = () => {
  try {
    console.log("Trying to get result from URL");
    const urlParams = new URLSearchParams(window.location.search);
    const result = urlParams.get("result"); // Obtiene el valor de variable1
    setScreenValue(result);
  } catch (error) {
    console.log("Error getting result from URL");
  }
};

const onLoad = () => {
  screenText = document.getElementById("screen-text");
};

const buttonPressed = (e) => {
  if (isResultSet) {
    numA = getScreenValue();
    clearScreen();
  }
  screenText.innerText === undefined
    ? (screenText.innerText = "")
    : ((screenText.innerText += e.innerText), (value = screenText.innerText));
};

const clearScreen = () => {
  screenText.innerText = "";
};

const clearButton = () => {
  clearScreen();
  clearCalculator();
};

// soap
