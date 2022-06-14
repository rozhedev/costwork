const siteCalcInputs = document.querySelectorAll(".site-calc-inp");
const depositInputs = document.querySelectorAll(".deposit-inp");
const creditInputs = document.querySelectorAll(".credit-inp");
const periodInputs = document.querySelectorAll(".period-inp");
const percentInputs = document.querySelectorAll(".percent-inp");

// * VALIDATION INTERVALS

const siteCalcInterval = {
    min: 0.01,
    max: 9999999,
};
const depositInterval = {
    min: 999,
    max: 9999999999,
};
const creditInterval = {
    min: 9999,
    max: 9999999999,
};
const periodInterval = {
    min: 1,
    max: 121,
};
const percentInterval = {
    min: 0.0001,
    max: 41,
};

// * FUNCTIONS

function checkInp(inp, intervalMin, intervalMax) {
    let inpValue = +inp.value;
    if (inpValue == "") {
        setErrorFor(inp, "Поле не може бути пустим");
    } else if (inpValue < intervalMin) {
        setErrorFor(inp, `Мінімальне значення: ${intervalMin}`);
    } else if (inpValue > intervalMax) {
        setErrorFor(inp, `Максимальне значення: ${intervalMax}`);
    } else {
        setSuccessFor(inp);
    }
}

function setErrorFor(input, message) {
    const formControl = input.parentElement;
    const small = formControl.querySelector("small");

    formControl.classList.add("_error")
    formControl.classList.remove("_success");
    small.textContent = message;
}

function setSuccessFor(input) {
    const formControl = input.parentElement;

    formControl.classList.remove("_error")
    formControl.classList.add("_success");
}

// * CALL FUNCTIONS

for (let i = 0; i < siteCalcInputs.length; i++) {
    siteCalcInputs[i].addEventListener("change", function () {
        checkInp(siteCalcInputs[i], siteCalcInterval.min, siteCalcInterval.max);
    });
}

for (let i = 0; i < depositInputs.length; i++) {
    depositInputs[i].addEventListener("change", function () {
        checkInp(depositInputs[i], depositInterval.min, depositInterval.max);
    });
}

for (let i = 0; i < creditInputs.length; i++) {
    creditInputs[i].addEventListener("change", function () {
        checkInp(creditInputs[i], creditInterval.min, creditInterval.max);
    });
}

for (let i = 0; i < periodInputs.length; i++) {
    periodInputs[i].addEventListener("change", function () {
        checkInp(periodInputs[i], periodInterval.min, periodInterval.max);
    });
}

for (let i = 0; i < percentInputs.length; i++) {
    percentInputs[i].addEventListener("change", function () {
        checkInp(percentInputs[i], percentInterval.min, percentInterval.max);
    });
}