// TODO: Add interval for credit term & percent rate inputs

const siteCalcInputs = document.querySelectorAll(".site-calc-inp");
const depositInputs = document.querySelectorAll(".deposit-inp");
const creditInputs = document.querySelectorAll(".credit-inp");

let errorRedColor = "#cf5c36";
let darkColor = "#0d090a";
let delay = 3000;

const siteCalcInterval = {
    min: 0.01,
    max: 9999999,
};
const depositInterval = {
    min: 1000,
    max: 9999999999
};
const creditInterval = {
    min: 10000,
    max: 9999999999,
};

function checkInp(inp, intervalMin, intervalMax) {
    let inpValue = +inp.value;
    if (inpValue == "" || inpValue == 0) {
        setErrorFor(inp, "Поле не може бути пустим");
    } else if (inpValue < intervalMin) {
        setErrorFor(inp, `Значення не повинно бути менше ${intervalMin}`);
        console.log(1);
    } else if (inpValue > intervalMax) {
        setErrorFor(inp, `Значення не повинно бути більше ${intervalMax}`);
    } else {
        setSuccessFor(inp);
    }
}

// * Set functions

function setErrorFor(input, message) {
    const formControl = input.parentElement;
    const small = formControl.querySelector("small");

    formControl.classList.add("_error")
    formControl.classList.remove("_success");
    small.style.opacity = "1";
    small.textContent = message;
}

function setSuccessFor(input) {
    const formControl = input.parentElement;
    const small = formControl.querySelector("small");

    formControl.classList.remove("_error")
    formControl.classList.add("_success");
    small.style.opacity = "0";
}

// * Call functions

for (let i = 0; i < siteCalcInputs.length; i++) {
    siteCalcInputs[i].addEventListener("input", function () {
        setTimeout(function () {
            checkInp(siteCalcInputs[i], siteCalcInterval.min, siteCalcInterval.max);
        }, delay);
    });
}

for (let i = 0; i < depositInputs.length; i++) {
    depositInputs[i].addEventListener("input", function () {
        setTimeout(function () {
            checkInp(depositInputs[i], depositInterval.min, depositInterval.max);
        }, delay);
    });
}

for (let i = 0; i < creditInputs.length; i++) {
    creditInputs[i].addEventListener("input", function () {
        setTimeout(function () {
            checkInp(creditInputs[i], creditInterval.min, creditInterval.max);
        }, delay);
    });
}