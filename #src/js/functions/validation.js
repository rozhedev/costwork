const INPUTS = {
    all: document.querySelectorAll(".inp"),
    siteCalc: document.querySelectorAll(".site-calc-inp"),
    deposit: document.querySelectorAll(".deposit-inp"),
    credit: document.querySelectorAll(".credit-inp"),
    periodMonth: document.querySelectorAll(".period-month-inp"),
    percent: document.querySelectorAll(".percent-inp"),
    fee: document.querySelectorAll(".fee-inp"),
}

const VALID_INTERVALS = {
    siteCalc: {
        min: 0.01,
        max: 999999,
    },
    deposit: {
        min: 1000,
        max: 99999999,
    },
    credit: {
        min: 10000,
        max: 99999999,
    },
    periodMonth: {
        min: 1,
        max: 120,
    },
    percent: {
        min: 0.0001,
        max: 40,
    },
    fee: {
        min: 0,
        max: 5000,
    },
};

const TEXT_ERRORS = {
    emptyInp: function () {
        return "Поле не може бути пустим";
    },
    minValue: function (num) {
        return `Мінімальне значення: ${num}`;
    },
    maxValue: function (num) {
        return `Максимальне значення: ${num}`;
    },
}


// * FUNCTIONS

function checkInp(inp, intervalMin, intervalMax) {
    let inpValue = inp.value;
    if (inpValue === "") {
        setErrorFor(inp, TEXT_ERRORS.emptyInp());
    } else if (+inpValue < intervalMin) {
        setErrorFor(inp, TEXT_ERRORS.minValue(intervalMin));
    } else if (+inpValue > intervalMax) {
        setErrorFor(inp, TEXT_ERRORS.maxValue(intervalMax));
    } else {
        setSuccessFor(inp);
    }
}

// * Ограничение количества чисел после комы
function setDecimalNumber(inp) {
    // цифра устанавливает количество цифр после запятой, т.е. если 3, то максимум 2 цифры после запятой
    let num = 3;
    if (inp.value.indexOf(".") != '-1') {
        inp.value = inp.value.substring(0, inp.value.indexOf(".") + num);
    }
}

function setErrorFor(inp, message) {
    const formControl = inp.parentElement;
    const small = formControl.querySelector("small");

    formControl.classList.add("_error")
    formControl.classList.remove("_success");
    small.textContent = message;
}

function setSuccessFor(inp) {
    const formControl = inp.parentElement;

    formControl.classList.remove("_error")
    formControl.classList.add("_success");
}


// * CALL FUNCTIONS

for (let item of INPUTS.all) {
    item.addEventListener("input", function () {
        setDecimalNumber(item);
    });
}
for (let item of INPUTS.siteCalc) {
    item.addEventListener("change", function () {
        checkInp(item, VALID_INTERVALS.siteCalc.min, VALID_INTERVALS.siteCalc.max);
    });
}
for (let item of INPUTS.deposit) {
    item.addEventListener("change", function () {
        checkInp(item, VALID_INTERVALS.deposit.min, VALID_INTERVALS.deposit.max);
    });
}
for (let item of INPUTS.credit) {
    item.addEventListener("change", function () {
        checkInp(item, VALID_INTERVALS.credit.min, VALID_INTERVALS.credit.max);
    });
}
for (let item of INPUTS.periodMonth) {
    item.addEventListener("change", function () {
        checkInp(item, VALID_INTERVALS.periodMonth.min, VALID_INTERVALS.periodMonth.max);
    });
}
for (let item of INPUTS.percent) {
    item.addEventListener("change", function () {
        checkInp(item, VALID_INTERVALS.percent.min, VALID_INTERVALS.percent.max);
    });
}
for (let item of INPUTS.fee) {
    item.addEventListener("change", function () {
        checkInp(item, VALID_INTERVALS.fee.min, VALID_INTERVALS.fee.max);
    });
}
