let value = 0;
let screenValue;
let screenText;

document.addEventListener('DOMContentLoaded', function() {
    onLoad();
});


const onLoad = () => {
    screenText = document.getElementById("screen-text");
}


const buttonPressed = (e) => {
    screenText.innerText === undefined 
    ? screenText.innerText = ""
    : (
        screenText.innerText += e.innerText, 
        value = screenText.innerText
    );
    
}

const clearScreen = () => {
    screenText.innerText = "";
}
