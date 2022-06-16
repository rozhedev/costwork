const allInp = document.querySelectorAll(".inp");
const siteCalcInputs = document.querySelectorAll(".site-calc-inp");
const depositInputs = document.querySelectorAll(".deposit-inp");
const creditInputs = document.querySelectorAll(".credit-inp");
const periodMonthInputs = document.querySelectorAll(".period-month-inp");
const periodDayInputs = document.querySelectorAll(".period-day-inp");
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
const periodMonthInterval = {
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

// * Ограничение количества чисел после комы
function setDecimalNumber(e) {
    // цифра устанавливает количество цифр после запятой, т.е. если 3, то максимум 2 цифры после запятой
    let num = 3;
    if (e.value.indexOf(".") != '-1') {
        e.value = e.value.substring(0, e.value.indexOf(".") + num);
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


for (let i = 0; i < allInp.length; i++) {
    allInp[i].addEventListener("input", function () {
        setDecimalNumber(allInp[i]);
    });
}

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

for (let i = 0; i < periodMonthInputs.length; i++) {
    periodMonthInputs[i].addEventListener("change", function () {
        checkInp(periodMonthInputs[i], periodMonthInterval.min, periodMonthInterval.max);
    });
}

for (let i = 0; i < percentInputs.length; i++) {
    percentInputs[i].addEventListener("change", function () {
        checkInp(percentInputs[i], percentInterval.min, percentInterval.max);
    });
}